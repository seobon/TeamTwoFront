import React from 'react';

const PopupNegative = ({ title, content, cancel, active, activeOnclick,close }) => {
  return (
    <div className='bg-black bg-opacity-40'>
      <div className="w-full p-3 rounded-3xl bg-white text-center">
        <div className="mb-8">
          <p className="font-Heading3 text-gray-900 mb-2">{title}</p>
          <p className="font-Body4  text-deepRed mb-2"> {content}</p>
        </div>

        <div className="flex">
          <button className="w-full font-Heading3 bg-gray-200 text-gray-600 p-3.5 rounded-lg mr-4" onClick={()=>{}}>{cancel}</button>
          <button className="w-full font-Heading3 bg-red text-white p-3.5 rounded-lg" onClick={close}>
            {active}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupNegative;
