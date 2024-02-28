import React from 'react';
import DiaryList from '../../components/Diary/DiaryList';
import Header1 from '../../components/Header/Header1';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Link } from 'react-router-dom';

/*
 * 1. 서버로부터 axios.get('/getEveryDiary')로 받아온 데이터를 DiaryList 컴포넌트에 담아 화면에 보여주는 컴포넌트
 * 2. 페이지네이션은 서버로부터 받아온 데이터의 총 개수를 기준으로 표시
 * 3. 검색어 입력하면 디바운서로 1초 후에 axios.get('/diary/search') 검색 요청
 * 4. 검색 결과 받으면 SearchList로 컴포넌트 교체해서 표시
 * 5. 검색 창 닫으면 다시 DiaryList로 컴포넌트 교체해서 표시
 */

const Board = () => {
  // const diaryData = useQuery({ queryKey: ['dairy'], queryFn: getEveryDiary, config: { staleTime: 1000 * 60 * 5 } });
  // axios.get('http://localhost:8080/diary/getEveryDiary').then(res => {
  //   console.log('res: ', res);
  // });

  return (
    <div>
      <Header1 title="다이어리" />
      <DiaryList />
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default Board;
