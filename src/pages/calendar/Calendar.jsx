import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Todo from './Todo';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function Calendar1() {
  const [today, setToday] = useState(new Date()); // 현재 날짜를 today에 저장
  const [writtenDays, setWrittenDays] = useState([]); // 작성된 날짜를 저장하는 상태
  const navigator = useNavigate();

  // axios를 사용하여 작성된 날짜를 가져오기
  // 작성된 글 읽어오기
  useEffect(() => {
    axios
      .get('/diary/getMyDiary')
      .then(response => {
        setWrittenDays(response.data);
      })
      .catch(error => {
        console.error('Error!', error);
      });
  }, []);

  // onChange이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 됨
  const onChangeToday = date => {
    setToday(date);
  };

  const mood = day => {
    const dateString = day.toISOString().split('T')[0]; // 날짜를 문자열로 변환
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
      <div className="">
        <Calendar
          onClickDay={mood} // 감정 버튼 클릭
          onChange={onChangeToday}
          value={today} // 오늘 날짜
          formatDay={(locale, date) => moment(date).format('DD')} // "일" 글자 삭제
          next2Label={null} // 연 이동 버튼 삭제
          prev2Label={null}
          // formatDay={(locale, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
          calendarType="US" // 일요일 부터 시작되도록
          showNeighboringMonth={false} // 저번달, 다음달 날짜 숨기기
          minDetail="year" // 10년단위 년도 숨기기
          className="react-calendar
          react-calendar__navigation__label
          react-calendar__navigation__arrow
          react-calendar__month-view__days__day
          react-calendar__month-view__weekdays
          react-calendar__month-view__weekdays__weekday
          react-calendar__month-view__weekdays__weekday--weekend
          react-calendar__tile--active:enabled:hover
          react-calendar__tile--active:enabled:focus
          react-calendar__tile:disabled
          react-calendar__tile:enabled:hover
          react-calendar__tile:enabled:focus
          "
        />
      </div>
      <Todo />
    </>
  );
}
