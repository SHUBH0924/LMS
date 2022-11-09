import axios from 'axios'
import React, { useState , useEffect } from 'react'
import Sidenav from '../Layout/Sidenav'
import { useAuth } from '../../Auth/auth'

function Profile() {
    const auth = useAuth()
    const [token, setToken] = useState(auth.token)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [phone, setphone] = useState("")
    useEffect(() => {
        axios.get('http://192.168.0.104:3000/profile', {
                headers: {
                    'Authorization': token
                }
            }).then(res => {
                // console.log(res)
                let data = res.data
                setname(data.name)
                setemail(data.email)
                setphone(data.phone)
                setaddress(data.address)
            })
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            address: address,
            phone: phone
        }
        axios.put('http://192.168.0.104:3000/profile',data,{
            headers: {
              'Authorization': token
            }
          })
        // axios.get('http://192.168.0.103:3000/profile', {
        //     headers: {
        //         'Authorization': token
        //     }
        // }).then(res => {
        //     console.log(res)
        // })
        // console.log(data)
    }
    return (
        <div className='relative'>
            <aside className="flex">
                <Sidenav />
                <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        profile settings
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                    <form className="mt-6 ml-16 w-4/5 max-w-7xl justify-center">
                        <div className="flex flex-wrap -mx-3 mb-4" >
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <div className="mt-3 flex items-center mb-5">
                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="file" />
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                {/* <button type="file-upload" className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" /> */}
                                <input className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="file" />
                            </div>
                            <div className="w-full md:w-1/2 px-6">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                upload
                            </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-Name">
                                    Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-Name" type="text" value={name} onChange={e => setname(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                                    Email id
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="text" value={email} onChange={e => setemail(e.target.value)} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contact">
                                    Contact
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-contact" type="int" value={phone} onChange={e => setphone(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-Name">
                                        Address
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-Name" type="text" value={address} onChange={e=>setaddress(e.target.value)} />
                                </div>

                        <div>
                            <div>
                                <button className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="update" type="submit" onClick={handleSubmit}>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </aside>

        </div >

    )
}

export default Profile;

