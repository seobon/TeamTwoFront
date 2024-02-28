import React from 'react';

const Diary = ({ day, mood, nickname, diaryTitle, diaryContent, image }) => {
  if (image === null) {
    image = '../../assets/profileDefult.jpg';
  }

  return (
    <>
      <div className="flex gap-5 p-3 pb-6 rounded-xl bg-white ">
        <div className="flex flex-col items-center w-10 gap-1">
          <img className={`w-10 h-10 rounded-3xl`} src={image} alt="" />
          <p className="text-xs w-10 text-center">{nickname}</p>
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
