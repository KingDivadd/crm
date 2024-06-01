import React from 'react'

const LandingNav = () => {
    return (
        <div className="w-full h-[40px] flex flex-row items-center justify-between bg-">
            <span className="w-1/2 flex items-center justify-start h-full">
                <span className="w-auto flex items-center justify-start gap-3">
                    <p>Logo</p>
                    <p>icon</p>
                </span>
            </span>
            {/* right side of the landing nav */}
            <span className="w-1/2 flex items-center justify-start h-full">
                <span className="w-auto flex items-center justify-start gap-3">
                    <p>Home</p>
                    <p>About us</p>
                    <p>Contact</p>
                    <p>Get started Button</p>
                </span>
            </span>
        </div>
    )
}

export default LandingNav