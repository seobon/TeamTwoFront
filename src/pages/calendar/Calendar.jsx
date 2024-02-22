import { useEffect, useState } from 'react';
import Todo from './Todo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function Calendar1() {
  const [today, setToday] = useState(new Date()); // 현재 날짜를 today에 저장
  const [writtenDays, setWrittenDays] = useState([]); // 작성된 날짜를 저장하는 상태
  const navigator = useNavigate();

  // 캘린더 조회
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/diary/getCalendar`)
      .then(response => {
        if (response.data[0].msg === 'Get Calendar Success') {
          // diaryData에 서버로부터 받은 데이터 저장
          const writtenDates = response.data.map(diary => diary.createdAt.split(',')[0]); // 작성된 날짜만 추출
          setWrittenDays(writtenDates); // 작성된 날짜를 writtenDays 상태에 저장
        } else {
          console.log('Failed to get the calendar data');
        }
      })
      .catch(error => {
        console.error('Error!', error);
      });
  }, []);

  // diaryData를 상태로 추가
  const [diaryData, setDiaryData] = useState(null);

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

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  let calendar = [];
  // 요일
  for (let i = 0; i < weekDays.length; i++) {
    calendar.push(<div className="h-10 flex justify-center text-gray-900 font-Heading3">{weekDays[i]}</div>);
  }

  for (let i = 0; i < firstDay; i++) {
    calendar.push(<div className=""></div>);
  }
  // 일
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i);
    calendar.push(
      <div style={{ textAlign: 'center' }}>
        {/* 감정 버튼 */}
        <div
          onClick={() => mood(date)}
          className="w-10 h-10 rounded-full bg-gray-200 mx-auto flex items-center justify-center cursor-pointer"></div>
        {/* 숫자(날짜) */}
        <div className="mt-[3px] mb-4 text-[12px]">{i}</div>
      </div>,
    );
  }

  const mood = day => {
    let momentDate = moment(day).format();
    const dateString = momentDate.split('T')[0]; // 날짜를 문자열로 변환

    if (writtenDays.includes(dateString)) {
      // 작성된 날짜를 클릭하면 글 수정 페이지로 이동
      navigator(`/edit/${dateString}`);
    } else {
      // 작성되지 않은 날짜를 클릭하면 글 작성 페이지로 이동
      navigator(`/write/${dateString}`);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center relative h-[60px] mt-2">
          <div className="absolute flex items-center">
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
    </>
  );
}
