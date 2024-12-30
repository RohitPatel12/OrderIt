import React,  { useEffect, useState } from "react"

const useMobile = (breakpoint = 768) => {
 const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

const  handleResise = () => {
    const checkpoint = window.innerWidth < breakpoint
    setIsMobile(checkpoint)
}

useEffect(()=>{
    handleResise()
    
    window.addEventListener('resize',handleResise)

    return ()=>{
        window.removeEventListener('resize',handleResise)
    }
})

 return [ isMobile ]
}

export default useMobile