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
      d="M13.0339 24.3137L24.3477 13L13.0339 1.68629"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
