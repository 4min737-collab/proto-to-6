export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  insurance: string;
  visitType: string;
  chiefComplaint: string;
  vitals: { label: string; value: string; warn?: boolean }[];
}

export interface DiagnosisHistory {
  name: string;
  code: string;
  duration: string;
  status: string;
}

export interface Medication {
  name: string;
  dosage: string;
}

export interface Allergy {
  substance: string;
  reaction: string;
}

export interface VisitRecord {
  date: string;
  summary: string;
  rxList: string;
}

export interface STTLine {
  time: string;
  speaker: 'doctor' | 'patient';
  text: string;
  keywords?: { text: string; type: 'dx' | 'rx' | 'lab' }[];
}

export interface RecommendationItem {
  type: 'dx' | 'rx';
  checked: boolean;
  badge?: string;
  badgeType?: 'primary' | 'secondary';
  code: string;
  name: string;
  detail?: string;
  confidence: number;
}

export interface AIResponse {
  question: string;
  answer: string;
}

export const patient: PatientInfo = {
  name: '김영철',
  age: 52,
  gender: '남',
  insurance: '건강보험',
  visitType: '재진',
  chiefComplaint: '접수문진: 두통, 어지럼증이 일주일째 지속. 혈압약 규칙적으로 복용 중이나 스트레스 증가',
  vitals: [
    { label: '체온', value: '36.6°C' },
    { label: '혈압', value: '측정대기', warn: true },
    { label: '체중', value: '78kg' },
  ],
};

export const diagnosisHistory: DiagnosisHistory[] = [
  { name: '고혈압', code: 'I10', duration: '12년', status: '치료중' },
  { name: '2형 당뇨병', code: 'E11.9', duration: '4년', status: '복용중' },
  { name: '이상지혈증', code: 'E78.5', duration: '3년', status: '복용중' },
];

export const currentMedications: Medication[] = [
  { name: '암로디핀 5mg', dosage: '1T QD' },
  { name: '메트포르민 500mg', dosage: '1T BID' },
  { name: '아스피린 100mg', dosage: '1T QD' },
];

export const allergies: Allergy[] = [
  { substance: '페니실린', reaction: '두드러기' },
  { substance: '로수바스타틴', reaction: '근육통' },
];

export const visitRecords: VisitRecord[] = [
  { date: '2025-05-20', summary: '혈압 138/88. 경미 두통 호소', rxList: '암로디핀 유지, 경과 관찰' },
  { date: '2025-04-22', summary: 'HbA1c 7.2% 개선. 고혈압 유지', rxList: '메트포르민 지속, 암로디핀 지속' },
  { date: '2025-04-08', summary: '메트포르민 복용 시작 후 위장 불편감 경미', rxList: '메트포르민 지속' },
];

export const sttLines: STTLine[] = [
  {
    time: '14:26', speaker: 'patient',
    text: '네, 매일 아침에 암로디핀 먹고 있어요.',
    keywords: [{ text: '암로디핀', type: 'rx' }],
  },
  {
    time: '14:26', speaker: 'doctor',
    text: 'BP 142/90 으로 나왔네요 혈압이 좀 높습니다.',
    keywords: [{ text: 'BP 142/90', type: 'lab' }, { text: '혈압', type: 'dx' }],
  },
  {
    time: '14:27', speaker: 'doctor',
    text: '식사는 규칙적으로 하시고, 운동은 하시나요?',
  },
  {
    time: '14:27', speaker: 'patient',
    text: '식사는 하는데, 운동은 요즘 거의 못 하고 있어요. 스트레스가 많아서요.',
  },
  {
    time: '14:28', speaker: 'doctor',
    text: '고혈압 조절이 안 되고 있고, 긴장성두통으로 보입니다. 암로디핀을 10mg으로 이부프로펜 추가하겠습니다.',
    keywords: [
      { text: '고혈압', type: 'dx' },
      { text: '긴장성두통', type: 'dx' },
      { text: '암로디핀', type: 'rx' },
      { text: '이부프로펜', type: 'rx' },
    ],
  },
  {
    time: '14:28', speaker: 'doctor',
    text: '2주 후에 다시 오셔서 혈압 확인하겠습니다.',
  },
  {
    time: '14:29', speaker: 'patient',
    text: '네, 알겠습니다. 감사합니다.',
  },
];

export const recommendations: RecommendationItem[] = [
  { type: 'dx', checked: true, badge: '주상병', badgeType: 'primary', code: 'I10', name: '고혈압', confidence: 95 },
  { type: 'dx', checked: true, badge: '부상병', badgeType: 'secondary', code: 'G44.2', name: '긴장성두통', confidence: 88 },
  { type: 'rx', checked: true, code: '150602ATB', name: '암로디핀', detail: '10mg · 1일 1회 · 30일', confidence: 96 },
  { type: 'rx', checked: true, code: '160801ATB', name: '이부프로펜', detail: '400mg · 1일 3회 · 7일', confidence: 89 },
  { type: 'rx', checked: true, code: '100701ATB', name: '아세트아미노펜', detail: '500mg · 1일 3회 · 7일', confidence: 85 },
  { type: 'rx', checked: true, code: '114300ATB', name: '아스피린', detail: '100mg · 1일 1회 · 30일', confidence: 94 },
];

export const aiResponses: AIResponse[] = [
  {
    question: '암로디핀 10mg 증량 시 주의사항은?',
    answer: '암로디핀 10mg 증량 시 주의사항:\n\n• 저혈압 모니터링 필요 (특히 기립성)\n• 말초부종 발생 가능성 증가 (5mg 대비 ~2배)\n• 현재 메트포르민 복용 중 — 상호작용 없음\n• 아스피린과 병용 안전\n• 2주 후 BP 재측정 권장 (현재 142/90)',
  },
  {
    question: '이부프로펜과 현재 복용약 상호작용은?',
    answer: '이부프로펜 상호작용 분석:\n\n⚠️ 아스피린: NSAIDs 병용 시 위장관 출혈 위험 증가. 이부프로펜이 아스피린의 항혈소판 효과를 감소시킬 수 있음.\n✅ 암로디핀: 유의미한 상호작용 없음\n✅ 메트포르민: 유의미한 상호작용 없음\n\n→ 단기(7일) 처방이므로 허용 범위이나, 위장보호제 병용을 고려하세요.',
  },
  {
    question: '고혈압+두통 감별진단 추천해줘',
    answer: '고혈압 + 두통 감별진단:\n\n1. 긴장성두통 (현재 진단, 88% 신뢰도)\n2. 고혈압성 두통 — BP 142/90으로 가능성 있음\n3. 편두통 — 추가 문진 필요 (광과민, 구역)\n4. 이차성 두통 — BP 지속 상승 시 뇌영상 고려\n\n→ 현재 긴장성두통 진단이 가장 적합해 보입니다.',
  },
  {
    question: '최근 3회 방문 혈압 추이는?',
    answer: '최근 혈압 추이:\n\n• 2025-04-08: 기록 없음 (위장 불편감 내원)\n• 2025-04-22: 134/86 (정상 범위)\n• 2025-05-20: 138/88 (경계)\n• 오늘: 142/90 (1기 고혈압)\n\n→ 점진적 상승 추세. 약물 증량 결정이 적절합니다.',
  },
];

export const aiSuggestions = [
  '암로디핀 10mg 증량 시 주의사항은?',
  '이부프로펜과 현재 복용약 상호작용은?',
  '고혈압+두통 감별진단 추천해줘',
  '최근 3회 방문 혈압 추이는?',
];
