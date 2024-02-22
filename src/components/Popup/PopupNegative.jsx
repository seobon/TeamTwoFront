import React from 'react';

const PopupNegative = ({ title, content, cancel, active, activeOnclick, close }) => {
  return (
    <div className="bg-black bg-opacity-40 w-full h-full z-50 absolute top-0 left-0 ">
      <div className="rounded-3xl bg-white text-center p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="mb-8">
          <p className="font-Heading3 text-gray-900 mb-2">{title}</p>
          <p className="font-Body4  text-deepRed mb-2"> {content}</p>
        </div>

        <div className="flex">
          <button className="w-full font-Heading3 bg-gray-200 text-gray-600 p-3.5 rounded-lg mr-4" onClick={close}>
            {cancel}
          </button>
          <button className="w-full font-Heading3 bg-red text-white p-3.5 rounded-lg">{active}</button>
        </div>
      </div>
    </div>
  );
};

export default PopupNegative;
