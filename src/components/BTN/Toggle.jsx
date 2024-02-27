import React, { useState } from 'react';

const Toggle = ({isOn, toggleHandler}) => {
  const toggleContainerStyle ="w-20 h-9 rounded-full relative cursor-pointer duration-1000 ";
  const toggleCircle = ' w-9 h-9 rounded-full absolute top-0 duration-500 ease-in duration-800 	';
  return (
    <div className={isOn ? `${toggleContainerStyle} bg-deepYellow `  : `${toggleContainerStyle} bg-deepBlue` } onClick={toggleHandler}>
      <div className={isOn ? `${toggleCircle} bg-yellow right-0` : `${toggleCircle} bg-blue left-0`} />
    </div>
  );
};

export default Toggle;
