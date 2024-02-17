// 글 작성 컴포넌트
import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
// import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import 'tui-color-picker/dist/tui-color-picker.css';
// import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import '@toast-ui/editor/dist/i18n/ko-kr';

export default function Write() {
  return (
    <>
      <div className="w-[1000px]">
        <Editor
          initialValue="hello react editor world!" // 에디터의 초기 값
          previewStyle="vertical" // 에디터와 미리보기 패널의 배치
          initialEditType="wysiwyg" // 워지웍 타입 선택
          hideModeSwitch={true} // 하단의 타입 선택 탭 숨김 (마크다운/워지웍)
          useCommandShortcut={false}
          // plugins={[colorSyntax]}
          // language="ko-KR"
          className=""
        />
      </div>
    </>
  );
}
