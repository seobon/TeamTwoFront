import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopupLogout = ({ closeLogoutPopup, showLogoutPopup }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-black bg-opacity-40 w-full h-full z-50 absolute top-0 left-0 ">
      <div className="rounded-3xl bg-white text-center p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="mb-8">
          <p className="font-Heading3 text-gray-900 mb-2">로그아웃</p>
          <p className="font-Body4  text-deepRed mb-2">*로그아웃 상태에서 기록 시 저장 되지 않습니다.</p>
        </div>
        <div className="flex">
          <button
            className="w-full font-Heading3 bg-gray-200 text-gray-600 p-3.5 rounded-lg mr-4"
            onClick={() => {
              showLogoutPopup(!closeLogoutPopup);
            }}>
            취소
          </button>
          <button
            className="w-full font-Heading3 bg-red text-white p-3.5 rounded-lg"
            onClick={() => {
              localStorage.removeItem('userid');
              navigate('/calendar');
            }}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopupLogout;
