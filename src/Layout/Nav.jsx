import React from 'react';

const Nav = ({ svg, title, onClick, stroke }) => {
  return (
    <div className="text-center inline-block p-4" onClick={onClick}>
      <div className="inline-block">{svg}</div>
      <div className={`mt-1 font-Caption w-full text-gray-500 font-bold`}>{title}</div>
    </div>
  );
};

export default Nav;
