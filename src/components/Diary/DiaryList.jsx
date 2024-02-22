import React, { useEffect, useState } from 'react';
import Diary from './Diary';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEveryDiary } from '../../api';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const BoardList = () => {
  const { isLoading, data } = useQuery({ queryKey: ['diaries'], queryFn: getEveryDiary });

  return (
    <>
      <div>
        {isLoading
          ? 'Loading...'
          : data?.map(diary => (
              <Link to={`/diary/${diary.diaryId}`}>
                <Diary
                  key={diary.diaryId}
                  id={diary.diaryId}
                  diaryTitle={diary.diaryTitle}
                  diaryContent={diary.diaryContent}
                  nickname={diary.nickname}
                  image={diary.image}
                  mood={diary.mood}
                />
              </Link>
            ))}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
};

export default BoardList;
