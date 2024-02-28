import React from 'react';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';

const Diary = ({ day, mood, nickname, diaryTitle, diaryContent, image }) => {
  if (image === null) {
    image = '../../assets/profileDefult.jpg';
  } else {
  }

  const moodIcon = mood => {
    switch (mood) {
      case 'happy':
        return <Happy />;
        break;
      case 'annoying':
        return <Annoying />;
        break;
      case 'great':
        return <Great />;
        break;
      case 'sad':
        return <Sad />;
        break;
      case 'soso':
        return <Soso />;
        break;
    }
  };

  return (
    <>
      <div className="flex gap-5 p-3 pb-6 rounded-xl bg-white ">
        <div className="flex flex-col items-center w-10 gap-1">
          <img className={`w-10 h-10 rounded-3xl`} src={image} alt="profileImage" />
          {/* <div className="w-10 h-10 rounded-3xl">{moodIcon(mood)}</div> */}
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
