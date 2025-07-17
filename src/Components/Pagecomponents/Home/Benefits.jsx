import React from 'react'
import Sewing from '../../../assets/Benefits/sewing.png';
import Recycle from '../../../assets/Benefits/recycle.png';
import Sustainable from '../../../assets/Benefits/sustainable.png';
import Mountain from '../../../assets/Benefits/mountain.png';

const Benefits = () => {
    const benefits=[
        {
            image:Sewing,
            name:'Handcrafted',
           
        },
        {
            image:Recycle,
            name:'Eco-Friendly',

        },
        {
            image:Sustainable,
            name:'Sustainable',
        },
        {
            image:Mountain,
            name:'Made in Nepal',
        },
    ]
  return (
    <div className='bg-[linear-gradient(91deg,_#FFF7D3B8_7.68%,_#FAF0DDE6_55.42%,_#FFF7D3B8_94.4%)] shadow-[0px_1px_8px_0px_rgba(117,117,117,0.08)] '>
        <div className='flex sm:flex-row flex-col  w-7/12 mx-auto items-center gap-24 py-[60px] '>
            {
                benefits.map((val,i)=>{
                    return(
                        <div className='flex flex-col items-center    ' key={i}>
                            <img src={val.image} alt='' className='w-16 h-16 ' />
                            
                            <h4 className='font-poppins font-medium text-[16px]  text-[#BA4A20] leading-3 tracking-[0.18px]'>{val.name}</h4>
                            </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Benefits