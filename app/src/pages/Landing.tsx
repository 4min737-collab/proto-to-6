import { useNavigate } from 'react-router-dom';
import './Landing.css';

const features = [
  {
    icon: '🎙',
    title: '실시간 음성 전사',
    desc: '진료 중 대화를 실시간으로 텍스트로 변환합니다. 의사-환자 화자 분리와 의학 키워드 자동 하이라이트를 지원합니다.',
  },
  {
    icon: '🧠',
    title: 'AI 상병·처방 추천',
    desc: '대화 내용을 분석하여 상병코드(KCD)와 처방을 자동 추천합니다. 신뢰도 기반으로 우선순위를 제시합니다.',
  },
  {
    icon: '📋',
    title: 'SOAP 노트 자동 생성',
    desc: '진료 내용을 S·O·A·P 구조로 자동 정리합니다. 진료과별 템플릿을 지원하며 즉시 편집이 가능합니다.',
  },
  {
    icon: '⚠️',
    title: '약물 상호작용 알림',
    desc: '처방 시 기존 복용약과의 상호작용을 실시간으로 감지하고, 위험도와 대안을 즉시 안내합니다.',
  },
  {
    icon: '📂',
    title: '환자 이력 통합 조회',
    desc: '진단 이력, 현재 약물, 알레르기, 최근 방문 기록을 한 화면에서 빠르게 확인할 수 있습니다.',
  },
  {
    icon: '✨',
    title: 'AI 어시스턴트',
    desc: '진료 중 궁금한 점을 자연어로 질문하세요. 가이드라인, 감별진단, 혈압 추이 등을 즉시 답변합니다.',
  },
];

const versions = [
  { id: 'v1', label: 'v1', title: 'MVP 와이어프레임', date: '2025-06', path: '/v1' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <span className="landing-logo">의사랑AI</span>
          <div className="landing-nav-links">
            <a href="#features">기능</a>
            <a href="#versions">프로토타입</a>
            <a href="#contact">문의</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">6월 출시 예정</div>
        <h1 className="hero-title">
          진료의 모든 순간,<br />
          <span className="hero-accent">AI가 함께합니다</span>
        </h1>
        <p className="hero-desc">
          의사랑AI는 실시간 음성 전사부터 상병·처방 추천, SOAP 노트 자동 생성까지<br />
          진료 워크플로우 전체를 지원하는 AI 어시스턴트입니다.
        </p>
        <div className="hero-actions">
          <button className="hero-btn primary" onClick={() => navigate('/v1')}>
            프로토타입 체험하기
          </button>
          <button className="hero-btn secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            기능 알아보기
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-badge">FEATURES</span>
          <h2>의사가 진료에만 집중할 수 있도록</h2>
          <p>반복적인 기록 업무를 AI가 대신합니다</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="workflow">
        <div className="section-header">
          <span className="section-badge">WORKFLOW</span>
          <h2>3단계로 완성되는 진료 기록</h2>
        </div>
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <h3>녹음 시작</h3>
            <p>환자와의 대화를 녹음 버튼 하나로 시작합니다. 실시간으로 텍스트가 생성됩니다.</p>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <div className="step-number">2</div>
            <h3>AI 분석</h3>
            <p>대화 내용에서 상병, 처방, 검사 키워드를 자동 감지하고 추천합니다.</p>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <div className="step-number">3</div>
            <h3>SOAP 전송</h3>
            <p>자동 생성된 SOAP 노트를 확인·수정 후 EMR로 바로 전송합니다.</p>
          </div>
        </div>
      </section>

      {/* Versions */}
      <section className="versions" id="versions">
        <div className="section-header">
          <span className="section-badge">PROTOTYPE</span>
          <h2>프로토타입 버전 관리</h2>
          <p>각 버전의 와이어프레임을 확인하고 체험해보세요</p>
        </div>
        <div className="versions-grid">
          {versions.map(v => (
            <div className="version-card" key={v.id} onClick={() => navigate(v.path)}>
              <div className="version-header">
                <span className="version-tag">{v.label}</span>
                <span className="version-date">{v.date}</span>
              </div>
              <h3>{v.title}</h3>
              <p>환자 정보 조회, STT, AI 추천, SOAP 노트, AI 어시스턴트 포함</p>
              <span className="version-link">체험하기 →</span>
            </div>
          ))}
          <div className="version-card placeholder">
            <div className="version-header">
              <span className="version-tag">v2</span>
              <span className="version-date">Coming soon</span>
            </div>
            <h3>다음 버전</h3>
            <p>새로운 기능과 개선된 UI가 추가될 예정입니다</p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="trust">
        <div className="trust-items">
          <div className="trust-item">
            <div className="trust-icon">🔒</div>
            <h4>의료 데이터 보안</h4>
            <p>HIPAA 준수 수준의 데이터 암호화</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">⚡</div>
            <h4>실시간 처리</h4>
            <p>지연 없는 음성 인식과 AI 분석</p>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🏥</div>
            <h4>EMR 연동</h4>
            <p>주요 EMR 시스템과 원클릭 연동</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contact">
        <h2>의사랑AI와 함께<br />진료의 미래를 경험하세요</h2>
        <p>2025년 6월 출시 예정 · 사전 등록 시 우선 체험 기회 제공</p>
        <button className="hero-btn primary" style={{ marginTop: 24 }}>
          사전 등록하기
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <span className="landing-logo">의사랑AI</span>
          <span className="footer-copy">© 2025 의사랑AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
