import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header2 = ({ title }) => {
  const navigate = useNavigate();
  const onBeforePageHandler = () => {
    navigate(-1);
  };
  return (
    <div className="px-4 py-3 mb-8">
      <p className='mb-4' onClick={onBeforePageHandler}>
        <svg
          className="h-6 w-6 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          {' '}
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </p>
      <p className="text-gray-900 font-Heading1">{title}</p>
    </div>
  );
};

export default Header2;
