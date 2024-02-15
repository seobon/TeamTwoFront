import { useState } from 'react';
import Calendar from 'react-calendar';

export default function Calender() {
  const [today, setToday] = useState(new Date()); // 현재 날짜를 today에 저장

  // onChange이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 됨
  const onChangeToday = date => {
    setToday(today);
  };

  return (
    <>
      <div className="w-[500px]">
        <Calendar onChange={onChangeToday} value={today} next2Label={null} prev2Label={null} />
      </div>
    </>
  );
}
