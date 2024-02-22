import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../components/Header/Header2';
import PopupNegative from '../../components/Popup/PopupNegative';

const Mypage = () => {
  const [closeLogoutPopup, showLogoutPopup] = useState(false);
  const [closeDeletetPopup, showDeletePopup] = useState(false);
  const navigate = useNavigate();
  const navigatePwChange = () => {
    navigate('/profile');
  };
  const userDelete = () => {
    showDeletePopup(!closeDeletetPopup);
  };
  const userLogout = () => {
    showLogoutPopup(!closeLogoutPopup);
  };
  return (
    <div className="relative">
      <Header2 title="마이페이지" />
      <div className="text-gray-600">
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gray-200 mb-4 rounded-full"></div>
        </div>
        <p className="font-Body1 mb-6 text-center"> id </p>

        <div className="rounded-lg mb-6 w-full bg-gray-200 p-3">
          <div className="relative">
            <p className="font-Caption mb-1.5">아이디</p>
            <p className="font-Body1 mb-6"> id </p>
          </div>

          <div>
            <p className="font-Caption mb-1.5">이메일</p>
            <p className="font-Body1 mb-6"> email </p>
          </div>

          <button className="font-Caption mb-1.5" onClick={navigatePwChange}>
            비밀번호 변경하기
          </button>
        </div>
        <div className="flex justify-between">
          <button className="font-Caption mb-1.5 text-gray-500 p-4" onClick={userDelete}>
            계정 탈퇴하기
          </button>
          <button className="font-Caption mb-1.5  text-gray-500 p-4" onClick={userLogout}>
            로그아웃
          </button>
        </div>
      </div>
      {closeLogoutPopup && (
        <PopupNegative
          title="로그아웃"
          content="*로그아웃 상태에서 기록 시 저장 되지 않습니다."
          cancel="취소"
          active="로그아웃"
          activeOnclick=""
          close={() => {
            showLogoutPopup(!closeLogoutPopup);
          }}
        />
      )}
      {closeDeletetPopup && (
        <PopupNegative
          title="계정 탈퇴하기"
          content="*탈퇴 시 모든 데이터가 삭제되며, 되돌릴수 없습니다."
          cancel="취소"
          active="탈퇴하기"
          activeOnclick=""
          close={() => {
            showDeletePopup(!closeDeletetPopup);
          }}
        />
      )}
    </div>
  );
};

export default Mypage;
