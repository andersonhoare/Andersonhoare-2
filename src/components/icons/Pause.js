import React from 'react';

export default ({ fill = 'black', onClick, className }) => (
  <svg width="27" height="32" viewBox="0 0 27 32">
    <path d="M0 0H10V32H0V0Z" fill={fill} />
    <path d="M17 0H27V32H17V0Z" fill={fill} />
  </svg>
);
