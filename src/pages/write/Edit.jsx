// 글 수정 컴포넌트
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Header1 from '../../components/Header/Header1';

import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';
// import useCurrentLocation from '../../hooks/useGeoLocation';
// import Location from '../../components/Diary/Location';
// import Weather from '../../components/Diary/Weather';

export default function Write() {
  const location = useLocation();
  const editorRef = useRef(); // 에디터 컴포넌트에 접근하기 위한 ref 생성
  const [diaryId, setDiaryId] = useState(null);
  const [isPublic, setIsPublic] = useState(true); // 글 비공개 여부
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [mood, setMood] = useState('');
  const { handleSubmit } = useForm();
  // const { location, error } = useCurrentLocation();

  const diarySet = async () => {
    setDiaryId(6);
  }

  const getMyDiary = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/diary/getMyDiary?diaryId=${diaryId}`
      );
      
      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('getMyDiary data', response.data);

      setDiaryTitle(response.data.diaryTitle);
      setDiaryContent(response.data.diaryTitle);
      setMood(response.data.mood);
      setIsPublic(response.data.public)
    } catch (error) {
      console.error('Get My Diary Error:', error); // Diary 정보 가져오기 오류 출력
    }
  };


  const onValid = () => {
    const contents = editorRef.current.getInstance().getMarkdown();

    console.log(contents);
    const id = localStorage.getItem('id'); // 로컬 스토리지에서 id 값을 가져옴

    const data = {
      diaryId: 6,
      diaryTitle: diaryTitle, // '제목' 대신 실제 제목을 입력해야 함
      diaryContent: contents,
      mood: mood, // '기분' 대신 실제 기분 입력해야 함
      // location: '서울', // '위치' 대신 실제 위치를 입력해야 함
      // weather: '1', // '날씨' 대신 실제 날씨를 입력해야 함
      isPublic: isPublic,
      // currentLocation: [37.5665, 126.978], // 실제 [위도, 경도를 입력해야 함
    };

    console.log(data);

    axios
      .patch(`${process.env.REACT_APP_HOST}/diary/patchDiary`, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.data) {
          alert('다이어리 수정되었습니다.');
        } else {
          alert('로그인이 필요한 서비스입니다.');
        }
      })
      .catch(error => {
        console.log('다이어리 수정 실패: ', error);
      });
  };

  // 비공개 토글 버튼
  const IsPublicToggle = () => {
    setIsPublic(!isPublic); // 비공개 여부를 토글
    if (isPublic === true) console.log(isPublic);
    else console.log(isPublic);
  };


  useEffect(() => {
    if(diaryId != null) {
      getMyDiary();
    } else {
      diarySet();
    }
  }, [diaryId]);
  return (
    <>
      <div></div>
    </>
  );
}
