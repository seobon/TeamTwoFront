import React from 'react';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';
import defultImg from '../../assets/profileDefult.jpg';

const Diary = ({ day, mood, nickname, diaryTitle, diaryContent, image }) => {

  console.log(image)
  const profilImg = () => {
    if (image === null) {
      return defultImg
    } else {
      return image
    }
  };

  const imgErr =(e)=>{
    const target = e.target;
    target.src = defultImg;
  }

  return (
    <>
      <div className="flex gap-5 p-3 pb-6 rounded-xl bg-white ">
        <div className="flex flex-col items-center gap-1 ">
          <img className={`w-10 h-10 rounded-xl`} src={profilImg} alt="profileImage" onError={imgErr} />
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
