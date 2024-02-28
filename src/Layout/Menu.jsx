import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import axios from 'axios';
import { ReactComponent as Calendar } from '../assets/Nav/Calendar.svg';
import { ReactComponent as List } from '../assets/Nav/List.svg';
import { ReactComponent as DiaryWrite } from '../assets/Nav/DiaryWrite.svg';
import { ReactComponent as User } from '../assets/Nav/User.svg';

const Menu = () => {
  const id = localStorage.getItem('id');
  const [nav, setNav] = useState('');

  const [diaryData, setDiaryData] = useState(null);
  const navigator = useNavigate();
  let now = new Date();

  useEffect(() => {
    const month = now.getMonth() + 1;
    const monthString = month > 9 ? month : `0${month}`;

    axios
      .get(`${process.env.REACT_APP_HOST}/diary/getCalendar?id=${id}&month=${monthString}`)
      .then(response => {
        if (response.data[0].diaryId != null) {
          setDiaryData(response.data);
        }
      })
      .catch(error => {
        console.error('Error!', error);
      });
  }, []);
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const data = Array.isArray(diaryData) ? diaryData : [];

  const daysInMonth = getDaysInMonth(now.getMonth(), now.getFullYear());
  let diaryId;
  let diaryIdParams;

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), i); // 연도, 월, 일
    const month = now.getMonth() + 1;

    const NowDate = now.getDate();

    if (NowDate == i) {
      diaryId = 'true';
    }
    for (const diary of data) {
      const DiaryMonth = new Date(diary.createdAt).getMonth() + 1; // 작성월
      const DiaryDate = new Date(diary.createdAt).getDate(); // 작성일

      if (month === DiaryMonth) {
        if (i === DiaryDate) {
          diaryIdParams = diary.diaryId;
        }
      }
    }
  }
  const navPage = () => {
    switch (diaryIdParams) {
      case 'true':
        return navigator('/write');
      default:
        return navigator(`/diary/detail/${diaryIdParams}`);
    }
  };

  return (
    <div className="relative">
      <div className="mb-8 ">
        <Outlet />
      </div>

      <div className="">
        <div className="flex  justify-between bg-gray-200">
          <NavLink to="/calendar">
            <Nav
              title="Calender"
              svg={<Calendar width="36" height="36" stroke={nav == 'Calendar' ? '#353535' : '#757575'} />}
              onClick={() => {
                setNav('Calendar');
              }}
            />
          </NavLink>
          <NavLink to="/diary">
            <Nav
              title="List"
              svg={<List stroke={nav == 'List' ? '#353535' : '#757575'} />}
              onClick={() => {
                setNav('List');
              }}
            />
          </NavLink>
          <div onClick={navPage}>
            <Nav
              title="DiaryWrite"
              svg={<DiaryWrite stroke={nav == 'DiaryWrite' ? '#353535' : '#757575'} />}
              onClick={() => {
                setNav('DiaryWrite');
              }}
            />
          </div>
          <NavLink to="/mypage">
            <Nav
              title="User"
              svg={<User stroke={nav == 'User' ? '#353535' : '#757575'} />}
              onClick={() => {
                setNav('User');
              }}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
