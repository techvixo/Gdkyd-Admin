import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FacilitesCardLoader = () => {
    return (
        <SkeletonTheme baseColor="#b6bdd136" highlightColor="#19b4ef4d">
            <div className="shadow-lg p-2  rounded-md">
                <p className="font-bold text-sm mt-2"><Skeleton width={100} height={10} /></p>
                <div className="facility-item-card">
                    <div className="form-control w-full">
                        <label className="cursor-pointer justify-start gap-3 label">
                        <span><Skeleton width={30} height={16} /></span>
                        <span><Skeleton width={80} height={8} /></span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="cursor-pointer justify-start gap-3 label">
                        <span><Skeleton width={30} height={16} /></span>
                        <span><Skeleton width={80} height={8} /></span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="cursor-pointer justify-start gap-3 label">
                        <span><Skeleton width={30} height={16} /></span>
                        <span><Skeleton width={80} height={8} /></span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="cursor-pointer justify-start gap-3 label">
                        <span><Skeleton width={30} height={16} /></span>
                        <span><Skeleton width={80} height={8} /></span>
                        </label>
                    </div>
                    <div className="form-control w-full">
                        <label className="cursor-pointer justify-start gap-3 label">
                        <span><Skeleton width={30} height={16} /></span>
                        <span><Skeleton width={80} height={8} /></span>
                        </label>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    )
}

export default FacilitesCardLoader