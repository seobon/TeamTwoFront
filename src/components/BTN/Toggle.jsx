import React, { useState } from 'react';

const Toggle = ({ isOn, toggleHandler }) => {
  const toggleContainerStyle = 'w-12 h-6 rounded-full relative cursor-pointer duration-1000 ';
  const toggleCircle = ' w-6 h-6 rounded-full absolute top-0 duration-500 ease-in duration-800 	';
  return (
    <div className="flex justify-center">
      <div
        className={isOn ? `${toggleContainerStyle} bg-deepYellow ` : `${toggleContainerStyle} bg-deepBlue`}
        onClick={toggleHandler}>
        <div className={isOn ? `${toggleCircle} bg-yellow right-[0px]` : `${toggleCircle} bg-blue left-[0.1px]`} />
      </div>
    </div>
  );
};

export default Toggle;
