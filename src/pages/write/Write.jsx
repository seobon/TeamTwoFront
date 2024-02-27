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
import Toggle from '../../components/BTN/Toggle';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';
import { useNavigate } from 'react-router-dom';
import Location from '../../components/Diary/Location';
import Weather from '../../components/Diary/Weather';


export default function Write() {
  const navigate = useNavigate();

  const editorRef = useRef(); // 에디터 컴포넌트에 접근하기 위한 ref 생성

  const [isPublic, setIsPublic] = useState(true); // 글 비공개 여부
  const { handleSubmit } = useForm();

  const [isOn, setIsOn] = useState(false);
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState();
  // const { location, error } = useCurrentLocation();

  const diaryWriteSubmit = () => {
    const contents = editorRef.current.getInstance().getMarkdown(); // getHTML(): 에디터의 내용을 HTML로 가져옴

    const id = localStorage.getItem('id'); // 로컬 스토리지에서 id 값을 가져옴

    const data = {
      id: id,
      diaryTitle: title,
      diaryContent: contents,
      mood: mood,
      // location: '서울', // '위치' 대신 실제 위치를 입력해야 함
      // weather: '1', // '날씨' 대신 실제 날씨를 입력해야 함
      isPublic: isOn,
      // currentLocation: [37.5665, 126.978], // 실제 [위도, 경도를 입력해야 함
    };

    console.log(data);
    
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
      navigate("/calendar")
  };

  //비공개 토글
  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <Header1 title="작성하기" />
      <form onSubmit={diaryWriteSubmit}>
        <div className="mt-[0px]">
          <div className="text-center">
            <p className="font-Heading4">오늘의 기분</p>
            <div
              className="flex justify-between items-center font-Body4 p-4 px-12"
              onChange={e => {
                setMood(e.target.value);
              }}>
              <label htmlFor="happy">
                <input id="happy" type="radio" name="mood" value="happy" className="hidden" />{' '}
                <Happy className={mood === 'happy' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="great">
                <input id="great" type="radio" name="mood" value="great" className="hidden" />{' '}
                <Great className={mood === 'great' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="soso">
                <input id="soso" type="radio" name="mood" value="soso" className="hidden" />{' '}
                <Soso className={mood === 'soso' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="sad">
                <input id="sad" type="radio" name="mood" value="sad" className="hidden" />{' '}
                <Sad className={mood === 'sad' ? 'opacity-100' : 'opacity-50'} />
              </label>
              <label htmlFor="annoying">
                <input id="annoying" type="radio" name="mood" value="annoying" className="hidden" />{' '}
                <Annoying className={mood === 'annoying' ? 'opacity-100' : 'opacity-50'} />
              </label>
            </div>
          </div>
          <div className="flex justify-between items-start mt-4 px-4">
            <div className="text-center">
              <span className="font-Caption">오늘의 날씨</span>
              <div className="">날씨 아이콘</div>
            </div>
            <div className="text-center inline-block mb-8">
              {isOn ? (
                <span className="font-Caption">공개 다이어리</span>
              ) : (
                <span className="font-Caption">비공개 다이어리</span>
              )}
              <Toggle isOn={isOn} toggleHandler={toggleHandler} />
            </div>
          </div>
          <div className="openApi">

            {/* <Location />
            <Weather /> */}

          </div>
          <input
            className="w-full h-10 mb-4 p-2 bg-white rounded-lg border border-solid focus:outline-none focus:bg-white active:bg-white"
            placeholder="오늘 하루를 짧게 제목을 지어주세요."
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <div className="">
            <Editor
              initialValue="Fill out this form:)" // 에디터의 초기 값
              previewStyle="vertical" // 에디터와 미리보기 패널의 배치
              initialEditType="wysiwyg" // 워지웍 타입 선택
              hideModeSwitch={true} // 하단의 타입 선택 탭 숨김 (마크다운/워지웍)
              useCommandShortcut={false}
              plugins={[colorSyntax]}
              language="ko-KR"
              ref={editorRef}
              height="300px"
            />
          </div>
          {/* 작성 버튼을 누르면, 작성이 완료되었다는 알림창을 띄우고 다른 컴포넌트로 이동시키기 */}
          <button type="submit" className="mt-8 btn-full-fill">
            작성하기
          </button>
        </div>
      </form>
    </>
  );
}
