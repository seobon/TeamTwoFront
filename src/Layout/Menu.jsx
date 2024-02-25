import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './menu.module.css';

const menuse = [
  ['home', '/'],
  ['diary', '/diary'],
  ['write', '/write'],
  ['user', '/mypage'],
  ['setting', '/setting'],
];

// tailwindcss가 반영되지 않아 index.css에 직접 스타일을 작업했습니다.

const Menu = () => {
  return (
    <div className={styles.myMenu}>
      <div className="flex justify-between">
        {Array.from(menuse).map((menu, index) => {
          return (
            <NavLink to={menu[1]} key={index}>
              <div className="flex flex-col justify-center items-center">
                <div className="bg-black w-10 h-10 rounded-3xl"></div>
                {menu[0]}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
