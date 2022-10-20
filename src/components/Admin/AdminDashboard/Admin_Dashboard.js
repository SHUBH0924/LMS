import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../Card/Card"
import Sidenav from "../../Layout/Sidenav"
import classes from "./Admin_Dashboard.module.css"
import Create_Course from "./CreateCourse/Create_Course"


const Admin_Dashboard = () =>{

    const backendServer = `http://172.29.234.130:3000/courses`
    const [Course,setCourse] = useState([])

    const Navigate = useNavigate();

    useEffect(()=>{
    axios.get(backendServer).then(res=>{
        // console.log(res.data)
        setCourse(res.data)
        // console.log(Course)
        })
    },[])


    const onPublish = (id) =>{
        // e.preventdefault()
        
        Navigate(`/course/${id}`)
        // console.log({id},"Clicked")
    }

    const createNewCourse = ({a}) =>{
        
        
        // console.log(a)    
        axios.post(backendServer,a).then(res=>{
            // console.log(res)
            setCourse(Course => [...Course, a]);
        }).catch(err=>{
            console.log(err)
        })
        // console.log(unpublished_course)    
}


    const [CourseToggle,setCourseToggle]= useState(false)

    return(
        <div className='relative'>
        <aside className="flex">
            
                <Sidenav />
            

            <div className='flex flex-col w-full'>
                
                    {/* <button className={classes.Button} onClick={e=>setCourseToggle(!CourseToggle)}>Create Course</button> */}
                    {/* <div>
                            
                            </div> */}
                    {
                        <Create_Course createNewCourse={createNewCourse}/>
                    }

                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        published Courses
                    </h1>
                    <hr className="w-1/3 mx-auto"/>
                    <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-full py-6">
                            {Course.filter(item=>{
                                    return item.published===true
                                }).map(item =>{                 
                                    return(
                                        <Card item={item} Button="Edit" onPublish={onPublish} />
                                    )
                                })}
                        </div>
                    </div> 

                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        unPublished Courses
                    </h1>
                    <hr className="w-1/3 mx-auto"/>
                    <div className="flex grid-flow-col justify-items-center ml-6 mr-5">
                        <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-full py-6">
                            {Course.filter(item=>{
                                    return item.published===false
                                }).map(item =>{
                                    
                                    return(
                                        <Card item={item} Button="Publish" onPublish={onPublish}/>
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