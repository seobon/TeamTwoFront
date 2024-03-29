// 글 수정 컴포넌트
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';

import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { FaCheck } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa6";

export default function Write() {
  const navigate = useNavigate();
  const editorRef = useRef(); // 에디터 컴포넌트에 접근하기 위한 ref 생성
  const diaryIdParams = useParams();
  const [isPublic, setIsPublic] = useState(true); // 글 비공개 여부
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState("null");
  const [mood, setMood] = useState('');
  const { handleSubmit } = useForm();

  const getMyDiary = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}/diary/getMyDiary?diaryId=${diaryIdParams.id}`
      );
      
      // SB: 콘솔 확인 부분입니다. 추후 삭제하시면 됩니다.
      console.log('getMyDiary data', response.data);

      setDiaryTitle(response.data.diaryTitle);
      setDiaryContent(response.data.diaryContent);
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
      diaryId: diaryIdParams.id,
      diaryTitle: diaryTitle, // '제목' 대신 실제 제목을 입력해야 함
      diaryContent: contents,
      mood: mood, // '기분' 대신 실제 기분 입력해야 함
      isPublic: isPublic,
    };

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
      navigate(`/diary/detail/${diaryIdParams.id}`);
      window.location.reload();
  };

  // 비공개 토글 버튼
  const IsPublicToggle = () => {
    setIsPublic(!isPublic); // 비공개 여부를 토글
    if (isPublic === true) console.log(isPublic);
    else console.log(isPublic);
  };


  useEffect(() => {
    getMyDiary();
  }, []);

  if (diaryContent == "null") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header1 title="수정하기" />
      <form onSubmit={handleSubmit(onValid)}>
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

          <div className="text-center ml-[100px] mb-[-70px] flex">
          <span className="text-[16px] mt-[13px] mr-[8px] flex-row">비공개</span>
            <button type="button" onClick={IsPublicToggle} className="mt-[16px] mr-[20px] mb-[100px]">
              {isPublic ? <FaRegSquare /> : <FaCheck />}
            </button>

            {/* 수정 버튼을 누르면 수정이 완료되었다는 알림창을 띄우고 다른 컴포넌트로 이동시키기 */}
            <button type="submit" className="flex inline-block mt-[13px] ml-[0px] mb-[12px] text-[6px]">
              <span className="text-[16px] mt-[0px] ml-[3px] mr-[0px] ">수정</span>
              {/* 수정 버튼 */}
              <HiOutlinePencilSquare className="w-[23px] h-[23px] mt-[-1px] ml-[8px] mr-[4px] mb-[1px]" />
            </button>
          </div>

          <div className="openApi">
            {/* <Location />
            <Weather /> */}
          </div>


          <span className='text-[14px] ml-[4px]'>제목</span>
          <input
            className="w-full h-7 mb-2 p-2 bg-white rounded-lg border border-solid focus:outline-none focus:bg-white active:bg-white text-[11px]"
            value={diaryTitle}
            onChange={(e) => setDiaryTitle(e.target.value)}
          />

          <div className="mt-[0px]">
            <Editor
            initialValue={`${diaryContent}`} // 에디터의 초기 값
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
