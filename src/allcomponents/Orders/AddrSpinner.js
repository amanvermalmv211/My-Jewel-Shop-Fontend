import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AddrSpinner = () => {
    return (
        <div className='flex flex-col items-center bg-gray-300 p-4 rounded-xl shadow-lg shadow-gray-700 mb-96'>
            <h1 className='w-24'><Skeleton/></h1>
            
            <div className='flex flex-col items-center'>
                <p className="w-56"><Skeleton/></p>
                <p className="w-52"><Skeleton/></p>
                <p className="w-40"><Skeleton/></p>
            </div>

            <div className='w-28'><Skeleton/></div>
            
        </div>
    )
}

export default AddrSpinner;