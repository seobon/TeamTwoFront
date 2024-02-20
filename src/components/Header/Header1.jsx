import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header1 = ({ title }) => {
  const navigate = useNavigate();
  const onBeforePageHandler = () => {
    navigate(-1);
  };
  return (
    <div className="h-12 relative mb-8">
      <span className="absolute top-1/2 -translate-y-1/2" onClick={onBeforePageHandler}>
        <svg
          class="h-6 w-6 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          {' '}
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </span>
      <p className="text-gray-900 font-Heading3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{title}</p>
    </div>
  );
};

export default Header1;
