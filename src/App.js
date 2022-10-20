import Main from './components/Layout/Main';
import './App.css';
import { AuthProvider } from './Auth/auth';
import Register from './components/Register';
import Login from './components/Login';
// import Sidenav from './Sidenav'
import Dashboard from './components/User/Dashboard'
import Settings from './components/User/Settings';
import Detail from './components/Course/Detail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin_Dashboard from './components/Admin/AdminDashboard/Admin_Dashboard';
import Sidenav from './components/Layout/Sidenav';
import CourseModule from './components/Admin/AdminDashboard/CreateCourse/Course_Modules/CourseModules';



const App = () => {
  return (
    <div className='App'>
      {/* <AuthProvider> */}
      
      {/* <BrowserRouter> */}
        <Routes>
            
              <Route path="/AdminDashboard" element={<Admin_Dashboard />} />
              <Route index path="/" element={<Dashboard/>} />
              <Route path="/Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/course/:slug" element={<CourseModule />} /> 
              
          </Routes>
          {/* </BrowserRouter> */}
      {/* </AuthProvider> */}
    </div>
  )
}

export default App;
