import './App.css';
import { useAuth } from './Auth/auth';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './Dashboard'
import Profile from './components/User/Profile';
import Detail from './components/Course/Detail';
import {Routes, Route } from "react-router-dom";
import Admin_Dashboard from './components/Admin/AdminDashboard/Admin_Dashboard';
import CourseModule from './components/Admin/AdminDashboard/CreateCourse/Course_Modules/CourseModules';
import Courses from './components/Course/Courses';
import {Toaster} from 'react-hot-toast';
import { useEffect } from 'react';
import Protected from './components/Layout/Protected';
import Page from './components/Admin/AdminDashboard/CreateCourse/Course_Modules/Page/Page';
import DropFileInput from './components/Admin/AdminDashboard/Drag_Drop/DropFileInput';

import Calendar from "./components/Layout/Calendar/Calendar";
import Help from "./components/Help"
import Users from './components/Admin/Users';
import People from './components/Admin/AdminDashboard/CreateCourse/People'


const App = () => {

  const auth = useAuth()
  useEffect(()=>{
    auth.isAuthenticate()
  },[])

  
  return (
    <div className='App'>
      <div><Toaster
            position="top-right"
            reverseOrder={false}        
          />
    </div>
    
        <Routes>
            
              {/* <Route path="/AdminDashboard" element={
              // <Protected isLoggedIn={auth.user==="Admin"} replace="Login">
                <Admin_Dashboard />
              // </Protected> 
            }
              /> */}
              
              
              <Route index path="/" element={
              <Protected isLoggedIn={auth.user} replace="Login">
                <Dashboard/>
              </Protected> 
            }
             />
              

              <Route index path="/Page" element={
              // <Protected isLoggedIn={auth.user} replace="Login">
                  <Page />
              // {/* </Protected>  */}
            }
             />

              
                <Route path="/Login" element={
                <Protected isLoggedIn={!auth.user} replace="">
                  <Login />
                </Protected>
              } 
                />
              

              
                <Route path="/register" element={
                <Protected isLoggedIn={!auth.user} replace="">
                  <Register />
                </Protected>
                } />
              

              {/* {auth.user && */}
                <Route path="/profile" element={<Profile />} />
              

              {/* {auth.user && */}
                <Route path="/DropFileInput" element={<DropFileInput />} />
              {/* } */}
              
              {/* <Route path="/users" element={<Users />} />
              <Route path="/people" element={<People />} /> */}

              {auth.user &&
                <Route path="/courses" element={<Courses />} />
              }

              {/* {auth.user && */}
                <Route path="/calendar" element={<Calendar />} />
              

              {/* {auth.user && */}
                <Route path="/help" element={<Help />} />

                <Route path="/users" element={<Users />} />

                <Route path="/people" element={<People />} />
              
              
              {/* {auth.user &&
                <Route path="/detail" element={<Detail />} />
              } */}

              
                <Route path="/course/:slug" element={
                <Protected isLoggedIn={auth.user==="Admin"} replace="Login">
                  <CourseModule />
                </Protected>
              }
               /> 
              

              
          </Routes>
    </div>
  )
}

export default App;
