import { useState } from 'react';

export default function Todo() {
  const [toDoList, setToDoList] = useState([
    { text: '토마토 사기', isCheck: false },
    { text: 'Spring Boot 공부해야 함!', isCheck: false },
    { text: '아.. 공부하기 싫다', isCheck: false },
    { text: '오늘 저녁은 양꼬치 먹기', isCheck: false },
    { text: '벚꽃 피면 한강 놀러가야지', isCheck: false },
  ]);

  const [inputText, setInputText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // todo 작성
  const addTodo = todo => {
    setToDoList([...toDoList, { text: todo, isCheck: false }]);
    console.log('addTodo 함수 실행');
  };

  // 토글 버튼
  const toggleCheck = index => {
    const newToDoList = [...toDoList];
    newToDoList[index].isCheck = !newToDoList[index].isCheck;
    setToDoList(newToDoList);
  };

  const handleInputChange = e => {
    setInputText(e.target.value);
    console.log('handleInputChange 함수 실행');
  };

  const handleEditClick = index => {
    setEditIndex(index);
    setInputText(toDoList[index].text);
  };

  // todo 수정
  const handleEditSubmit = e => {
    e.preventDefault();
    const newToDoList = [...toDoList];
    newToDoList[editIndex].text = inputText;
    setToDoList(newToDoList);
    setEditIndex(null);
    setInputText(''); // 입력창 초기화
    console.log('handleEditSubmit 함수 실행');
  };

  // todo 등록
  const handleAddSubmit = e => {
    e.preventDefault();
    addTodo(inputText);
    setInputText(''); // 입력창 초기화
    console.log('handleAddSubmit 함수 실행');
  };

  // todo 삭제
  const deleteTodo = (e, index) => {
    e.stopPropagation();
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDoList(newToDoList);
    setEditIndex(null);
    setInputText(''); // 입력창 초기화
  };

  return (
    <>
      <div className="mt-[30px] ml-[20px]">
        <div className="text-2xl font-bold mt-5 mb-2">To do List</div>
        <ul>
          {toDoList.map((todo, index) => (
            <li key={index} className="flex align-middle font-Body2">
              <button onClick={() => toggleCheck(index)} className="mr-1">
                {/* todo 체크 버튼 */}
                {todo.isCheck ? (
                  <span className="">
                    <svg
                      class="h-4 w-4 text-red-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round">
                      {' '}
                      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />{' '}
                      <path d="M9 12l2 2l4 -4" />
                    </svg>
                  </span>
                ) : (
                  <svg
                    class="h-4 w-4 text-red-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    {' '}
                    <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />
                  </svg>
                )}
              </button>
              {/* todo 수정 & 삭제 */}
              {editIndex === index ? (
                <form onSubmit={handleEditSubmit}>
                  <input type="text" value={inputText} onChange={handleInputChange} className="h-6" />
                  <button type="submit">수정</button>
                  <button onClick={e => deleteTodo(e, index)} className="ml-1">
                    삭제
                  </button>
                </form>
              ) : (
                <span
                  onClick={() => handleEditClick(index)}
                  style={todo.isCheck ? { textDecoration: 'line-through' } : null}>
                  {todo.text}
                </span>
              )}
            </li>
          ))}
        </ul>
        {/* input창, 등록 버튼 */}
        {editIndex === null && (
          <form onSubmit={handleAddSubmit} className="flex align-middle">
            <span className="mt-1">
              <svg
                class="h-4 w-4 text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="9" />
              </svg>
            </span>
            <input type="text" value={inputText} onChange={handleInputChange} className="h-6 w-30 ml-1" />
            <button type="submit" className="ml-2">
              등록
            </button>
          </form>
        )}
      </div>
    </>
  );
}
