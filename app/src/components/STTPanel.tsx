import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import { sttLines } from '../data/mockData';
import type { STTLine } from '../data/mockData';

interface Props {
  recording: boolean;
  onStart: () => void;
  onStop: () => void;
  onIbuprofenDetected: () => void;
}

function renderTextWithKeywords(line: STTLine) {
  if (!line.keywords?.length) return <span className="stt-text">{line.text}</span>;

  let text = line.text;
  const parts: (string | ReactNode)[] = [];
  let lastIndex = 0;

  const sorted = [...line.keywords].sort((a, b) => text.indexOf(a.text) - text.indexOf(b.text));

  sorted.forEach((kw, i) => {
    const idx = text.indexOf(kw.text, lastIndex);
    if (idx === -1) return;
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
    parts.push(<span key={i} className={`kw ${kw.type}`}>{kw.text}</span>);
    lastIndex = idx + kw.text.length;
  });
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <span className="stt-text">{parts}</span>;
}

export default function STTPanel({ recording, onStart, onStop, onIbuprofenDetected }: Props) {
  const [lines, setLines] = useState<STTLine[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ibuprofenFired = useRef(false);

  useEffect(() => {
    if (!recording) return;
    setLines([]);
    setSeconds(0);
    setDone(false);
    ibuprofenFired.current = false;

    const timer = setInterval(() => setSeconds(s => s + 1), 1000);

    const timeouts = sttLines.map((line, i) =>
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (line.text.includes('이부프로펜') && !ibuprofenFired.current) {
          ibuprofenFired.current = true;
          setTimeout(onIbuprofenDetected, 800);
        }
      }, (i + 1) * 1200)
    );

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
    };
  }, [recording, onIbuprofenDetected]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const handleStop = useCallback(() => {
    setDone(true);
    onStop();
  }, [onStop]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <>
      <div className="stt-header">
        <div className="stt-title">
          <span>🎙 음성 전사</span>
          {!recording && !done && <div className="standby-badge">대기중</div>}
          {recording && (
            <div className="rec-badge">
              <div className="rec-dot" />
              <span>REC {mm}:{ss}</span>
            </div>
          )}
          {done && !recording && (
            <div className="standby-badge" style={{ background: '#e8f4ff', color: '#0071e3' }}>완료</div>
          )}
        </div>
        <div className="stt-controls">
          {!recording && (
            <button className="rec-start" onClick={onStart}>
              🎙 {done ? '재녹음' : '녹음 시작'}
            </button>
          )}
          {recording && (
            <>
              <button>일시정지</button>
              <button className="stop" onClick={handleStop}>⏹ 종료</button>
            </>
          )}
        </div>
      </div>

      {!recording && lines.length === 0 && !done ? (
        <div className="stt-standby">
          <div className="standby-icon">🎙</div>
          <div className="standby-text">녹음을 시작하면 실시간 전사가 표시됩니다</div>
          <div className="standby-sub">과거진료를 확인한 뒤 녹음을 시작해주세요</div>
        </div>
      ) : (
        <div className="stt-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div className="stt-line" key={i} style={{ animation: 'fadeInUp 0.3s ease forwards' }}>
              <span className="stt-time">{line.time}</span>
              <span className={`stt-speaker ${line.speaker === 'doctor' ? 'doctor' : 'patient'}`}>
                {line.speaker === 'doctor' ? '의사' : '환자'}
              </span>
              {renderTextWithKeywords(line)}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
