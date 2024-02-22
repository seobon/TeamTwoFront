import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/testpage/Test.jsx';
import Todo from './pages/calendar/Todo.jsx';
import Calendar1 from './pages/calendar/Calendar.jsx';
import Write from './pages/write/Write.jsx';
import Edit from './pages/write/Edit.jsx';
import SignIn from './pages/Sign/SignIn.jsx';
import SignUp from './pages/Sign/SignUp.jsx';
import UserIdPw from './pages/User/UserIdPw.jsx';
import Diaries from './pages/Diary/Diaries.jsx';
import DiaryDetail from './pages/Diary/DiaryDetail.jsx';
import Diary from './components/Diary/Diary.jsx';
import DiaryList from './components/Diary/DiaryList.jsx';
import BoardDetail from './pages/Board/BoardDetail.jsx';
import Mypage from './pages/Mypage/Mypage.jsx';
import PasswordChange from './pages/Mypage/PasswordChange.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/useridpw" element={<UserIdPw />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/profile" element={<PasswordChange />} />

        <Route path="/test" element={<Test />} />
        <Route path="/calendar" element={<Calendar1 />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/write" element={<Write />} />
        <Route path="/diary/detail" element={<DiaryDetail />} />
        <Route path="/edit" element={<Edit />} />

        <Route path="/diary" element={<Diaries />} />
        <Route path="/diary/:id" element={<DiaryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
