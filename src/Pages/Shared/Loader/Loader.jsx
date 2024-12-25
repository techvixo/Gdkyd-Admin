import React from 'react'
import { Bars } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='w-full h-screen flex justify-center pt-32'>
            {/* <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            /> */}
            {/* <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel='falling-lines-loading'
            /> */}
            {/* <Radio
                visible={true}
                colors={['#65CBE2', '#3980C2', '#439FD7']}
                height="80"
                width="80"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass="radio-wrapper"
            /> */}
            <Bars
                height="80"
                width="80"
                color="#239930"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loader