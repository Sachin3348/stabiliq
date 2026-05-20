import React from 'react';
import { CheckCircle } from 'lucide-react';

const ATSBadge = ({ score, size = 'md' }) => {
  const getColor = () => {
    if (score >= 97) return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' };
    if (score >= 93) return { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe' };
    return { bg: '#fef9c3', text: '#a16207', border: '#fef08a' };
  };
  const { bg, text, border } = getColor();
  const isLarge = size === 'lg';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: isLarge ? 5 : 3,
      background: bg,
      color: text,
      border: `1px solid ${border}`,
      borderRadius: 999,
      padding: isLarge ? '4px 10px' : '2px 8px',
      fontSize: isLarge ? 12 : 11,
      fontWeight: 600,
      letterSpacing: 0.2,
      whiteSpace: 'nowrap',
    }}>
      <CheckCircle style={{ width: isLarge ? 13 : 11, height: isLarge ? 13 : 11 }} />
      ATS {score}%
    </span>
  );
};

export default ATSBadge;
