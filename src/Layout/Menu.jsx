import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Nav from './Nav';
import { ReactComponent as Calendar } from '../assets/Nav/Calendar.svg';
import { ReactComponent as List } from '../assets/Nav/List.svg';
import { ReactComponent as DiaryWrite } from '../assets/Nav/DiaryWrite.svg';
import { ReactComponent as User } from '../assets/Nav/User.svg';

const Menu = () => {
  const [nav, setNav] = useState('');
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
