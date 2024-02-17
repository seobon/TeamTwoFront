import { useState } from 'react';
import Calendar from 'react-calendar';
import Todo from './Todo';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

export default function Calendar1() {
  const [today, setToday] = useState(new Date()); // 현재 날짜를 today에 저장
  const [writtenDays, setWrittenDays] = useState([]); // 작성된 날짜를 저장하는 상태
  const navigator = useNavigate();

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
      <div className="w-[500px] border-2 border-red">
        <Calendar
          onClickDay={mood} // 감정 버튼 클릭
          onChange={onChangeToday}
          value={today} // 오늘 날짜
          next2Label={null} // 연 이동 버튼 삭제
          prev2Label={null}
          calendarType="US" // 일요일 부터 시작되도록
          className="black"
        />
      </div>
      <Todo />
    </>
  );
}
