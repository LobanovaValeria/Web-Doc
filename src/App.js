import { Routes, Route, Navigate } from 'react-router-dom';

import AppDoc from './pages/appDoc/AppDoc.jsx';
import SignUp from './pages/signUp/SignUp.jsx';
import LogIn from './pages/logIn/LogIn.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/App" element={<AppDoc />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
