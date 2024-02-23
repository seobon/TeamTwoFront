import React from 'react';
import { useLocation } from 'react-router-dom';

const moods = {
  soso: { color: 'bg-green', hover: 'hover:bg-green', text: '평온해요' },
  happy: { color: 'bg-yellow', hover: 'hover:bg-yellow', text: '기뻐요' },
  great: { color: 'bg-white', hover: 'hover:bg-brown', text: '최고예요' },
  sad: { color: 'bg-deepBlue', hover: 'hover:bg-deepBlue', text: '슬퍼요' },
  annoying: { color: 'bg-brown', hover: 'hover:bg-brown', text: '짜증나요' },
};

const Diary = ({ day, mood, nickname, diaryTitle, diaryContent }) => {
  return (
    <>
      <div className="flex gap-2 p-3 pb-6 rounded-xl bg-white ">
        <div className="flex flex-col items-center w-10 gap-1">
          <p className="font-bold text-2xl">{day}15</p>
          <div className={`w-10 h-10 rounded-xl ${moods[mood]} bg-deepBlue`}>img</div>
          <p className="text-xs w-10 ">{nickname}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{diaryTitle}</p>
          <p>{diaryContent}</p>
        </div>
      </div>
    </>
  );
};

export default Diary;
