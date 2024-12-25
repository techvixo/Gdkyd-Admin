import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const OurClientLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full bg-white p-2 shadow rounded-lg">
            <div className="lg:col-span-2">
                {/* <div className="df">
                    <h5 className='text-gray-600 text-sm font-semibold'>{user_name}</h5>
                    <span className='text-sm font-semibold text-gray-500'>Id: {user_id}</span>
                </div> */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12">
                    <Skeleton
                        circle 
                        // height="60%"
                        height="100%"
                        width="100%"
                        containerClassName="avatar-skeleton"
                    />
                        
                    </div>
                    <div className="">
                    <Skeleton width={70} height={10} />
                <Skeleton width={120} height={10} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col ">
            <Skeleton width={120} height={10} />
            <Skeleton width={50} height={10} />
                
            </div>
            <div className="flex items-center">
            <Skeleton width={120} height={13} />
            </div>
            <div className="flex items-center">
            <Skeleton width={120} height={13} />
            </div>
            <div className="flex justify-center items-center">
            <Skeleton width={75} height={20} />
            </div>
        </div>
        </SkeletonTheme >
    )
}

export default OurClientLoader