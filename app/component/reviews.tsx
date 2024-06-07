import React from 'react'

const Reviews = () => {
    return (
        <div id="reviews" className="w-full flex flex-col items-center justif-start gap-10 pt-[40px] pb-[20px] pr-[70px] pl-[70px] ">
            <h3 className="font-bold text-3xl text-black">Reviews</h3>
            <div className="w-full flex flex-row items-start justify-between gap-3 h-auto">
                {/* left side */}
                <div className="w-[30%] flex flex-col items-start justify-start gap-3 h-[500px] bg-gray-100 "></div>
                <div className="w-[40%] flex flex-col items-start justify-start gap-3 h-[500px] ">
                    <div className="w-full h-1/2 bg-gray-100 "></div>
                    <div className="w-full h-1/2 bg-gray-100 "></div>
                </div>
                {/* right side */}
                <div className="w-[30%] flex flex-col items-start justify-start gap-3 h-[500px] bg-gray-100 "></div>
            </div>

        </div>
    )
}

export default Reviews