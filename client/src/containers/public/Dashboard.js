import React from 'react'
import AHeader from './AHeader'
import AddProductType from './AddProductType'

const Dashboard = () => {

    return (
        
        <div className='bg-[#F3F4F6]'>
            <AHeader/>
            <div name='container's className='pl-20 pt-20 w-full h-screen '>
                <div name='task' className='m-3'>
                    {/* Main */}
                    <AddProductType/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard