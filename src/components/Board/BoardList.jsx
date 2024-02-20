import React from 'react';

const feelings = {
  calm: { color: 'bg-green', hover: 'hover:bg-green', text: '평온해요' },
  happy: { color: 'bg-yellow', hover: 'hover:bg-yellow', text: '기뻐요' },
  sad: { color: 'bg-deepBlue', hover: 'hover:bg-deepBlue', text: '슬퍼요' },
  annoyed: { color: 'bg-brown', hover: 'hover:bg-brown', text: '짜증나요' },
};

const BoardList = ({ day, feeling, author, title, content }) => {
  return (
    <>
      <div className="flex gap-2 p-5 m-3 rounded-2xl bg-gray-200 border-brown border-2">
        <div className="flex flex-col w-20 gap-1">
          <p className="font-bold text-xl">{day}15</p>
          <div className={`w-15 h-15 rounded-lg ${feelings[feeling]} bg-deepBlue`}>img</div>
          <p className="text-sm">{author}글쓴이</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{title}국민의 모든 자유와 권리는</p>
          <p>
            {content}국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수 있으며,
            제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다.
          </p>
        </div>
      </div>
    </>
  );
};

export default BoardList;
