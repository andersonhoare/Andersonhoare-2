import React from 'react';

export default ({ fill = 'black', onClick, className }) => (
  <svg
    width="15"
    height="22"
    viewBox="0 0 15 22"
    onClick={onClick}
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 22C14.55 22 15 21.55 15 21C15 20.45 14.55 20 14 20H1C0.45 20 0 20.45 0 21C0 21.55 0.45 22 1 22H14Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.49443 13.6238V0.95105C8.49443 0.427973 8.04499 0 7.49567 0C6.94636 0 6.49692 0.427973 6.49692 0.95105V13.6238L1.67792 9.53427C1.25345 9.17762 0.629227 9.2014 0.254693 9.60559C-0.119841 10.0098 -0.0699027 10.6042 0.3296 10.9371L6.82151 16.4294L7.49567 17L8.16984 16.4294L14.6617 10.9371C15.0862 10.5804 15.1112 9.98601 14.7367 9.60559C14.3621 9.2014 13.7379 9.17762 13.3384 9.53427L8.49443 13.6238Z"
      fill={fill}
    />
  </svg>
);
