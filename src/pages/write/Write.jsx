// 글 작성 컴포넌트
import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import Header1 from '../../components/Header/Header1';
<<<<<<< HEAD

import Toggle from '../../components/BTN/Toggle';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';
import { useNavigate } from 'react-router-dom';
// import useCurrentLocation from '../../hooks/useGeoLocation';
// import Location from '../../components/Diary/Location';
// import Weather from '../../components/Diary/Weather';
=======
import Location from '../../components/Diary/Location';
import Weather from '../../components/Diary/Weather';
>>>>>>> parent of e7943de (Merge branch 'develop' into fixOpenApiCode/feat/siri)

export default function Write() {
  const editorRef = useRef(); // 에디터 컴포넌트에 접근하기 위한 ref 생성
  const [isPublic, setIsPublic] = useState(true); // 글 비공개 여부
  const { handleSubmit } = useForm();

  const onValid = () => {
    const contents = editorRef.current.getInstance().getHTML(); // getHTML(): 에디터의 내용을 HTML로 가져옴
    console.log(contents);

    const id = localStorage.getItem('id'); // 로컬 스토리지에서 id 값을 가져옴

    const data = {
      id: id,
      diaryTitle: '제목', // '제목' 대신 실제 제목을 입력해야 함
      diaryContent: contents,
      mood: 'annoying', // '기분' 대신 실제 기분 입력해야 함
      location: '서울', // '위치' 대신 실제 위치를 입력해야 함
      weather: '1', // '날씨' 대신 실제 날씨를 입력해야 함
      isPublic: isPublic,
      currentLocation: [37.5665, 126.978], // 실제 [위도, 경도를 입력해야 함
    };

    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', data);

    axios
      .post(`${process.env.REACT_APP_HOST}/diary/postDiary`, data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        if (res.data) {
          console.log('성공');
          alert('게시물이 등록되었습니다.');
        } else {
          console.log('실패~! 음..');
          console.log('res.data: ', res.data);
          alert('로그인이 필요한 서비스입니다.');
        }
      })
      .catch(error => {
        console.log('글 등록 실패: ', error);
        console.log(data);
        console.log('id: ', id);
        console.log('userid: ', id);
      });
  };

  // 비공개 토글 버튼
  const IsPublicToggle = () => {
    setIsPublic(!isPublic); // 비공개 여부를 토글
    if (isPublic === true) console.log(isPublic);
    else console.log(isPublic);
  };

  return (
    <>
      <Header1 title="작성하기" />
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mt-[0px]">
          <div className="ml-[5px]">
            비공개{' '}
            <button type="button" onClick={IsPublicToggle} className="">
              {isPublic ? 'ㅁ' : 'V'}
            </button>
            {/* 작성 버튼을 누르면, 작성이 완료되었다는 알림창을 띄우고 다른 컴포넌트로 이동시키기 */}
            <button
              type="submit"
              className="
              ml-[200px]
     
          ">
              작성하기
            </button>
          </div>
          <div className="openApi">
            <Location />
            <Weather />
          </div>
          <div className="mt-[0px]">
            <Editor
              initialValue="Fill out this form:)" // 에디터의 초기 값
              previewStyle="vertical" // 에디터와 미리보기 패널의 배치
              initialEditType="wysiwyg" // 워지웍 타입 선택
              hideModeSwitch={true} // 하단의 타입 선택 탭 숨김 (마크다운/워지웍)
              useCommandShortcut={false}
              plugins={[colorSyntax]}
              language="ko-KR"
              ref={editorRef}
              height="825px"
              className=""
            />
          </div>
        </div>
      </form>
    </>
  );
}
