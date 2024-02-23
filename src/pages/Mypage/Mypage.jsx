import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../components/Header/Header2';
import PopupNegative from '../../components/Popup/PopupNegative';
import PopupLogout from '../../components/Popup/PopupLogout';
import axios from 'axios';

const Mypage = () => {
  const [closeLogoutPopup, showLogoutPopup] = useState(false);
  const [closeDeletetPopup, showDeletePopup] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const userid = localStorage.getItem('userid');
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/user/profile/${userid}`);
        setUserInfo(response.data);
      } catch (error) {
        console.log('유저 데이터 찾기 싪패: ', error);
      }
    };
    fetchData();
  }, []);

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
        <p className="font-Body1 mb-6 text-center">{userInfo?.userid} id </p>

        <div className="rounded-lg mb-6 w-full bg-gray-200 p-3">
          <div className="relative">
            <p className="font-Caption mb-1.5">아이디</p>
            <p className="font-Body1 mb-6"> {userInfo?.userid} </p>
            {/* <p className="font-Body1 mb-6"> id </p> */}
          </div>

          <div>
            <p className="font-Caption mb-1.5">이메일</p>
            <p className="font-Body1 mb-6"> {userInfo?.email} </p>
            {/* <p className="font-Body1 mb-6"> email </p> */}
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
      {closeLogoutPopup && <PopupLogout closeLogoutPopup={closeLogoutPopup} showLogoutPopup={showLogoutPopup} />}
      {closeDeletetPopup && <PopupNegative closeDeletetPopup={closeDeletetPopup} showDeletePopup={showDeletePopup} />}
    </div>
  );
};

export default Mypage;
