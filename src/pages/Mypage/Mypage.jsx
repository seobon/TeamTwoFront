import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header2 from '../../components/Header/Header2';
import PopupNegative from '../../components/Popup/PopupNegative';
import PopupLogout from '../../components/Popup/PopupLogout';
import axios from 'axios';
import defultImg from '../../assets/profileDefult.jpg';

const Mypage = () => {
  const [closeLogoutPopup, showLogoutPopup] = useState(false);
  const [closeDeletetPopup, showDeletePopup] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const userid = localStorage.getItem('userid');
  const id = localStorage.getItem('id');

  const [image, setImage] = useState();
  const [imagePath, setImagePath] = useState('');
  const ENV_URL = process.env.REACT_APP_DB_HOST;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOST}/user/profile/${userid}`);
        setUserInfo(response.data);
      } catch (error) {
        navigate('/signin');
      }
    };
    fetchData();
  }, []);

  const navigatePwChange = () => {
    navigate('/profile/password');
  };
  const userDelete = () => {
    showDeletePopup(!closeDeletetPopup);
  };
  const userLogout = () => {
    showLogoutPopup(!closeLogoutPopup);
  };

  const handleImgError = e => {
    e.target.src = defultImg;
  };

  const nickNameChange = () => {
    navigate('/profile/nickname');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/user/profile/${userid}`);
      setUserInfo(response.data);
      setImagePath(`${process.env.REACT_APP_HOST}/static/images/${response.data.image}`);
    } catch (error) {
      navigate('/signin');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SB: 파일 전송 함수
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('image', image);

    if (!image) {
      alert('프로필로 사용할 이미지 파일을 업로드 해주세요.');
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_HOST}/user/image/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // Cookie: 'JSESSIONID=5514A3BAA93825EC043007EED56EAF5F',
          },
        });
        setImagePath(response.data);
        // fetchData();
      } catch (error) {
        alert('파일 전송에 실패했습니다. 잠시 후 다시 시도해주세요');
      }
    }
  };

  // const fetchImageUrl = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_HOST}/user/image/${id}`);

  //     setImagePath(`${process.env.REACT_APP_HOST}/static/images/${response.data}`);
  //   } catch (error) {
  //     console.error('이미지 유알에 가져오기 실패!!', error);
  //   }
  // };
  // useEffect(() => {
  //   fetchImageUrl();
  // }, []);

  useEffect(() => {
    console.log('imagePath : ', imagePath);
  }, [imagePath]);

  // SB: 파일 url을 useState로 저장하는 함수
  const handleImageUpload = e => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="relative">
      <Header2 title="마이페이지" />
      <div className="text-gray-600">
        <div className="flex justify-center">
          <div>
            {/* SB: 파일 전송 폼 태그 */}

            <form className="fileForm text-center" onSubmit={handleSubmit}>
              {image && (
                <button type="submit" className="submitButton p-2">
                  이미지 저장
                </button>
              )}
              <div className="w-32 h-32 bg-gray-200 bg-no-repeat bg-cover mb-2 rounded-full relative overflow-clip">
                <label htmlFor="fileInput" className="text-center">
                  {!imagePath ? (
                    <div className="fileExImage text-center relative">
                      <img src="/static/exImage.png" alt="수정하기" className="rounded-full" onError={handleImgError} />
                    </div>
                  ) : (
                    <div className="fileExImage text-center relative">
                      <img src={imagePath} alt="수정하기" className="rounded-full" onError={handleImgError} />
                    </div>
                  )}
                  <input id="fileInput" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white drop-shadow-sm font-Caption">
                    수정하기
                  </div>
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="rounded-full"
                      style={{ width: '150px', height: '150px' }}
                    />
                  )}
                </label>
              </div>
            </form>
          </div>
        </div>
        <p className="font-Body1 mb-6 text-center p-1 hover:cursor-pointer" onClick={nickNameChange}>
          {userInfo?.nickname}{' '}
        </p>

        <div className="rounded-lg mb-6 w-full bg-gray-200 p-3">
          <div className="relative">
            <p className="font-Caption mb-1.5">아이디</p>
            <p className="font-Body1 mb-6"> {userInfo?.userid} </p>
          </div>

          <div>
            <p className="font-Caption mb-1.5">이메일</p>
            <p className="font-Body1 mb-6"> {userInfo?.email} </p>
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
