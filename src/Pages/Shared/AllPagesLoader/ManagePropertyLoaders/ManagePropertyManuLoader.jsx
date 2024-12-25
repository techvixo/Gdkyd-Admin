import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ManagePropertyManuLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
            <div className="manu-bar bg-white rounded shadow-md">
                <div className='flex p-3 items-center gap-3 text-xl text-gray-700 font-bold capitalize pb-0'>
                    <Skeleton
                        circle
                        // height="60%"
                        height={27}
                        width={30}
                        containerClassName="avatar-skeleton"
                    />
                    <span><Skeleton width={160} height={15} /></span>
                </div>
                <div className="flex flex-wrap items-center justify-start gap-y-2 font-semibold gap-5 w-full py-2  px-5">
                <span><Skeleton width={70} height={8} /></span>
                <span><Skeleton width={60} height={8} /></span>
                <span><Skeleton width={50} height={8} /></span>
                <span><Skeleton width={50} height={8} /></span>
                <span><Skeleton width={80} height={8} /></span>
                <span><Skeleton width={90} height={8} /></span>
                <span><Skeleton width={60} height={8} /></span>
                <span><Skeleton width={60} height={8} /></span>
                <span><Skeleton width={30} height={8} /></span>
                <span><Skeleton width={50} height={8} /></span>
                <span><Skeleton width={60} height={8} /></span>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default ManagePropertyManuLoader