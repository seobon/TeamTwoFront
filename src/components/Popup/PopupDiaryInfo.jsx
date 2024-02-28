import React from 'react';

const PopupLogout = ({ closeDiaryInfoPopup, showDiaryInfoPopup }) => {
  return (
    <div className="bg-black bg-opacity-40 w-full h-full z-50 absolute top-0 left-0 ">
      <div className="w-[370px] rounded-3xl bg-white text-center p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="mb-8">
          <p className="font-Heading3 text-gray-900 mb-2">다이어리가 없습니다.</p>
          <p className="font-Body4  text-deepRed mb-2">다이어리는 당일에만 쓸수있어요. </p>
        </div>
        <div className="flex">
          <button
            className="w-full font-Heading3 bg-gray-200 text-gray-600 p-3.5 rounded-lg"
            onClick={() => {
              showDiaryInfoPopup(!closeDiaryInfoPopup);
            }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopupLogout;
