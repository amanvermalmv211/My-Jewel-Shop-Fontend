import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Spinner = (props) => {

    const contentToDisplay = <div data-aos="zoom-in-up" data-aos-duration="500">
        <div className="group relative block h-96 overflow-hidden rounded-t-lg bg-gray-100 cursor-pointer">
            <Skeleton count={10} className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
        </div>

        <div className="flex items-start justify-between gap-2 rounded-b-lg bg-gray-100 p-4">
            <div className="flex flex-col">
                <div className="font-bold text-gray-700 transition duration-100 hover:text-gray-600 lg:text-lg w-20"><Skeleton /></div>

                <span className="text-sm text-gray-500 lg:text-base"><Skeleton /></span>

            </div>

            <div className="flex flex-col items-end">
                <span className="font-bold text-gray-600 lg:text-lg w-20"><Skeleton /></span>
                <span className="text-sm text-red-500 line-through w-20"><Skeleton /></span>

            </div>

        </div>
    </div>;

    const numberOfTimes = 8; // Change this number to replicate content more or fewer times

    const replicatedContent = Array.from({ length: numberOfTimes }, (_, index) => (
        <div key={index}>{contentToDisplay}</div>
    ));

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {replicatedContent}
        </div>
    )
}

export default Spinner;