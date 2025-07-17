import React from 'react'
import Videoplayer from '../Video/Videoplayer'
import Sarangi1 from '../../../assets/Artisan/sarangi1.png'
import Sarangi2 from '../../../assets/Artisan/sarangi2.png'


const Artisan = () => {
  
  return (
    <div className=' bg-[linear-gradient(0deg,_#FFEDD5CC_0%,_#FFEDD5CC_100%)] pt-10 shadow-[0px_1px_8px_0px_rgba(117,117,117,0.08)] '>
      <div className='flex flex-col gap-10 '>
        {/* font content */}
        <div className=' flex  flex-row items-center sm:w-10/12 w-11/12  mx-auto '>
           <span className="w-[25%] h-[1px] col-span-1 bg-[#F4E9CA] sm:block hidden     "></span>

        <div className='flex flex-col sm:gap-0.5 gap-4 w-full  text-center'>
       
          <h1 className='font-playfair text-[#9B4E2B] sm:text-[38px] text-3xl font-semibold tracking-[0.42px] leading-7 sm:leading-snug'> Artisan of the Month: Project Sarangi</h1>
          <p className='font-poppins text-[#414141] text-[14px]  font-[400] tracking-[0.16px] leading-4 '>A collective led by Kiran Nepali, Project Sarangi revives the soulful tradition of handmade sarangis 
by preserving Nepal’s musical heritage through masterful craftsmanship.</p>
        </div>
         <span className="w-[25%] h-[1px] col-span-1 bg-[#F4E9CA]  sm:block hidden    "></span>
        </div>
        {/* video&image section */}
        <div className='flex sm:flex-row flex-col  gap-5  sm:w-11/12 sm:h-[602px] h-[730px]  sm:pl-20 px-3     '>
        <div className=' '>

          <Videoplayer/>
          </div>
          <div className=' sm:w-[20%] w-full flex sm:flex-col flex-row gap-3 h-[530px]  '>

          <div className='w-[260px] sm:h-[293px] h-[230px] '>
            <img src={Sarangi1} alt='' className='rounded-2xl h-full object-cover'/>
          </div>
          <div className='relative w-[260px] sm:h-[293px] h-[230px]   rounded-lg'>
            <img src={Sarangi2} alt='' className='rounded-2xl object-cover h-full' />
            <span className='absolute bottom-0 w-full h-12 bg-[#BA4A20] font-poppins text-sm font-[400]  text-white text-center rounded-b-2xl pt-3'>Explore the Collection</span>
          </div>
          </div>

          

        </div>
      </div>
    </div>
  )
}

export default Artisan