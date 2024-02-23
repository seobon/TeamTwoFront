// 게시판 상세 페이지
import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Link, useLocation, useParams, useMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEveryDiary } from '../../api';
import Header1 from '../../components/Header/Header1';

export default function BoardDetail() {
  const { refetch } = useQuery({ queryKey: ['diaries'], queryFn: getEveryDiary });

  // pthsname 정보와 상위 컴포넌트에서 정보를 state에 담아서 받아오기
  const state = useLocation();
  console.log('state', state);
  const { diaryId, diaryTitle, diaryContent, image, mood, nickname } = state.state;

  // url에 있는 정보값 받아오기
  // const params = useParams();
  // console.log('params', params);

  return (
    <>
      <Header1 title={`날짜 들어올 자리`} />
      <div>{nickname}</div>
      <div>{diaryTitle}</div>
      <div>{diaryContent}</div>
      {/* <Viewer initialValue={contents || ''} /> */}
    </>
  );
}
