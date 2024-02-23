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
      <div className="flex flex-col gap-2">
        {isLoading
          ? 'Loading...'
          : data?.map(diary => (
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
