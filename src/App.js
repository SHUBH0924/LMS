import './App.css';
import { useAuth } from './Auth/auth';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './Dashboard'
import Settings from './components/User/Settings';
import Detail from './components/Course/Detail';
import {Routes, Route } from "react-router-dom";
import Admin_Dashboard from './components/Admin/AdminDashboard/Admin_Dashboard';
import CourseModule from './components/Admin/AdminDashboard/CreateCourse/Course_Modules/CourseModules';
import {Toaster} from 'react-hot-toast';
import { useEffect } from 'react';
import Protected from './components/Layout/Protected';


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
              
{/* 
              {auth.user &&
                <Route path="/settings" element={<Settings />} />
              }
              
              {auth.user &&
                <Route path="/detail" element={<Detail />} />
              } */}

              
                <Route path="/course/:slug" element={
                <Protected isLoggedIn={auth.user==="Admin"} replace="Login">
                  <CourseModule />
                </Protected>}
               /> 
              
              
          </Routes>
    </div>
  )
}

export default App;
