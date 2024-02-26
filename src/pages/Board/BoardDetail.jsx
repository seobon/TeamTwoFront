// 게시판 상세 페이지
import React, { useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import axios from 'axios';

export default function BoardDetail({ contents }) {
  const ENV_URL = process.env.REACT_APP_HOST;
  const id = localStorage.getItem('id'); // 로컬 스토리지에서 id 값을 가져옴

  // SB: 다이어리 아이디를 설정하는 부분입니다. 캘린더 페이지에서 넘겨받은 다이어리 아이디를 넣어주세요.
  const [diaryId, setDiaryId] = useState(null);
  
  const [myDiaryInfo, setMyDiaryInfo] = useState({});

  
  // SB: 나의 다이어리일 경우 실행시키는(캘린더에서 이어지는) 다이어리 정보 조회 함수입니다.
  const checkUser = async () => {
    try {
      // Diary 작성자 정보를 가져오는 API 호출
      // SB : 추후에
      // `${ENV_URL}/diary/checkUser?diaryId=12` 를
      // `${ENV_URL}/diary/checkUser?diaryId=${diaryId}` 로
      // 수정하시면 되겠습니다.
      const response = await axios.get(
        `${ENV_URL}/diary/checkUser?diaryId=12`
      );
  
      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log("checkUser data", response.data)

      if (response.data == 1) {
        console.log("나의 다이어리 입니다.")
      } else {
        console.log("남의 다이어리 입니다.")
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
      // `${ENV_URL}/diary/getMyDiary?diaryId=12` 를
      // `${ENV_URL}/diary/getMyDiary?diaryId=${diaryId}` 로
      // 수정하시면 되겠습니다.
      const response = await axios.get(
        `${ENV_URL}/diary/getMyDiary?diaryId=12`
      );
  
      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log("getMyDiary data", response.data)

      // API 응답 데이터를 기반으로 다이어리 정보 설정
      setMyDiaryInfo({
        nickname: response.data.nickname, // 유저 닉네임
        image: response.data.image, // 유저 이미지
        diaryId: response.data.diaryId, // 다이어리 아이디
        diaryTitle: response.data.diaryTitle, // 다이어리 제목
        diaryContent: response.data.diaryContent, // 다이어리 내용
        mood: response.data.mood, // 기분
        createdAt: response.data.createdAt, // 작성일
        updatedAt: response.data.updatedAt, // 수정일 (SB : 수정일 양식이 생성일과 다릅니다. 조만간 수정하겠습니다.)
        weather: response.data.weather, // 날씨 정보 (SB : 현재는 제대로 된 정보가 들어오지 않습니다.)
        likey: response.data.likey, // likey 수
        love: response.data.love, // love 수
        haha: response.data.haha, // haha 수
        wow: response.data.wow, // wow 수
        sad: response.data.sad, // sad 수
        angry: response.data.angry, // angry 수
        public: response.data.public, // 공개 여부
      });
  
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
      const response = await axios.get(
        `${ENV_URL}/diary/getOneDiary?diaryId=12`
      );
  
      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log("getOneDiary data", response.data)

      // API 응답 데이터를 기반으로 다이어리 정보 설정
      setMyDiaryInfo({
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
  
    } catch (error) {
      console.error('Get One Diary Error:', error); // Diary 정보 가져오기 오류 출력
    }
  };

  return (
    <>
      <Viewer initialValue={contents || ''} />
      <button onClick={() => checkUser()}>나의 다이어리 정보 가져오기</button>
      <br />
      <button onClick={() => getOneDiary()}>남의 다이어리 정보 가져오기</button>
    </>
  );
}
