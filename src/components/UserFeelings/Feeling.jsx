import React from 'react';

function Feelings({ index, clickFeeling, feeling, clicked }) {
  return (
    <li className="flex flex-col items-center ">
      <button
        key={index}
        className={`w-10 h-10 bg-gray-400 hover:bg-slate-500 rounded-3xl ${clicked && 'bg-slate-500'} cursor-pointer`}
        onClick={clickFeeling}
        value={feeling}></button>
      <div className="text-xs">{feeling}</div>
    </li>
  );
}

export default Feelings;
