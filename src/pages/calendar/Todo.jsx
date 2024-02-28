import axios from 'axios';
import { useEffect, useState } from 'react';

import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsTrash3 } from 'react-icons/bs';
import { BsCheckCircle } from 'react-icons/bs';
import { BsCircle } from 'react-icons/bs';

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
        console.log('Todo 조회 성공');
        console.log(response.data);
        setToDoList(response.data);
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
      setToDoList([...toDoList, response.data]);
      console.log('Todo 작성 성공');
    } else {
      console.log('Todo 작성 실패');
    }
  };

  // todo 수정
  const updateTodo = async (todoId, newState, currentContent = inputText) => {
    const newData = {
      newTodoContent: currentContent, // input value를 newTodoContent에
    };

    if (newState) {
      newData.newState = newState;
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_HOST}/todo/todolistupdate/${todoId}`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.data) {
        const newData = [
          {
            text: response.data.newTodoContent,
            isCheck: response.data.newState === 'done',
          },
        ];

        console.log('Todo 수정 성공');
        console.log('response.data', response.data);
        window.location.reload(); // 페이지 리로드
      } else {
        console.log('Todo 수정 실패');
      }
    } catch (error) {
      console.log('Todo 수정 에러:', error);
    }
  };

  // todo 삭제
  const deleteTodo = async (todoId, newState) => {
    const newData = {
      newTodoContent: inputText, // input value를 newTodoContent에
    };

    if (newState) newData.newState = newState;

    try {
      const response = await axios.delete(`${process.env.REACT_APP_HOST}/todo/tododelete/${todoId}`, newData, {});
      console.log('Todo 삭제 성공:', response.data);
      // 삭제 요청이 성공한 경우에 대한 처리를 추가합니다.
    } catch (error) {
      console.error('Todo 삭제 요청 실패:', error);
      // 삭제 요청이 실패한 경우에 대한 처리를 추가합니다.
    }
  };

  // 토글 버튼
  const toggleCheck = index => {
    const newToDoList = [...toDoList];
    newToDoList[index].isCheck = !newToDoList[index].isCheck;
    setToDoList(newToDoList);
  };

  // todo 수정
  const handleInputChange = e => {
    setInputText(e.target.value);
    console.log('handleInputChange 함수 실행');
  };

  // todo 수정
  const handleEditClick = index => {
    setEditIndex(index);
    setInputText(toDoList[index].todoContent);
  };

  // todo 등록
  const handleAddSubmit = e => {
    e.preventDefault();
    addTodo(inputText);
    setInputText(''); // 입력창 초기화
    console.log('handleAddSubmit 함수 실행');
  };

  return (
    <>
      <div className="mt-[30px] ml-[20px]">
        <div className="text-2xl font-bold mt-5 mb-2">To do List</div>
        <ul>
          {toDoList.map((todo, index) => (
            <li key={index} className="flex align-middle font-Body2">
              <button onClick={() => toggleCheck(index)} className="mr-1">
                {/* todo 토글 버튼 */}
                {todo.state === 'done' ? (
                  <span
                    className=""
                    onClick={() => {
                      // setInputText(toDoList[index].text);
                      updateTodo(todo.todoId, 'notstart', todo.todoContent);
                    }}>
                    <BsCheckCircle className="bg-[#ffd633] rounded-lg" />
                  </span>
                ) : (
                  <span
                    className=""
                    onClick={() => {
                      // setInputText(toDoList[index].text);
                      updateTodo(todo.todoId, 'done', todo.todoContent);
                    }}>
                    <BsCircle />
                  </span>
                )}
              </button>
              {/* todo 수정 & 삭제 */}
              {editIndex === index ? (
                <div>
                  <form className="inline-block">
                    <input
                      type="text"
                      value={inputText}
                      onChange={handleInputChange}
                      className="h-6 w-[270px] bg-transparent outline-none rounded"
                    />
                    <span>
                      <button onClick={() => updateTodo(todo.todoId)}>
                        {/* 수정 버튼 */}
                        <HiOutlinePencilSquare />
                      </button>
                      <button onClick={() => deleteTodo(todo.todoId)} className="ml-1">
                        {/* 삭제 버튼 */}
                        <BsTrash3 className="w-[14px] h-[14px] ml-[4px] mb-[1px]" />
                      </button>
                    </span>
                  </form>

                  {/* <form onSubmit={handleDeleteTodo} className="inline-block"></form> */}
                </div>
              ) : (
                <span
                  id="spanContent"
                  onClick={() => handleEditClick(index)}
                  className={`min-w-[200px] cursor-pointer ${todo.state === 'done' ? 'line-through' : ''}
                  `}>
                  {todo.todoContent}
                </span>
              )}
            </li>
          ))}
        </ul>
        {/* input창, 등록 버튼 */}
        {editIndex === null && (
          <form onSubmit={handleAddSubmit} className="flex align-middle">
            <span className="mt-1">
              <BsCircle />
            </span>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              className="h-6 w-[270px] ml-1 bg-transparent outline-none rounded"
            />
            <button type="submit" className="ml-2">
              {/* 작성 버튼 */}
              <HiOutlinePencilSquare />
            </button>
          </form>
        )}
      </div>
    </>
  );
}
