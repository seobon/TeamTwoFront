import React from 'react';

const Tab = ({ BtnText, onClick, activeTab, index }) => {
  return (
    <button
      className={
        activeTab === index
          ? 'h-12 font-Body2 text-deepBrown  border-brown border-b-2 py-3.5 w-full'
          : 'h-12 font-Body4 text-gray-500 border-gray-200 border-b-2 py-3.5 w-full'
      }
      onClick={onClick}>
      {BtnText}
    </button>
  );
};

export default Tab;
