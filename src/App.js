import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/testpage/Test.jsx';
import Todo from './pages/calendar/Todo.jsx';
import Calendar1 from './pages/calendar/Calendar.jsx';
import Write from './pages/write/Write.jsx';
import Edit from './pages/write/Edit.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/calendar" element={<Calendar1 />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
