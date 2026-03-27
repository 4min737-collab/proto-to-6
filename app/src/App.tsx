import { useState, useCallback, useEffect } from 'react';
import TopBar from './components/TopBar';
import PatientBar from './components/PatientBar';
import STTPanel from './components/STTPanel';
import RecommendationList from './components/RecommendationList';
import SOAPNotes from './components/SOAPNotes';
import AIAssistant from './components/AIAssistant';
import BottomBar from './components/BottomBar';
import Toast from './components/Toast';

export default function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [hasAlert, setHasAlert] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [pendingAlert, setPendingAlert] = useState<string | null>(null);
  const [toast, setToast] = useState({ message: '', trigger: 0 });

  const showToast = useCallback((msg: string) => {
    setToast(prev => ({ message: msg, trigger: prev.trigger + 1 }));
  }, []);

  // Auto-open dropdown on mount
  useEffect(() => {
    const t1 = setTimeout(() => {
      setDropdownOpen(true);
      showToast('환자 김영철 선택 — 과거진료 자동 표시');
    }, 600);
    return () => clearTimeout(t1);
  }, [showToast]);

  const handleStartRecording = useCallback(() => {
    if (dropdownOpen) {
      setDropdownOpen(false);
      showToast('녹음 시작 — 과거진료 패널 자동 닫힘');
    }
    setRecording(true);
  }, [dropdownOpen, showToast]);

  const handleStopRecording = useCallback(() => {
    setRecording(false);
    showToast('녹음 종료');
  }, [showToast]);

  const handleIbuprofenDetected = useCallback(() => {
    if (aiOpen) return;
    setHasAlert(true);
    setAlertShown(true);
    setPendingAlert(
      '<span style="font-size:14px">⚠️</span> <b>이부프로펜-아스피린 상호작용 감지</b><br>이부프로펜이 아스피린의 항혈소판 효과를 감소시킬 수 있습니다. 또한 NSAIDs 병용 시 위장관 출혈 위험이 증가합니다.<br><br>→ 단기(7일) 처방이므로 허용 범위이나, <b>위장보호제 병용</b>을 고려해보세요.'
    );
  }, [aiOpen]);

  const toggleAI = useCallback(() => {
    setAiOpen(prev => !prev);
    setHasAlert(false);
    setAlertShown(false);
  }, []);

  const handleDismissBubble = useCallback(() => {
    setAlertShown(false);
  }, []);

  const handleOpenFromBubble = useCallback(() => {
    setAlertShown(false);
    setAiOpen(true);
    setHasAlert(false);
  }, []);

  const handleAlertConsumed = useCallback(() => {
    setPendingAlert(null);
  }, []);

  return (
    <>
      <div className="design-note">
        <span className="tag">WIREFRAME v2</span>
        환자 선택 시 과거진료 자동 오픈 → "녹음 시작" 클릭 시 자동 닫힘 &nbsp;|&nbsp; 녹음 시작 버튼을 눌러보세요
      </div>

      <TopBar />

      <PatientBar isOpen={dropdownOpen} onToggle={() => setDropdownOpen(prev => !prev)} />

      <div className="main">
        <div className="col-center">
          <STTPanel
            recording={recording}
            onStart={handleStartRecording}
            onStop={handleStopRecording}
            onIbuprofenDetected={handleIbuprofenDetected}
          />
          <RecommendationList />
        </div>
        <SOAPNotes />
      </div>

      <BottomBar />

      <AIAssistant
        isOpen={aiOpen}
        onToggle={toggleAI}
        hasAlert={hasAlert}
        alertShown={alertShown}
        onDismissBubble={handleDismissBubble}
        onOpenFromBubble={handleOpenFromBubble}
        pendingAlert={pendingAlert}
        onAlertConsumed={handleAlertConsumed}
      />

      <Toast message={toast.message} trigger={toast.trigger} />
    </>
  );
}
