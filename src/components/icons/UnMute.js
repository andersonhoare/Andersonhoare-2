import React from 'react';

export default ({ fill = 'black', onClick, className }) => (
  <svg width="15" height="21" viewBox="0 0 15 21">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 0.197632V20.8023L6.64351 15.5899H2.06433C0.96757 15.5899 0 14.7771 0 13.5941V7.3347C0 6.17699 1.01788 5.41001 2.06433 5.41001H6.64351L15 0.197632ZM13 3.80231L7.21614 7.41001H2.06433C2.03629 7.41001 2.01518 7.41385 2 7.41839V13.5808C2.01124 13.5848 2.03207 13.5899 2.06433 13.5899H7.21614L13 17.1976V3.80231Z"
      fill={fill}
    />
  </svg>
);
