// 게시판 상세 페이지
import React, { useEffect, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Link, useLocation, useParams, useMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEveryDiary } from '../../api';
import Header1 from '../Header/Header1';
import axios from 'axios';

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

  // pthsname 정보와 상위 컴포넌트에서 정보를 state에 담아서 받아오기
  const state = useLocation();
  console.log('state', state);
  // const { diaryId, diaryTitle, diaryContent, image, mood, nickname } = state.state;

  // url에 있는 정보값 받아오기
  // const params = useParams();
  // console.log('params', params);

  // SB: 나의 다이어리일 경우 실행시키는(캘린더에서 이어지는) 다이어리 정보 조회 함수입니다.
  const checkUser = async () => {
    try {
      // Diary 작성자 정보를 가져오는 API 호출
      // SB : 추후에
      // `${ENV_URL}/diary/checkUser?diaryId=17` 를
      // `${ENV_URL}/diary/checkUser?diaryId=${diaryId}` 로
      // 수정하시면 되겠습니다.
      const response = await axios.get(`${ENV_URL}/diary/checkUser?diaryId=1`);

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
      const response = await axios.get(`${ENV_URL}/diary/getMyDiary?diaryId=1`);

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
      const response = await axios.get(`${ENV_URL}/diary/getOneDiary?diaryId=16`);

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

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Header1 title={title} />
      {/* <div>{nickname}</div>
      <div>{diaryTitle}</div>
      <div>{diaryContent}</div> */}
      {/* <Viewer initialValue={contents || ''} /> */}

      <div className="ml-[330px] mb-[3px]">
        <span className="mr-[10px]">
          <Link to={'/calendar'}>수정</Link>
        </span>
        <span className="">
          <button onClick={''}>삭제</button>
        </span>
      </div>

      {/* 본문 */}
      <div className="w-[410px] min-h-[790px] rounded-xl ml-[10px] bg-white">
        {whoDiary === 'mine' ? (
          <div className="m-[15px]">
            <div className="font-Heading3 text-center mb-[20px]">{createdAt}</div>
            <div style={{ backgroundColor: 'pink' }}>
              <div>오늘의 기분</div>
              <div>기분 이미지</div>
              <div>{mood}</div>
            </div>
            <div style={{ backgroundColor: 'lightyellow' }}>
              <div>오늘의 날씨</div>
              <div>날씨 이미지</div>
              <div>{weather}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="m-[15px]">
          <div style={{ backgroundColor: 'lightgreen' }}>
            <div>{diaryTitle}</div>
            <div>{diaryContent}</div>
          </div>
        </div>
      </div>
    </>
  );
}
