import './App.css';
import ProtectedRoute from './Components/ProtectedRoute';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentList from './Pages/StudentList';
import CreateStudent from './Pages/CreateStudent';
import UpdateStudent from "./Pages/UpdateStudent";
import Register from './Pages/Register';
import MyProfile from "./Pages/MyProfile";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>}/>
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/students"  element={<ProtectedRoute><StudentList/></ProtectedRoute>}/>
      <Route path="/create-student"  element={<ProtectedRoute><CreateStudent/></ProtectedRoute>}/>
      <Route path="/update-student/:id" element={<ProtectedRoute><UpdateStudent/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
