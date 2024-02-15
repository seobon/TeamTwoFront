import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './pages/testpage/Test.jsx';
import Calendar from 'react-calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/calender" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
