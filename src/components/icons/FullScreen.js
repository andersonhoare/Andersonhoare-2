import React from 'react';

export default ({ fill = 'black', onClick, className }) => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    onClick={onClick}
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H8V2H2V8H0V0ZM11 0H19V8H17V2H11V0ZM0 11H2V17H8V19H0V11ZM17 17V11H19V19H11V17H17Z"
      fill={fill}
    />
  </svg>
);
