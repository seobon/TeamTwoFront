// 게시판 상세 페이지
import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Link, useLocation, useParams, useMatch } from 'react-router-dom';

export default function BoardDetail({ contents }) {
  // pthsname 정보와 상위 컴포넌트에서 정보를 state에 담아서 받아오기
  const state = useLocation();
  console.log('state', state);

  // url에 있는 정보값 받아오기
  const params = useParams();
  console.log('params', params);

  return (
    <>
      <Viewer initialValue={contents || ''} />
      test diary
    </>
  );
}
