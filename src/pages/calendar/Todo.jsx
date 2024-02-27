import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Todo() {
  const [toDoList, setToDoList] = useState([]);

  const [inputText, setInputText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    readTodo();
  }, []);

  // todo 조회
  const readTodo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_HOST}/todo/todolist/${localStorage.getItem('id')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.data) {
        const newData = response.data.map(item => {
          return { text: item.todoContent, isCheck: item.state === 'done' };
        });

        console.log('Todo 조회 성공');
        console.log(response.data);
        setToDoList([...toDoList, ...newData]);
      } else {
        console.log('Todo 조회 실패');
      }
    } catch (error) {
      console.log('Todo 조회 에러:', error);
    }
  };

  // todo 작성
  const addTodo = async todo => {
    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/todo/todocreate/${localStorage.getItem('id')}`,
      {
        id: localStorage.getItem('id'),
        todoContent: todo,
        state: 'notstart', // 'notstart' or 'done'
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );

    if (response.data) {
      setToDoList([...toDoList, { text: todo, isCheck: false }]);
      console.log('Todo 작성 성공');
    } else {
      console.log('Todo 작성 실패');
    }
  };

  // todo 수정
  const updateTodo = async (todoId, newTodoContent, newDeadline, newState) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/todo/todolistupdate/${todoId}`,
        {
          newTodoContent: newTodoContent,
          newDeadline: newDeadline,
          newState: newState,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      if (response.data) {
        const newData = response.data.map(item => {
          return { text: item.todoContent, isCheck: item.state === 'done' };
        });

        console.log('Todo 수정 성공');
        console.log(response.data);
        setToDoList([...toDoList, ...newData]);
      } else {
        console.log('Todo 수정 실패');
      }
    } catch (error) {
      console.log('Todo 수정 에러:', error);
    }
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
                  <span className="" onClick={() => updateTodo()}>
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
                  <span className="" onClick={() => updateTodo()}>
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
                )}
              </button>
              {/* todo 수정 & 삭제 */}
              {editIndex === index ? (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    className="h-6 outline-none rounded"
                  />
                  <button onClick={e => updateTodo()}>수정</button>
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
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              className="h-6 w-30 ml-1 outline-none rounded"
            />
            <button type="submit" className="ml-2">
              등록
            </button>
          </form>
        )}
      </div>
    </>
  );
}
