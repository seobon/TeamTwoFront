import React, { useEffect } from 'react';
import Diary from './Diary';
import { Link } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getEveryDiary, getEveryDiaryTest } from '../../api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useInView } from 'react-intersection-observer';

const BoardList = () => {
  const { ref, inView } = useInView();

  // const { isLoading, data } = useQuery({ queryKey: ['diaries'], queryFn: getEveryDiary });

  // Todo : 무한 스크롤 구현을 위한 백엔드 코드 수정 필요
  //* 무한 스크롤 구현을 위한 useInfiniteQuery 사용
  //* inView가 화면에 보일 때마다 fetchNextPage() 호출
  //* fetchNextPage() 호출 시 pageParam으로 다음 페이지 번호 전달
  //* pageParm으로 전달된 페이지 번호를 기준으로 서버로부터 데이터를 받아오기

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['diariesInfinite'],
    queryFn: getEveryDiaryTest,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log('allPages', allPages.length);
      return lastPage.length === 0 ? undefined : allPages.length + 1;
    },
  });

  const contents = data?.pages[0];
  // console.log('contents', contents);
  // const content = data?.pages.map(diaries => diaries.map(diary => diary));

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('inView', inView);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      <div>
        {status === 'error' && <div>Error</div>}
        {status === 'pending'
          ? 'Loading...'
          : contents?.map(diary => (
              <Link
                to={`/diary/${diary.diaryId}`}
                state={{
                  diaryId: diary.diaryId,
                  diaryTitle: diary.diaryTitle,
                  diaryContent: diary.diaryContent,
                  nickname: diary.nickname,
                  image: diary.image,
                  mood: diary.mood,
                }}>
                <Diary
                  key={diary.diaryId}
                  diaryId={diary.diaryId}
                  diaryTitle={diary.diaryTitle}
                  diaryContent={diary.diaryContent}
                  nickname={diary.nickname}
                  image={diary.image}
                  mood={diary.mood}
                />
              </Link>
            ))}
      </div>
      <div ref={ref} disabled={!hasNextPage || isFetchingNextPage}>
        observer
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
};

export default BoardList;
