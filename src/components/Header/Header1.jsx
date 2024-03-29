import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header1 = ({ title, nav }) => {
  const navigate = useNavigate();
  const onBeforePageHandler = () => {
    if (nav) {
      navigate(nav);
    } else navigate(-1);
  };
  return (
    <div className="h-12 relative mb-8">
      <span className="absolute top-1/2 -translate-y-1/2" onClick={onBeforePageHandler}>
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
      </span>
      <p className="text-gray-900 font-Heading3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{title}</p>
      <p className="text-gray-900 font-Heading3 absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2">
        {title === '다이어리' ? (
          <Link to={'/diary/search'}>
            <button className=" text-gray-900 font-Heading3">검색</button>
          </Link>
        ) : (
          <></>
        )}
      </p>
    </div>
  );
};

export default Header1;
