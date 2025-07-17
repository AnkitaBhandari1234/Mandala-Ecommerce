import React, { useState } from 'react'
import Artisansarangivideo from '../../../assets/Artisan/sarangi.mp4';
import VideoThumbnail from '../../../assets/Artisan/videothumbnail.png';
import Playbutton from '../../../assets/Artisan/playbutton.svg';

const Videoplayer = () => {
    const [showVideo,setshowVideo]=useState(false);
  return (
     <div className="w-full  mx-auto cursor-pointer  ">
      {!showVideo ? (
       <div className='relative flex justify-center  '>

        <img
          src={VideoThumbnail}
          alt="Click to play video"
          className="cursor-pointer w-full sm:rounded-2xl rounded-xl shadow-md sm:h-[530px] h-[390px]   object-cover"
          onClick={() => setshowVideo(true)}
        />
        <div className='absolute sm:top-56 top-40  '>
            <img src={Playbutton} alt='' className='w-20' onClick={()=>setshowVideo(true)}/>
        </div>
        </div>
      ) : (
        <video
          controls
          autoPlay
          className="w-full rounded-2xl shadow-lg sm:h-[530px] h-[390px] object-cover"
        >
          <source src={Artisansarangivideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

export default Videoplayer