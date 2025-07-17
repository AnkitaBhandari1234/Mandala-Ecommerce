import React from 'react'

const Newsletter = () => {
  return (
    <div className='bg-gradient-to-r from-[#FFF7D3CC] via-[#FAF0DD] to-[#FFF7D3CC] sm:h-[234px] h-[170px]  shadow-[0px_1px_8px_0px_rgba(117,117,117,0.08)] '>
        <div className='flex flex-col sm:gap-8 gap-5  items-center justify-center h-full' >
            <div className='flex flex-col items-center gap-1'>

            <h1 className='font-playfair font-[600] sm:text-[30px] text-2xl tracking-[0.32px] text-[#9B4E2B]'>Subscribe to Our Newsletter</h1>
            <span className='font-poppins text-base font-[500] text-[#414141] -tracking-wide leading-3'>“Get 10% off your first order”</span>
            </div>
            <div className='flex gap-2  sm:h-[44px] h-[35px]'>
                <input type='email' id='email' placeholder='Your email address' className='sm:w-[413px] w-[260px]  sm:h-[45px] rounded-[9px] border-[#D1D1D1] border placeholder:text-[#414141] font-inter font-[400] text-[14px] pl-3 outline-none  '/>
                <button type='submit' className='bg-[#A0522D] font-inter font-[400] sm:text-base text-sm text-[#F5E1CC] rounded-[9px] sm:px-6 px-3 shadow-[0_6px_12px_rgba(0,0,0,0.2)] 
              '>Subscribe</button>
                </div>

        </div>
    </div>
  )
}

export default Newsletter