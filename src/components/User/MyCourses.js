import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from '../Card/Card'
import Sidenav from '../Layout/Sidenav'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/auth';
import Header from '../Header'


function Dashboard() {
    const auth = useAuth()
    const [token,setToken] = useState(auth.token)
    const Navigate = useNavigate()
    const backendServer = `${process.env.REACT_APP_SERVER}/user/all`
    const [course,setCourse] = useState([])


    useEffect(()=>{
        axios.get(backendServer,{
            headers: {
              'Authorization': token
            }
          }).then(res=>{
            // console.log(res)
            if(res.data){
                setCourse(res.data)
            }
            // console.log(res.data) 
            })
        },[])


        const Purchase = (item) => {
            // e.preventdefault()
            const id = item._id
            const publish = item.published
            console.log(publish)
            Navigate(`/course/${id}`)
            Navigate(`/course/${id}`,{state:{Publish:publish,item:item}})
            // console.log({id},"Clicked")
        }

    return (
        <div className='relative'>
            <div className='sticky top-0 '>
                <Header />
                </div>
        <aside className="flex flex-row">
            
                {/* <Sidenav /> */}
            

            <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        My Courses
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 "/>
                    <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-full py-6">
                            {course.map((item,key) =>{
                                
                                return(
                                    <Card item={item} key={key} Button="Open" onPublish={Purchase}/>
                                )
                            })}
                        </div>
                    </div> 

                </div>
            </aside>
        </div>
    )
}

export default Dashboard;