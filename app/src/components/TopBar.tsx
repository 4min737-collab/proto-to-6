export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-logo">의사랑AI</span>
        <div className="topbar-nav">
          <span>접수</span>
          <span style={{ fontWeight: 600, color: '#333' }}>문진</span>
        </div>
      </div>
      <div className="topbar-right">
        <span>접수 14:23</span>
      </div>
    </div>
  );
}
