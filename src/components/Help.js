import React from 'react'
import Sidenav from "./Layout/Sidenav";
import { Row , Col} from 'reactstrap';
import {FcSms, FcCallback}  from 'react-icons/fc'




function Help() {
    return (
        <div className='relative'>
            <aside className="flex">
                <Sidenav />
                <div className='flex flex-col w-full'>
                    <h1 className='mt-6 mb-3 capitalize text-4xl mx-auto font-bold'>
                        Help
                    </h1>
                    <hr className="w-1/3 mx-auto h-2 rounded-full bg-gradient-to-r from-gray-700 " />
                    <div className="text-black font-bold py-2 px-4 rounded-full">
                        <h1>Reach out to the Threat Guardians Team and let us know how we can help you. We’ll respond as soon as we can.</h1>
                    </div>
                    <Row className="text-black font-bold py-7 px-4 rounded-full">
                        <Col><FcSms  /><a href="mailto:enquiry@threatguardians.com" target="_blank_" className='border-gray-200 rounded py-3 px-4 mb-3'>enquiry@threatguardians.com</a></Col>
                        <Col><FcCallback  /><a href="tel:+919616619764" target="_blank_" className='border-gray-200 rounded py-3 px-4 mb-3'>+919616619764</a></Col>
                    </Row>    
                </div>
            </aside>
        </div>
    )
}

export default Help;
