import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HotelCardListLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full bg-[#ffffffe0] p-2 shadow rounded-lg">
                <div className="grid grid-cols-2">
                    <div className="flex items-center justify-center">
                    <Skeleton
                        circle 
                        // height="60%"
                        height={20}
                        width={20}
                        containerClassName="avatar-skeleton"
                    />
                    </div>
                    <div className="w-12 h-12">
                    <Skeleton width="100%" height="100%" />
                    </div>
                </div>
                <div className="flex items-start flex-col">
                <Skeleton width={120} height={10} />
                <Skeleton width={50} height={10} />
                </div>
                <div className="flex items-center">
                <Skeleton width={100} height={10} />
                </div>
                <div className="flex flex-col ">
                <Skeleton width={50} height={10} />
                <Skeleton width={100} height={10} />
                </div>
                <div className="flex items-center">
                <Skeleton width={50} height={10} />
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default HotelCardListLoader