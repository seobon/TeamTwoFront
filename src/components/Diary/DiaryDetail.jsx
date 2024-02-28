// 게시판 상세 페이지
import React, { useEffect, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Link, useLocation, useParams, useMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEveryDiary } from '../../api';
import Header1 from '../Header/Header1';
import axios from 'axios';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';
import Edit from '../../pages/write/Edit.jsx';

export default function BoardDetail() {
  const ENV_URL = process.env.REACT_APP_HOST;
  const { refetch } = useQuery({ queryKey: ['diaries'], queryFn: getEveryDiary });
  const id = localStorage.getItem('id'); // 로컬 스토리지에서 id 값을 가져옴

  const [myDiaryInfo, setMyDiaryInfo] = useState({});
  const [oneDiaryInfo, setOneDiaryInfo] = useState({});

  const [whoDiary, setWhoDiary] = useState('');

  const [title, setTitle] = useState('');
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [mood, setMood] = useState('');
  const [weather, setWeather] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const [diaryId, setDiaryId] = useState(null);

  // pthsname 정보와 상위 컴포넌트에서 정보를 state에 담아서 받아오기
  const state = useLocation();
  console.log('state', state);
  // const { diaryId, diaryTitle, diaryContent, image, mood, nickname } = state.state;

  // url에 있는 정보값 받아오기
  // const params = useParams();
  // console.log('params', params);

  const diarySet = async () => {
    setDiaryId(29);
  };

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
  // SB: 나의 다이어리일 경우 실행시키는(캘린더에서 이어지는) 다이어리 정보 조회 함수입니다.
  const checkUser = async () => {
    try {
      // Diary 작성자 정보를 가져오는 API 호출
      // SB : 추후에
      // `${ENV_URL}/diary/checkUser?diaryId=17` 를
      // `${ENV_URL}/diary/checkUser?diaryId=${diaryId}` 로
      // 수정하시면 되겠습니다.

      // const response = await axios.get(`${ENV_URL}/diary/checkUser?diaryId=1`);
      const response = await axios.get(`${ENV_URL}/diary/checkUser?diaryId=${diaryId}`);

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
      // SB : 추후에
      // `${ENV_URL}/diary/getMyDiary?diaryId=17` 를
      // `${ENV_URL}/diary/getMyDiary?diaryId=${diaryId}` 로
      // 수정하시면 되겠습니다.
      const response = await axios.get(`${ENV_URL}/diary/getMyDiary?diaryId=${diaryId}`);

      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('getMyDiary data', response.data);

      // API 응답 데이터를 기반으로 다이어리 정보 설정
      setMyDiaryInfo({
        nickname: response.data.nickname, // 유저 닉네임
        image: response.data.image, // 유저 이미지
        diaryId: response.data.diaryId, // 다이어리 아이디
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
      setWeather(response.data.weather);
    } catch (error) {
      console.error('Get My Diary Error:', error); // Diary 정보 가져오기 오류 출력
    }
  };

  // SB: 타인의 다이어리일 경우 실행시키는(다이어리 목록에서 이어지는) 다이어리 정보 조회 함수입니다.
  const getOneDiary = async () => {
    try {
      // Diary 정보를 가져오는 API 호출
      // SB : 추후에
      // `${ENV_URL}/diary/getOneDiary?diaryId=12` 를
      // `${ENV_URL}/diary/getOneDiary?diaryId=${diaryId}` 로
      // 수정하시면 되겠습니다.

      // const response = await axios.get(`${ENV_URL}/diary/getOneDiary?diaryId=16`);
      const response = await axios.get(`${ENV_URL}/diary/getOneDiary?diaryId=${diaryId}`);

      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('getOneDiary data', response.data);

      // API 응답 데이터를 기반으로 다이어리 정보 설정
      setOneDiaryInfo({
        nickname: response.data.nickname, // 유저 닉네임
        image: response.data.image, // 유저 이미지
        diaryId: response.data.diaryId, // 다이어리 아이디
        diaryTitle: response.data.diaryTitle, // 다이어리 제목
        diaryContent: response.data.diaryContent, // 다이어리 내용
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
    } catch (error) {
      console.error('Get One Diary Error:', error); // Diary 정보 가져오기 오류 출력
    }
  };

  const deleteDiary = async () => {
    let data = {
      diaryId: 1,
    };

    try {
      const response = await axios.delete(`${ENV_URL}/diary/deleteDiary`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('deleteDiary data', response.data);
    } catch (error) {
      console.error('Delete Diary Error:', error); // Diary 삭제 오류 출력
    }
  };

  useEffect(() => {
    if (diaryId != null) {
      checkUser();
    } else {
      diarySet();
    }
  }, [diaryId]);

  return (
    <>
      <Header1 title={title} />
      {/* <div>{nickname}</div>
      <div>{diaryTitle}</div>
      <div>{diaryContent}</div> */}
      {/* <Viewer initialValue={contents || ''} /> */}

      <div className="text-right px-7">
        <div className="inline-block mr-3">
          <Link to={'/edit'}>
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
          {/* <Link to={{
            pathname: '/edit',
            state: { data: diaryContent }
          }}>수정</Link> */}
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

      {/* 본문 */}
      <div className=" min-h-40 rounded-xl mx-8 my-2 p-4 bg-white">
        {whoDiary === 'mine' ? (
          <div className="">
            <div className="font-Heading3 text-center mb-8">{createdAt}</div>
            <div className="flex justify-between px-9">
              <div className="text-center">
                <p className="font-Heading3 mb-3">오늘의 기분</p>
                <p className="inline-block  mb-0.5">{moodIcon()}</p>
                <p className="font-Body4 text-gray-800">{mood}</p>
              </div>
              <div className="text-center">
                <p className="font-Heading3 mb-3">오늘의 날씨</p>
                <p className="inline-block  mb-0.5">날씨 이미지</p>
                <div className="font-Body4 text-gray-800">{weather}</div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
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
