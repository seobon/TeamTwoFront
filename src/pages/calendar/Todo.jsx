import { useState } from 'react';

export default function Todo() {
  const [toDoList, setToDoList] = useState([
    { text: '토마토 사기', isCheck: false },
    { text: 'Spring Boot 공부해야 함!', isCheck: false },
    { text: '아.. 공부하기 싫다', isCheck: false },
    { text: '오늘 저녁은 양꼬치 먹기', isCheck: false },
    { text: '벚꽃 피면 한강 놀러가야지', isCheck: false },
  ]);

  const addTodo = todo => {
    setToDoList([...toDoList, { text: todo, isCheck: false }]);
  }; // todo 작성

  const toggleCheck = index => {
    const newToDoList = [...toDoList];
    newToDoList[index].isCheck = !newToDoList[index].isCheck;
    setToDoList(newToDoList);
  }; // 토글 버튼

  return (
    <>
      <div className="">
        <div className="text-2xl font-bold mt-5 mb-5">To do List</div>
        <ul>
          {toDoList.map((todo, index) => (
            <li key={index} className="">
              <button onClick={() => toggleCheck(index)} className="mr-1">
                {todo.isCheck ? 'V' : 'O'}
              </button>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
