import { useState } from 'react';
import { recommendations } from '../data/mockData';
import type { RecommendationItem } from '../data/mockData';

export default function RecommendationList() {
  const [filter, setFilter] = useState<'all' | 'dx' | 'rx'>('all');
  const [items, setItems] = useState(recommendations);

  const toggleCheck = (index: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, checked: !item.checked } : item));
  };

  const dxItems = items.filter(i => i.type === 'dx');
  const rxItems = items.filter(i => i.type === 'rx');
  const showDx = filter === 'all' || filter === 'dx';
  const showRx = filter === 'all' || filter === 'rx';

  const confidenceClass = (c: number) => c >= 90 ? 'high' : 'mid';

  const renderRow = (item: RecommendationItem, index: number) => (
    <tr key={index} className={`list-row ${item.type}`} onClick={() => toggleCheck(index)}>
      <td style={{ width: 36 }}>
        <span className="check-icon" style={{ opacity: item.checked ? 1 : 0.3 }}>✓</span>
      </td>
      <td style={{ width: 60 }}>
        <span className={`flag ${item.type}`}>
          <span className="dot" />
          {item.type === 'dx' ? '상병' : '처방'}
        </span>
      </td>
      <td>
        {item.badge ? (
          <span className={`badge ${item.badgeType}`}>{item.badge}</span>
        ) : (
          item.code
        )}
      </td>
      <td>{item.badge ? item.code : item.name}</td>
      <td>{item.badge ? item.name : <span style={{ color: '#86868b' }}>{item.detail}</span>}</td>
      <td style={{ textAlign: 'right', width: 60 }}>
        <span className={`confidence ${confidenceClass(item.confidence)}`}>{item.confidence}%</span>
      </td>
    </tr>
  );

  const allItems = items;
  const dxIndices = allItems.map((item, i) => item.type === 'dx' ? i : -1).filter(i => i !== -1);
  const rxIndices = allItems.map((item, i) => item.type === 'rx' ? i : -1).filter(i => i !== -1);

  return (
    <div className="list-area">
      <div className="list-header">
        <div className="list-title">
          📋 AI 추천 항목 <span className="count">{items.length}건</span>
        </div>
        <div className="list-filters">
          {(['all', 'dx', 'rx'] as const).map(f => (
            <span
              key={f}
              className={`filter-chip${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '전체' : f === 'dx' ? '상병' : '처방'}
            </span>
          ))}
        </div>
      </div>
      <div className="list-body">
        {showDx && (
          <>
            <div className="row-group-label">
              <span className="dot-indicator dx" /> 상병 {dxItems.length}건
            </div>
            <table className="data-table">
              <tbody>
                {dxIndices.map(i => renderRow(allItems[i], i))}
              </tbody>
            </table>
          </>
        )}
        {showRx && (
          <>
            <div className="row-group-label">
              <span className="dot-indicator rx" /> 처방 {rxItems.length}건
            </div>
            <table className="data-table">
              <tbody>
                {rxIndices.map(i => renderRow(allItems[i], i))}
              </tbody>
            </table>
          </>
        )}
        <div className="set-banner">✨ 진통 세트 — 기본 진통 세트 적용 가능 (클릭하여 적용)</div>
      </div>
    </div>
  );
}
