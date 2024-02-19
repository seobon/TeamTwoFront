// 게시판 상세 페이지
import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

export default function BoardDetail({ contents }) {
  return (
    <>
      <Viewer initialValue={contents || ''} />
    </>
  );
}
