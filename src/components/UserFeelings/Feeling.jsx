import React from 'react';

function Feeling({ feeling, isSelected, onClick }) {
  const feelingsColor = {
    '그냥 그래요': 'bg-green text-black',
    기뻐요: 'bg-yellow text-black',
    슬퍼요: 'bg-deepBlue text-black',
    짜증나요: 'bg-brown text-black',
    화나요: 'bg-deepRed text-black',
  };

  const buttonClass = isSelected ? feelingsColor[feeling] : 'bg-gray-400 text-gray-600';

  return (
    <li className="flex flex-col items-center">
      <button className={`w-10 h-10 rounded-3xl text-2xs cursor-pointer ${buttonClass}`} onClick={onClick}>
        {feeling}
      </button>
      <div className={`text-xs ${isSelected ? 'text-black' : 'text-gray-500'}`}>{feeling}</div>
    </li>
  );
}

export default Feeling;

/* 
tailwindcss를 사용하는데 클래스 이름이 동적으로 변하도록 코드를 짰는데 색깔이 아예 사라졌다
개발자 모드에서도 콘솔 창에서도 이름이 제대로 반영된 걸 확인이 됐는데
tailwindcss를 동적으로 사용할 때 `bg-${color}` 이런 식으로 broken string으로 쓰면 제대로 적용이 안 된다는 걸 확인했다

칼라 버그
검색해보니까
*/
