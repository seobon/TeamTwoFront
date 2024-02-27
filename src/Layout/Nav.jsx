import React from 'react';

const Nav = ({ svg, title }) => {
  return (
    <div className="text-center inline-block p-4">
      <div className='inline-block '>{svg}</div>
      <div className='mt-1 font-Caption w-full'>{title}</div>
    </div>
  );
};

export default Nav;
