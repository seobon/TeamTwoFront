import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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
  // const Date = new Date();2024-02-29 00:03:55
  let now = new Date(); // 현재 날짜 및 시간
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const Today = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  console.log(Today);
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

  console.log(diaryData);

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
          <NavLink to="/write">
            <Nav
              title="DiaryWrite"
              svg={<DiaryWrite stroke={nav == 'DiaryWrite' ? '#353535' : '#757575'} />}
              onClick={() => {
                setNav('DiaryWrite');
              }}
            />
          </NavLink>
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
