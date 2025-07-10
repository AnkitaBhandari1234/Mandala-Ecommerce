import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const MainNavbar = () => {
    const navlist=[
        {
            name:"Shop all",
            path:'/shop_all',

        },
        {
            name:"Decor",
            path:'/decor',

        },
        {
            name:"Textiles",
            path:'/textiles',

        },
        {
            name:"Jewelry",
            path:'/jewelry',

        },
        {
            name:"Ceramics",
            path:'/ceramics',

        },
        {
            name:"Artifacts",
            path:'/artifacts',

        },
        {
            name:"Wellness",
            path:'/wellness',

        },
    ]
    // for sticky mainnavbar
const [sticky,setsticky]=useState(false);
useEffect(()=>{
   const onscroll=()=>{

     if(window.scrollY>50){
       setsticky(true);
     }
     else{
       setsticky(false);
     }
   };
   window.addEventListener('scroll',onscroll);
   return ()=> window.removeEventListener('scroll',onscroll);
},[])
  return (
    <div className={`shadow-sm shadow-[#e7e3e3]  py-3 w-full z-50 transition-all duration-300 ${sticky?'fixed top-0 bg-white  w-full h-16 pt-5   mx-auto':'relative'} `}>
        <nav className='  w-11/12 mx-auto  '>
            <ul className='flex  items-center justify-evenly '>
                {
                    navlist.map((item,index)=>{
                        return(
                            <li key={index} className=''>

                                <Link to={item.path} className='capitalize text-[15px] font-[400] text-[#414141] font-poppins hover:text-[#BA4A20] transition-all ease-in-out duration-300 hover:font-medium'>{item.name}</Link>
                            </li>
                        )
                    })
                }

            </ul>
           
        </nav>

    </div>
  )
}

export default MainNavbar