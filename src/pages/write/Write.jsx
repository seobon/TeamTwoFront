// 글 작성 컴포넌트
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

export default function Write() {
  const editorRef = useRef(); // 에디터 컴포넌트에 접근하기 위한 ref 생성
  const [isPublic, setIsPublic] = useState(true); // 글 비공개 여부
  const { handleSubmit } = useForm();

  const onValid = () => {
    const contents = editorRef.current.getInstance().getHTML(); // getHTML(): 에디터의 내용을 HTML로 가져옴
    console.log(contents);

    // FormData 객체
    const formData = new FormData();
    formData.append('id', '사용자ID'); // 사용자ID 대신 실제 사용자ID를 입력해야 함
    formData.append('diaryTitle', '제목'); // '제목' 대신 실제 제목을 입력해야 함
    formData.append('diaryContent', contents);
    formData.append('mood', '기분'); // '기분' 대신 실제 기분을 입력해야 함
    formData.append('location', '위치'); // '위치' 대신 실제 위치를 입력해야 함
    formData.append('weather', '날씨'); // '날씨' 대신 실제 날씨를 입력해야 함
    formData.append('isPublic', isPublic);

    axios
      .post(`${process.env.REACT_APP_HOST}/diary/postDiary`, formData, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data);
        if (res.data.result) {
          alert('게시물이 등록되었습니다.');
          // navigator('');
        } else {
          alert('로그인이 필요한 서비스입니다.');
          navigator('/signin');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // 비공개 토글 버튼
  const IsPublicToggle = () => {
    setIsPublic(!isPublic); // 비공개 여부를 토글
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mt-[30px]">
          <div className="">
            비공개{' '}
            <button type="button" onClick={IsPublicToggle} className="">
              {isPublic ? 'ㅁ' : 'V'}
            </button>
            {/* 작성 버튼을 누르면, 작성이 완료되었다는 알림창을 띄우고 다른 컴포넌트로 이동시키기 */}
            <button
              type="submit"
              className="
              ml-[200px]
              border
            border-black
          ">
              작성하기
            </button>
          </div>
          <div className="mt-[10px]">
            <Editor
              initialValue="스타일 커스텀 젼나 안되네 아오" // 에디터의 초기 값
              previewStyle="vertical" // 에디터와 미리보기 패널의 배치
              initialEditType="wysiwyg" // 워지웍 타입 선택
              hideModeSwitch={true} // 하단의 타입 선택 탭 숨김 (마크다운/워지웍)
              useCommandShortcut={false}
              plugins={[colorSyntax]}
              language="ko-KR"
              ref={editorRef}
              height="865px"
              className=""
            />
          </div>
        </div>
      </form>
    </>
  );
}
