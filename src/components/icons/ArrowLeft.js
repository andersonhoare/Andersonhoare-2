import React from 'react';

export default ({ stroke = 'black', strokeWidth = 2, size = 26, onClick }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    onClick={onClick}
    fill="none"
  >
    <path
      d="M13.0344 1.68629L1.7207 13L13.0344 24.3137"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
