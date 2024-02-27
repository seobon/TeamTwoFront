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
  const ENV_URL = process.env.REACT_APP_HOST;
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
        `${ENV_URL}/diary/getMyDiary?diaryId=${diaryId}`
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
      <Header1 title="수정하기" />
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mt-[0px]">
        <p className="font-Heading4">오늘의 기분</p>
            <div
              className="flex justify-between items-center font-Body4 p-4 px-12"
              onChange={e => {
                setMood(e.target.value);
              }}>
              <label htmlFor="happy">
                <input id="happy" type="radio" name="mood" value="happy" className="hidden" />{' '}
                <Happy className={'opacity-100'} />
              </label>
              <label htmlFor="great">
                <input id="great" type="radio" name="mood" value="great" className="hidden" />{' '}
                <Great className={'opacity-100'} />
              </label>
              <label htmlFor="soso">
                <input id="soso" type="radio" name="mood" value="soso" className="hidden" />{' '}
                <Soso className={'opacity-100'} />
              </label>
              <label htmlFor="sad">
                <input id="sad" type="radio" name="mood" value="sad" className="hidden" />{' '}
                <Sad className={'opacity-100'} />
              </label>
              <label htmlFor="annoying">
                <input id="annoying" type="radio" name="mood" value="annoying" className="hidden" />{' '}
                <Annoying className={'opacity-100'} />
              </label>
            </div>
          <div className="ml-[5px]">
            비공개{' '}
            <button type="button" onClick={IsPublicToggle} className="">
              {isPublic ? 'ㅁ' : 'V'}
            </button>
            {/* 작성 버튼을 누르면, 작성이 완료되었다는 알림창을 띄우고 다른 컴포넌트로 이동시키기 */}
            <button
              type="submit"
              className="ml-[200px]">
              수정하기
            </button>
          </div>
          <div className="openApi">
            {/* <Location />
            <Weather /> */}
          </div>
          제목 : <input type="text"
                  className="titleInput"
                  value={diaryTitle}
                  onChange={(e) => setDiaryTitle(e.target.value)}
                />
          <div className="mt-[0px]">
            <Editor
              initialValue={`Fill out this form:)`} // 에디터의 초기 값
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
