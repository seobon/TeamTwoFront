import { useEffect, useState } from 'react';
import Todo from './Todo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopupDiaryInfo from '../../components/Popup/PopupDiaryInfo';
import { ReactComponent as Annoying } from '../../assets/Mood/Annoying.svg';
import { ReactComponent as Great } from '../../assets/Mood/Great.svg';
import { ReactComponent as Happy } from '../../assets/Mood/Happy.svg';
import { ReactComponent as Sad } from '../../assets/Mood/Sad.svg';
import { ReactComponent as Soso } from '../../assets/Mood/Soso.svg';

export default function Calendar1() {
  const [diaryData, setDiaryData] = useState(null); // diaryData를 상태로 추가
  const [closeDiaryInfoPopup, showDiaryInfoPopup] = useState(false); // 다이어리없을때 팝업
  const [today, setToday] = useState(new Date()); // 현재 날짜를 today에 저장
  const [writtenDays, setWrittenDays] = useState([]); // 작성된 날짜를 저장하는 상태
  const navigator = useNavigate();
  const showPopup = () => {
    showDiaryInfoPopup(!closeDiaryInfoPopup);
  };
  const Now = new Date();
  // 캘린더 조회
  useEffect(() => {
    const id = localStorage.getItem('id');
    const idNumber = Number(id);
    const month = today.getMonth() + 1;
    const monthString = month > 9 ? month : `0${month}`;
    axios
      .get(`${process.env.REACT_APP_HOST}/diary/getCalendar?id=${id}&month=${monthString}`)
      .then(response => {
        if (response.data[0].diaryId != null) {
          setDiaryData(response.data);
          makeCalendar(response.data);
        } else {
          console.log('Failed to get the calendar data');
          console.log('response.data: ', response.data);
          console.log('id: ', id);
          console.log(month);
        }
      })
      .catch(error => {
        console.error('Error!', error);
        makeCalendar();
      });
  }, []);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const prevMonth = () => {
    setToday(new Date(today.getFullYear(), today.getMonth() - 1));
  };

  const nextMonth = () => {
    setToday(new Date(today.getFullYear(), today.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  // 오늘 날짜
  const goToToday = () => {
    setToday(new Date());
  };

  // const todayDiary = () => {
  //
  //   console.log(Today)
  //   if
  // };
  // todayDiary()
  useEffect(() => {
    if (diaryData) makeCalendar();
  }, [today, diaryData]);

  const [calendar, setCalendar] = useState([]);

  const makeCalendar = () => {
    // diaryData가 배열인지 확인하고, 그렇지 않으면 빈 배열을 사용
    const data = Array.isArray(diaryData) ? diaryData : [];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    const calendarTemp = [];

    for (let i = 0; i < weekDays.length; i++) {
      calendarTemp.push(<div className="h-10 flex justify-center text-gray-900 font-Heading3">{weekDays[i]}</div>);
    }

    for (let i = 0; i < firstDay; i++) {
      calendarTemp.push(<div className=""></div>);
    }

    // 일
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i); // 연도, 월, 일
      const month = today.getMonth() + 1;

      const NowDate = Now.getDate();
      let diaryId;
      let diaryMood;
      let linkTo;
      let diaryIdParams;
      if (NowDate == i) {
        diaryId = 'true';
      }
      for (const diary of data) {
        if (!diary.createdAt) continue;

        const DiaryMonth = new Date(diary.createdAt).getMonth() + 1; // 작성월
        const DiaryDate = new Date(diary.createdAt).getDate(); // 작성일

        if (month === DiaryMonth) {
          if (i === DiaryDate) {
            diaryId = { id: `diary-${diary.diaryId}` };
            diaryIdParams = diary.diaryId;
            diaryMood = diary.mood;
          }
        }
      }
      const moodIcon = () => {
        switch (diaryMood) {
          case 'soso':
            return <Soso />;
            break;
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
          default:
            return (
              <div
                className={`w-10 h-10 rounded-full bg-gray-200 mx-auto flex items-center justify-center cursor-pointer`}
              />
            );
        }
      };

      const navPage = () => {
        console.log(linkTo);
        switch (diaryId) {
          case 'true':
            return navigator('/write');
          case undefined:
            return showPopup();
          default:
            return navigator(`/diary/detail/${diaryIdParams}`);
        }
      };

      calendarTemp.push(
        <div style={{ textAlign: 'center' }}>
          <div onClick={navPage}>
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center cursor-pointer`}>
              {moodIcon()}
            </div>
          </div>
          <div className="mt-[3px] mb-4 text-[12px]" {...diaryId}>
            {i}
          </div>
        </div>,
      );
    }

    setCalendar(calendarTemp);
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center relative h-[60px] pt-2">
          <div className="absolute flex items-center ">
            <button onClick={prevMonth} className="h-10  top-[6px]">
              <svg
                class="h-6 w-6 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                {' '}
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <span className=" ml-10 mr-10 text-gray-900 font-Heading3">
              {today.getFullYear()}년 {today.getMonth() + 1}월
            </span>

            <button onClick={nextMonth} className="h-10">
              <svg
                class="h-6 w-6 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                {' '}
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <button onClick={goToToday} className="h-10 ml-[350px]">
            오늘
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }} className=" ml-3 mr-3">
          {calendar}
        </div>
      </div>

      <Todo />

      {closeDiaryInfoPopup && (
        <PopupDiaryInfo showDiaryInfoPopup={showDiaryInfoPopup} closeDiaryInfoPopup={closeDiaryInfoPopup} />
      )}
    </>
  );
}
