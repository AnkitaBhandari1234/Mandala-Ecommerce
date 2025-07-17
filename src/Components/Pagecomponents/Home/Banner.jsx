import React from 'react'
import BannerImage from '../../../assets/bannertoken.png';
import BackgroundImg from "../../../assets/banner_bg.png";
const Banner = () => {
  return (
   
    <div className='sm:h-[530px] h-[820px] bg-black w-screen relative shadow-[0px_1px_8px_4px_rgba(117,117,117,0.08)]  '>
      
        <img src={BackgroundImg} alt='' className=' h-full object-cover '/>
        <div className='bg-[linear-gradient(to_right,_#FDF2DD,_#FFE4B180,_#FEE8BE66,_#FDF2DDCC)] absolute top-0 left-0 right-0 bottom-0 bg-[#FDF2DD]/70'></div>
        
      
      <div className=' absolute top-0 flex sm:flex-row flex-col justify-center gap-5 sm:px-36 px-4    w-full py-14   '>
    
      {/* context section */}
      <div className='sm:w-[718px] w-full flex flex-col sm:gap-3 gap-4  justify-center   '>
        <h1 className='font-playfair text-4xl font-semibold tracking-[1.92px] text-[#9B4E2B]'><span className='text-5xl'>50%</span> Off 
          <span className='font-playfair text-[#D9A441] text-4xl font-semibold ml-4 '>Spotlight</span>
          </h1>
          <p className='text-[#414141] font-poppins sm:text-base text-base font-[400] leading-5 tracking-[0.36px] '>Handcrafted Lord Adiyogi Shiv Shankara Backflow Cone Incense Holder Decorative Showpiece with 10 Free Smoke Backflow Scented Cone Incenses (Black)</p>
         <div className='flex items-center gap-5 sm:mt-3'>
          <p className='text-[#414141] font-poppins text-[21px] font-medium leading-4 '>NRs.350</p>
          <p className='text-[#717171] font-poppins text-[20px] font-[400] leading-6 line-through'>NRs.700</p>
         </div>
          <div>
              <button className="font-poppins bg-[#BA4A20] text-base font-medium text-white w-[140px] h-[40px] rounded-lg sm:mt-7 mt-3">
                Shop Now
              </button>
            </div>
      </div>
      {/* image */}
      <div className='   sm:w-[350px] h-[420px] bg-[#FFFBF0] rounded-[16px] relative shadow-[0_2px_12px_0_#99999929]  '>
        <div className='absolute right-0 font-poppins text-[17px] font-[400]  '>
          <button className='bg-[#D9A441] text-white rounded-bl-2xl rounded-tr-2xl w-[107px] h-[42px] '>50% Off</button>
        </div>
       <img src={BannerImage} alt='' className='w-full h-full object-cover py-3    '/>
        </div>

      </div>
    </div>
  )
}

export default Banner