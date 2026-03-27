import { useState, useRef, useEffect } from 'react';
import { aiResponses, aiSuggestions } from '../data/mockData';

interface Message {
  role: 'system' | 'user' | 'assistant';
  text: string;
  isAlert?: boolean;
}

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  hasAlert: boolean;
  alertShown: boolean;
  onDismissBubble: () => void;
  onOpenFromBubble: () => void;
  pendingAlert: string | null;
  onAlertConsumed: () => void;
}

export default function AIAssistant({
  isOpen, onToggle, hasAlert, alertShown, onDismissBubble, onOpenFromBubble, pendingAlert, onAlertConsumed,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: '이 환자에 대해 궁금한 점을 물어보세요. 진료 기록, 약물 상호작용, 가이드라인 등을 참고하여 답변드립니다.' },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && pendingAlert) {
      setMessages(prev => [...prev, { role: 'assistant', text: pendingAlert, isAlert: true }]);
      onAlertConsumed();
    }
  }, [isOpen, pendingAlert, onAlertConsumed]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  const askQuestion = (question: string) => {
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', text: question }]);
    setTyping(true);

    const response = aiResponses.find(r => r.question === question);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: response?.answer || '해당 질문에 대한 분석 결과를 준비 중입니다. 잠시만 기다려주세요.',
      }]);
    }, 1200);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    askQuestion(input.trim());
    setInput('');
  };

  return (
    <>
      <button
        className={`ai-fab${isOpen ? ' hidden' : ''}${hasAlert ? ' has-alert' : ''}`}
        onClick={onToggle}
      >
        ✨
        <span className="notif-dot" style={{ display: hasAlert ? 'block' : 'none' }}>1</span>
      </button>

      <div className={`ai-bubble${alertShown ? ' show' : ''}`}>
        <button className="ai-bubble-dismiss" onClick={onDismissBubble}>✕</button>
        <div className="ai-bubble-header">
          <span className="ai-bubble-icon">⚠️</span>
          <span className="ai-bubble-label">AI 알림</span>
        </div>
        <div className="ai-bubble-text">
          <span className="highlight">이부프로펜-아스피린</span> 병용 시 위장관 출혈 위험 및 항혈소판 효과 감소 가능성이 있습니다.
        </div>
        <button className="ai-bubble-action" onClick={onOpenFromBubble}>자세히 보기 →</button>
      </div>

      <div className={`ai-panel${isOpen ? ' open' : ''}`}>
        <div className="ai-panel-header">
          <div>
            <div className="title">✨ AI 어시스턴트</div>
            <div className="patient-ctx">김영철 · 52세 남성 · 고혈압/긴장성두통</div>
          </div>
          <button className="close" onClick={onToggle}>✕</button>
        </div>
        <div className="ai-panel-body" ref={bodyRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`ai-msg ${msg.role}`}
              style={msg.isAlert ? { background: '#fff8f0', border: '1px solid #ffe0c0', whiteSpace: 'pre-wrap' } : msg.role === 'assistant' ? { whiteSpace: 'pre-wrap' } : undefined}
              dangerouslySetInnerHTML={msg.isAlert ? { __html: msg.text } : undefined}
            >
              {!msg.isAlert ? msg.text : null}
            </div>
          ))}
          {typing && (
            <div className="ai-msg assistant" style={{ opacity: 0.5 }}>답변 생성 중...</div>
          )}
          {showSuggestions && (
            <div className="ai-suggestions">
              {aiSuggestions.map((s, i) => (
                <span key={i} className="ai-suggest-chip" onClick={() => askQuestion(s)}>
                  {s.length > 15 ? s.slice(0, 15) + '...' : s}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="ai-panel-input">
          <input
            type="text"
            placeholder="이 환자에 대해 질문하세요..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>↑</button>
        </div>
      </div>
    </>
  );
}
