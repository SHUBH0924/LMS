import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from '../Card/Card'
// import Sidenav from '../Layout/Sidenav'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth/auth';
import Header from '../Header'
import image from '../../assets/mp.png'


function Dashboard() {
    const auth = useAuth()
    const [token, setToken] = useState(auth.token)
    const Navigate = useNavigate()
    const backendServer = `http://172.29.234.174:3000/course/all`
    const [course,setCourse] = useState([])


    useEffect(() => {
        axios.get(backendServer, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            // console.log(res)
            if (res.data) {
                setCourse(res.data)
                console.log(res.data)
            }
            // console.log(res.data) 
        })
    }, [])


    const Purchase = (item) => {
        // e.preventdefault()
        const id = item._id
        // const publish = item.published
        // console.log(publish)
        Navigate(`/course/${id}`)
        // Navigate(`/course/${id}`)
        // , { state: { Publish: publish, item: item } }
        // console.log({id},"Clicked")
    }

    return (
        <div className='relative '>
            <div className='sticky top-0 z-50 '>
                <Header />
            </div>
            {/* <div className=' flex flex-row bg-gray-800 h-full -mt-4 border border-gray-500 w-full'>
                <div className='w-1/4'>
                    <img className="animate-pulse w-96 mb-8 ml-32 mt-8 " src={image} alt="Threat Guardian" />
                </div>
                <p className='w-2/4 mx-auto mt-12 text-xl text-white'>
                    As it is often said, the only constant in Information Technology is changing. As organisations continue to move toward digital transformation, the challenges they face are evolving. True transformation requires exploring new ways of doing business while reducing cost, increasing efficiency and realising a greater return on investment. Cautiously navigating these new frontiers, we must remain aware. We may also be increasing our risk as networking, data requirements and delivery become more abstract. Our infrastructures are becoming more complex, often relying on external dependencies. As we proceed, some legacy problems will disappear from view, some will remain, and some new challenges will come clearly into view. Threat Guardians is Operational and Information Technology based service provider to enhance the cyber security related to the critical infrastructure.
                </p>
                
            </div> */}
            <div className="flex flex-row ">

                {/* <Sidenav /> */}


                <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        Popular courses
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                    <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                        <div className="mx-auto grid md:grid-cols-3 lg:grid-cols-4 w-full py-6">
                            {course.map((item, key) => {

                                return (
                                    <Card item={item} key={key} Button="Purchase" onPublish={Purchase} />
                                )
                            })}
                        </div>
                    </div>

                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        Recommended courses
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                    <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                        <div className="mx-auto grid md:grid-cols-3 lg:grid-cols-4 w-full py-6">
                            {course.map((item, key) => {

                                return (
                                    <Card item={item} key={key} Button="Purchase" onPublish={Purchase} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;