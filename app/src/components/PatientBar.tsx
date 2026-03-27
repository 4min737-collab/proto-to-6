import { patient, diagnosisHistory, currentMedications, allergies, visitRecords } from '../data/mockData';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function PatientBar({ isOpen, onToggle }: Props) {
  return (
    <div className="patient-bar-wrapper">
      <div className="patient-bar">
        <div className={`patient-name-area${isOpen ? ' active' : ''}`} onClick={onToggle}>
          <span className="patient-name">{patient.name}</span>
          <span className={`patient-toggle${isOpen ? ' open' : ''}`}>▾</span>
        </div>
        <div className="patient-meta">
          <span className="tag">{patient.age}세/{patient.gender}</span>
          <span className="tag">{patient.insurance}</span>
          <span className="tag">{patient.visitType}</span>
        </div>
        <div className="patient-chief">{patient.chiefComplaint}</div>
        <div className="vitals">
          {patient.vitals.map((v, i) => (
            <div className="v" key={i}>
              <span className="label">{v.label}</span>
              <span className={`val${v.warn ? ' warn' : ''}`}>{v.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`dropdown-panel${isOpen ? ' open' : ''}`}>
        <div className="dropdown-inner">
          <div className="dropdown-section">
            <div className="section-title">❤️ 진단 이력</div>
            {diagnosisHistory.map((d, i) => (
              <div className="info-item" key={i}>
                <span className="label">{d.name} {d.code}</span>
                <span className="value">{d.duration} · {d.status}</span>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <div className="section-title">💊 현재 복용 약물</div>
              {currentMedications.map((m, i) => (
                <div className="info-item" key={i}>
                  <span className="label">{m.name}</span>
                  <span className="value">{m.dosage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown-section">
            <div className="section-title">⚠️ 알레르기 / 부작용</div>
            <div>
              {allergies.map((a, i) => (
                <span className="allergy-tag" key={i}>{a.substance} — {a.reaction}</span>
              ))}
            </div>
            <div className="compliance-note" style={{ marginTop: 16 }}>
              <div className="section-title" style={{ marginBottom: 4 }}>📌 지시 이행</div>
              운동 주 3회 이상 권고 → 미이행
            </div>
          </div>

          <div className="dropdown-section">
            <div className="section-title">🕐 최근 방문</div>
            {visitRecords.map((v, i) => (
              <div className="visit-card" key={i}>
                <div className="date">{v.date}</div>
                <div className="summary">{v.summary}</div>
                <div className="rx-list">{v.rxList}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && <div className="dropdown-backdrop show" onClick={onToggle} />}
    </div>
  );
}
