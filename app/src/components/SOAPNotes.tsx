import { useState } from 'react';

interface SOAPSection {
  key: string;
  label: string;
  fullLabel: string;
  colorClass: string;
  content: string;
  chips: { text: string; type: string }[];
}

const initialSections: SOAPSection[] = [
  {
    key: 's', label: 'S', fullLabel: 'S. SUBJECTIVE', colorClass: 's',
    content: '[주호소] 52세 남성.',
    chips: [{ text: '두통', type: 'symptom' }, { text: '어지럼증', type: 'symptom' }],
  },
  {
    key: 'o', label: 'O', fullLabel: 'O. OBJECTIVE', colorClass: 'o',
    content: '[MSE]\n이과. 저사',
    chips: [{ text: 'BP 142/90', type: 'lab' }],
  },
  {
    key: 'a', label: 'A', fullLabel: 'A. ASSESSMENT', colorClass: 'a',
    content: '[임상 인상]',
    chips: [{ text: '고혈압', type: 'dx' }, { text: '긴장성두통', type: 'dx' }],
  },
  {
    key: 'p', label: 'P', fullLabel: 'P. PLAN', colorClass: 'p',
    content: '[치료 방향]\n1. 암로디핀 5mg → 10mg 증량 (1T QD)',
    chips: [{ text: '혈압약', type: 'rx' }, { text: '암로디핀', type: 'rx' }, { text: '이부프로펜', type: 'rx' }],
  },
];

const deptTabs = ['발개', '간계', '내과', '정신과'];

export default function SOAPNotes() {
  const [sections, setSections] = useState(initialSections);
  const [activeDept, setActiveDept] = useState('정신과');

  const updateContent = (key: string, content: string) => {
    setSections(prev => prev.map(s => s.key === key ? { ...s, content } : s));
  };

  return (
    <div className="col-right">
      <div className="soap-header">
        <span className="soap-title">SOAP 노트</span>
        <div className="soap-dept-tabs">
          {deptTabs.map(tab => (
            <span
              key={tab}
              className={`dept-tab${activeDept === tab ? ' active' : ''}`}
              onClick={() => setActiveDept(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <div className="soap-body">
        {sections.map(section => (
          <div className="soap-section" key={section.key}>
            <div className="soap-section-header">
              <span className={`soap-label ${section.colorClass}`}>{section.fullLabel}</span>
            </div>
            <div className="soap-section-body">
              <div
                className="soap-text"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => updateContent(section.key, e.currentTarget.textContent || '')}
                dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br>') }}
              />
              <div className="soap-chips">
                {section.chips.map((chip, i) => (
                  <span key={i} className={`chip ${chip.type}`}>{chip.text}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="soap-actions">
        <button className="btn secondary">수정</button>
        <button className="btn primary">📋 SOAP 전송</button>
      </div>
    </div>
  );
}
