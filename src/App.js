import './App.css';
import { useAuth } from './Auth/auth';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/User/Dashboard'
import Settings from './components/User/Settings';
import Detail from './components/Course/Detail';
import {Routes, Route } from "react-router-dom";
import Admin_Dashboard from './components/Admin/AdminDashboard/Admin_Dashboard';
import CourseModule from './components/Admin/AdminDashboard/CreateCourse/Course_Modules/CourseModules';
import {Toaster} from 'react-hot-toast';
import { useEffect } from 'react';


const App = () => {

  const auth = useAuth()
  useEffect(()=>{
    auth.isAuthenticate()
  },[])
  console.log(process.env.ServerUrl)
  return (
    <div className='App'>
      <div><Toaster
            position="top-right"
            reverseOrder={false}        
          />
    </div>

        <Routes>
            
              {auth.user === "Admin" &&
                <Route path="/AdminDashboard" element={<Admin_Dashboard />} />
              }
              
              {auth.user === "User" &&
              <Route index path="/" element={<Dashboard/>} />
              }

              {!auth.user &&
                <Route path="/Login" element={<Login />} />
              }

              {!auth.user &&
                <Route path="/register" element={<Register />} />
              }

              {auth.user &&
                <Route path="/settings" element={<Settings />} />
              }
              
              {auth.user &&
                <Route path="/detail" element={<Detail />} />
              }

              {auth.user &&
                <Route path="/course/:slug" element={<CourseModule />} /> 
              }
              
          </Routes>
    </div>
  )
}

export default App;
