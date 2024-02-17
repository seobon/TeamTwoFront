import React from 'react';

function Feeling({ feeling, isSelected, onClick }) {
  const feelings = {
    calm: { color: 'bg-green', hover: 'hover:bg-green', text: '평온해요' },
    happy: { color: 'bg-yellow', hover: 'hover:bg-yellow', text: '기뻐요' },
    sad: { color: 'bg-deepBlue', hover: 'hover:bg-deepBlue', text: '슬퍼요' },
    annoyed: { color: 'bg-brown', hover: 'hover:bg-brown', text: '짜증나요' },
  };

  const buttonClass = isSelected
    ? `animate-clicked text-black ${feelings[feeling].color}`
    : `bg-gray-400 text-gray-600 ${feelings[feeling].hover}`;

  return (
    <li className="flex flex-col items-center">
      <button
        className={`w-10 h-10 rounded-3xl text-2xs cursor-pointer transition-all ${buttonClass}`}
        onClick={onClick}>
        {feeling}
      </button>
      <div className={`text-xs transition-all ${isSelected ? 'text-black' : 'text-gray-500'}`}>
        {feelings[feeling].text}
      </div>
    </li>
  );
}

export default Feeling;

/* 
tailwindcss를 사용하는데 클래스 이름이 동적으로 변하도록 코드를 짰는데 색깔이 아예 사라졌다
개발자 모드에서도 콘솔 창에서도 이름이 제대로 반영된 걸 확인했는데
tailwindcss는 동적으로 사용할 때 `bg-${color}` 이런 식으로 broken string으로 쓰면 제대로 적용이 안 된다고 한다
*/
