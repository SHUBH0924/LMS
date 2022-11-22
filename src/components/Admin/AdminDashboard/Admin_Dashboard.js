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
    const backendServer = `http://172.29.110.209:3000`
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
        // const publish = item.published
        Navigate(`/course/${id}`)
        // ,{state:{Publish:publish,item:item}}
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
        <div className='relative '>
           
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
                        <hr className="w-1/3 mx-auto h-1  bg-black mt-5 drop-shadow-2xl"/>
                        <h1 className='mt-4 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                            published courses
                        </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        <div className="flex-container flex flex-wrap grid-flow-col justify-items-center px-8 lg:px-8 w-full">
                            <div className="mx-auto md:mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mx-auto w-full py-6">
                                {Course.filter(item => {
                                    return item.published === true
                                }).map((item,key) => {
                                    return (
                                        <Card key={key} item={item} Button="Edit" onPublish={onPublish} />
                                    )
                                })}
                            </div>
                        </div>

                        <h1 className='mt-6 select-none px-6 capitalize text-4xl text-black font-semibold py-6 mx-auto'>
                           unpublished courses
                        </h1>
                        <hr className="w-3/5 mx-auto h-2 mb-5" />
                        <div className="flex-container flex flex-wrap grid-flow-col justify-items-center px-4 lg:px-8 w-full">
                            <div className="mx-auto md:w-full  grid grid-col-1 shrink-0 md:grid-cols-2 lg:grid-cols-3 lg:mx-auto w-full py-6">
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