import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Nav from './Nav';
import { ReactComponent as Calendar } from '../assets/Nav/Calendar.svg';
import { ReactComponent as List } from '../assets/Nav/List.svg';
import { ReactComponent as DiaryWrite } from '../assets/Nav/DiaryWrite.svg';
import { ReactComponent as User } from '../assets/Nav/User.svg';

const menuse = [
  ['home', '/calendar'],
  ['diary', '/diary'],
  ['write', '/write'],
  ['user', '/mypage'],
  ['setting', '/setting'],
];

// tailwindcss가 반영되지 않아 index.css에 직접 스타일을 작업했습니다.

const Menu = () => {
const [nav, setNav] = useState(true)
  return (
    <div className="">
      <div className="mb-8">
        <Outlet />
      </div>

      <div className="fixed bottom-0 w-full ">
        <div className="flex justify-between bg-gray-200">
          <NavLink to="/calendar" stroke={ "active:" ? "text-gray-800" :  "text-red"}>
            <Nav title="Calender" svg={<Calendar width="36" height="36" stroke='#757575' />} />
          </NavLink>
          <NavLink to="/diary">
            <Nav title="List" svg={<List />} />
          </NavLink>
          <NavLink to="/write">
            <Nav title="DiaryWrite" svg={<DiaryWrite />} />
          </NavLink>
          <NavLink to="/mypage">
            <Nav title="User" svg={<User />} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Menu;
