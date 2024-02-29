// 게시판 상세 페이지
import React, { useEffect, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Link, useLocation, useParams, useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import { getEveryDiary } from '../../api';
import Header1 from '../Header/Header1';
import axios from 'axios';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';
import Edit from '../../pages/write/Edit.jsx';

import { IoSunny } from 'react-icons/io5';
import { FaCloud } from 'react-icons/fa6';
import { IoMoon } from 'react-icons/io5';
import { FaCloudRain } from 'react-icons/fa';

export default function BoardDetail() {
  // const { refetch } = useQuery({ queryKey: ['diaries'], queryFn: getEveryDiary });
  const id = localStorage.getItem('id'); // 로컬 스토리지에서 id 값을 가져옴
  const diaryIdParams = useParams();
  const navigate = useNavigate();
  console.log('diaryIdParams', diaryIdParams.id);

  const [myDiaryInfo, setMyDiaryInfo] = useState({});
  const [oneDiaryInfo, setOneDiaryInfo] = useState({});

  const [whoDiary, setWhoDiary] = useState('');

  const [title, setTitle] = useState('');
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [mood, setMood] = useState('');

  // SB : weather 은 날씨를 저장하는 변수입니다.
  // Clear / Clouds(few clouds, overcast clouds) / Rain(light rain, moderate rain) 의 종류가 있다고 합니다.
  // 현재는 Clear / Clouds / Rain 의 값이 들어옵니다. 각 값에 맞게 조건문으로 이미지를 넣어주시면 될 것 같아요.
  const [weather, setWeather] = useState('');

  // SB : temperature 은 온도를 저장하는 변수입니다.
  // "7", "15" 이런 식으로 문자열로 숫자만 가져와지니까 단위( ex) 도, °C )는 따로 붙이셔야합니다
  const [temperature, setTemperature] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const [diaryId, setDiaryId] = useState(null);

  // pthsname 정보와 상위 컴포넌트에서 정보를 state에 담아서 받아오기
  const state = useLocation();
  console.log('state', state);
  // const { diaryId, diaryTitle, diaryContent, image, mood, nickname } = state.state;

  // url에 있는 정보값 받아오기
  // const params = useParams();
  // console.log('params', params);

  const moodIcon = () => {
    switch (mood) {
      case 'happy':
        return <Happy />;
        break;
      case 'annoying':
        return <Annoying />;
        break;
      case 'great':
        return <Great />;
        break;
      case 'sad':
        return <Sad />;
        break;
      case 'soso':
        return <Soso />;
        break;
    }
  };

  const weatherIcon = () => {
    switch (weather) {
      case 'sunny':
        return <IoSunny className="w-[45px] h-[45px]  mt-[-4px] text-[#ef6767]" />;
      case 'Clear':
        return <IoMoon className="w-[45px] h-[45px] mt-[-4px] text-[#d7cfa4]" />;
      case 'Clouds':
        return <FaCloud className="w-[45px] h-[45px] mt-[-4px] text-[#addad9]" />;
      case 'Rain':
        return <FaCloudRain className="w-[45px] h-[45px] mt-[-4px] text-[#53a9bc]" />;
      default:
        return <IoSunny className="w-[45px] h-[45px] text-[#ef6767] mt-[-4px]" />;
    }
  };

  // SB: 나의 다이어리일 경우 실행시키는(캘린더에서 이어지는) 다이어리 정보 조회 함수입니다.
  const checkUser = async () => {
    try {
      // Diary 작성자 정보를 가져오는 API 호출
      const response = await axios.get(`${process.env.REACT_APP_HOST}/diary/checkUser?diaryId=${diaryIdParams.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });

      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('checkUser data', response.data);
      console.log('id', id);

      if (response.data == id) {
        console.log('나의 다이어리 입니다.');
        getMyDiary();
        setWhoDiary('mine');
      } else {
        console.log('남의 다이어리 입니다.');
        getOneDiary();
        setWhoDiary('someone');
      }
    } catch (error) {
      console.error('Check User Error:', error); // Diary 정보 가져오기 오류 출력
    }
  };

  // SB: 나의 다이어리일 경우 실행시키는(캘린더에서 이어지는) 다이어리 정보 조회 함수입니다.
  const getMyDiary = async () => {
    try {
      // Diary 정보를 가져오는 API 호출
      const response = await axios.get(`${process.env.REACT_APP_HOST}/diary/getMyDiary?diaryId=${diaryIdParams.id}`);

      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('getMyDiary data', response.data);

      // API 응답 데이터를 기반으로 다이어리 정보 설정
      setMyDiaryInfo({
        nickname: response.data.nickname, // 유저 닉네임
        image: response.data.image, // 유저 이미지
        diaryId: diaryIdParams.id, // 다이어리 아이디
        diaryTitle: response.data.diaryTitle, // 다이어리 제목
        diaryContent: response.data.diaryContent, // 다이어리 내용
        mood: response.data.mood, // 기분
        weather: response.data.weather, // 날씨 정보 (SB : 현재는 제대로 된 정보가 들어오지 않습니다.)
        public: response.data.public, // 공개 여부
        createdAt: response.data.createdAt, // 작성일
        updatedAt: response.data.updatedAt, // 수정일 (SB : 수정일 양식이 생성일과 다릅니다. 조만간 수정하겠습니다.)
        likey: response.data.likey, // likey 수
        love: response.data.love, // love 수
        haha: response.data.haha, // haha 수
        wow: response.data.wow, // wow 수
        sad: response.data.sad, // sad 수
        angry: response.data.angry, // angry 수
      });

      setTitle('일기');

      let originDate = response.data.createdAt.split(' ')[0];
      let month = response.data.createdAt.split(' ')[0].split('-')[1].replace('0', '');
      let day = response.data.createdAt.split(' ')[0].split('-')[2];

      let week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');

      let today = new Date(originDate).getDay();
      let todayLabel = week[today];

      let date = month + '월 ' + day + '일 ' + todayLabel;

      setCreatedAt(date);

      setDiaryTitle(response.data.diaryTitle);
      setDiaryContent(response.data.diaryContent);
      setMood(response.data.mood);
      setWeather(response.data.weather.split('/')[0]);
      setTemperature(response.data.weather.split('/')[1]);
    } catch (error) {
      console.error('Get My Diary Error:', error); // Diary 정보 가져오기 오류 출력
    }
  };

  // SB: 타인의 다이어리일 경우 실행시키는(다이어리 목록에서 이어지는) 다이어리 정보 조회 함수입니다.
  const getOneDiary = async () => {
    try {
      // Diary 정보를 가져오는 API 호출
      const response = await axios.get(`${process.env.REACT_APP_HOST}/diary/getOneDiary?diaryId=${diaryIdParams.id}`);

      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('getOneDiary data', response.data);

      // API 응답 데이터를 기반으로 다이어리 정보 설정
      setOneDiaryInfo({
        nickname: response.data.nickname, // 유저 닉네임
        image: response.data.image, // 유저 이미지
        diaryId: diaryIdParams.id, // 다이어리 아이디
        diaryTitle: response.data.diaryTitle, // 다이어리 제목
        diaryContent: response.data.diaryContent, // 다이어리 내용
        mood: response.data.mood, // 기분
        weather: response.data.weather, // 날씨 정보 (SB : 현재는 제대로 된 정보가 들어오지 않습니다.)
        likey: response.data.likey, // likey 수
        love: response.data.love, // love 수
        haha: response.data.haha, // haha 수
        wow: response.data.wow, // wow 수
        sad: response.data.sad, // sad 수
        angry: response.data.angry, // angry 수
        public: response.data.public, // 공개 여부
      });

      setTitle(`${response.data.nickname}의 다이어리`);
      setDiaryTitle(response.data.diaryTitle);
      setDiaryContent(response.data.diaryContent);
      setMood(response.data.mood);
      setWeather(response.data.weather.split('/')[0]);
      setTemperature(response.data.weather.split('/')[1]);
    } catch (error) {
      console.error('Get One Diary Error:', error); // Diary 정보 가져오기 오류 출력
    }
  };

  const deleteDiary = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_HOST}/diary/deleteDiary?diaryId=${diaryIdParams.id}`,
      );

      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('Delete Diary data', response.data);

      navigate('/calendar');
      window.location.reload();
    } catch (error) {
      console.error('Delete Diary Error:', error); // Diary 삭제 오류 출력
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  console.log('temperature', temperature);
  console.log('weather', weather); // sunny ||

  return (
    <>
      <Header1 title={title} />

      {whoDiary === 'mine' ? (
        <div className="text-right px-7">
          <div className="inline-block mr-3">
            <Link to={`/edit/${diaryIdParams.id}`}>
              <svg
                className="h-6 w-6 text-gray-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                {' '}
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Link>
          </div>
          <span className="">
            <button onClick={() => deleteDiary()}>
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                {' '}
                <polyline points="3 6 5 6 21 6" />{' '}
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
                <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </span>
        </div>
      ) : (
        <div className="text-right px-7">
          <div className="inline-block mr-3">
            <Link>
              <svg
                className="h-6 w-6 text-gray-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0 }}>
                {' '}
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Link>
          </div>
          <span className="">
            <button>
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0 }}>
                {' '}
                <polyline points="3 6 5 6 21 6" />{' '}
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
                <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </span>
        </div>
      )}

      {/* 본문 */}
      <div className=" min-h-40 rounded-xl mx-8 my-2 p-4 bg-white">
        <div className="">
          <div className="font-Heading3 text-center mb-8">{createdAt}</div>
          <div className="flex justify-between px-9">
            <div className="text-center">
              <p className="font-Heading3 mb-3">오늘의 기분</p>
              <p className="inline-block  mb-0.5">{moodIcon()}</p>
              <p className="font-Body4 text-gray-800">{mood}</p>
            </div>

            <div className=" text-center">
              <div className="font-Heading3 mb-3">오늘의 날씨</div>
              {/* <p className="inline-block  mb-0.5">날씨 이미지</p> */}
              <div className="flex justify-center font-Body4 text-gray-800">{weatherIcon()}</div>
              <div>{temperature}℃</div>
            </div>
          </div>
        </div>
        <div className="rounded-full border border-gray-300 my-8 mx-4"></div>
        <div className="px-4">
          <div className="text-center">
            <div className="font-Heading2 p-2">{diaryTitle}</div>
            <div className="font-Body2 p-2">{diaryContent}</div>
          </div>
        </div>
      </div>
    </>
  );
}
