import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../Auth/auth"
import Card from "../../Card/Card"
import Sidenav from "../../Layout/Sidenav"
import classes from "./Admin_Dashboard.module.css"
import Create_Course from "./CreateCourse/Create_Course"
import Header from '../../Header'

const Admin_Dashboard = () => {

    const auth = useAuth()
    const backendServer = `http://172.29.234.174:3000`
    const [Course, setCourse] = useState([])
    const token = auth.token
    const Navigate = useNavigate();

    useEffect(() => {
        // console.log(token)
        axios.get(`${backendServer}/course/all`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            console.log(res.data)
            setCourse(res.data)
            // console.log(Course) 
        })
    }, [])


    const onPublish = (item) => {
        // e.preventdefault()
        const id = item._id
        const publish = item.published
        Navigate(`/course/${id}`,{state:{Publish:publish,item:item}})
        // console.log({id},"Clicked")
    }



    const createNewCourse = async ({ a }) => {

        // console.log(a)
        // const fd = new FormData();
        // fd.append('image',a)

        await axios.post(`${backendServer}/course`, a, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            // console.log(a)
            // setCourse(Course => [...Course, a]);
            toast.success("Course created")
        }).catch(err => {
            toast.error("Course not created")
            console.log("err")
        })
        // console.log(unpublished_course)    

        axios.get(`${backendServer}/courses`, {
            headers: {
                'Authorization': token
            }
        }).then(res => {
            // console.log(res.data)
            setCourse(res.data)
            // console.log(Course) 
        })
    }


    // const [CourseToggle, setCourseToggle] = useState(false)

    return (
        <div className='relative'>
            <div className='sticky top-0 z-50'>
                <Header />
                </div>
                <aside className="flex flex-row ">
                        {/* <Sidenav /> */}
                    <div className='flex flex-col w-full'>

                        {/* <button className={classes.Button} onClick={e=>setCourseToggle(!CourseToggle)}>Create Course</button> */}
                        {/* <div>
                            
                            </div> */}
                        {
                            <Create_Course createNewCourse={createNewCourse} className="float-right"/>
                        }
                        <hr className="h-2 -z-10 bg-black mt-4 drop-shadow-2xl"/>
                        <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                            published Courses
                        </h1>
                        <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                        <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                            <div className="mx-auto grid  md:grid-cols-3 lg:grid-cols-4 w-full py-6">
                                {Course.filter(item => {
                                    return item.published === true
                                }).map((item,key) => {
                                    return (
                                        <Card key={key} item={item} Button="Edit" onPublish={onPublish} />
                                    )
                                })}
                            </div>
                        </div>

                        <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                            unPublished Courses
                        </h1>
                        <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                        <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                            <div className="mx-auto grid md:grid-cols-3 lg:grid-cols-4 w-full py-6">
                                {Course.filter(item => {
                                    return item.published === false
                                }).map((item,key) => {

                                    return (
                                        <Card item={item} Button="Edit" key={key} onPublish={onPublish} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        
    )
}

export default Admin_Dashboard;