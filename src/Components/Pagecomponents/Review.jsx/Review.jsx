import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import api from '../../../Api/axios'
import { toast } from 'react-toastify';
import { useUser } from '../../../Context/UserContext'; 

const ReviewForm = ({ onReviewSubmit,productId }) => {
  const { user } = useUser(); // get the logged-in user

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
      

    if (!user?.name || !user?.email || rating === 0 || !review) {
    alert("Please fill all fields and select a rating.");
    return;
  }

    // Create review object
    const newReview = {
     name: user.name,
    email: user.email,
      rating,
     message: review,
productId,

       date: new Date().toISOString(),
    };
      console.log("Submitting review:", newReview);

    try {
      
      await onReviewSubmit(newReview);
      setRating(0);
      setReview("");
    } catch (err) {
  
    console.error("Review submission error:", err);
  };
  }
  return (
    <div className='sm:mx-20 mx-3 sm:mt-10 '>

    <div className='sm:w-[650px]   bg-[#F9EBD2]  shadow-[0px_1px_0px_0px_rgba(0,0,0,0.09)] sm:p-8 p-4 rounded-2xl'>

    <form onSubmit={handleSubmit} className='flex flex-col   sm:gap-5 gap-3'>
      {/* Name and Email side by side */}
      <div className='flex sm:gap-3 gap-2'>
        <input
          type="text"
  value={user?.name || ""}
  readOnly
          
          className='border  border-[#E4E4E4] rounded-lg shadow-[0px_1px_0px_0px_rgba(0,0,0,0.03)] text-[#999] font-[300] font-poppins text-sm tracking-[-0.14px] sm:w-[300px] w-[165px]  py-2 pl-2 outline-none'
        />
        <input
          type="text"
  value={user?.email || ""}
  readOnly
          className='border border-[#E4E4E4] rounded-lg shadow-[0px_1px_0px_0px_rgba(0,0,0,0.03)] text-[#999] font-[300] font-poppins text-sm tracking-[-0.14px] sm:w-[300px] w-[165px] py-2 pl-2 outline-none'
          
          
        />
      </div>

      {/* Star rating */}
      <div>
        <StarRatings
          rating={rating}
          changeRating={setRating}
          numberOfStars={5}
          name="rating"
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="2px"
          
        />
      </div>

      {/* Review textarea */}
      <div>
        <textarea
          placeholder="Tell us about your overall experience "
          value={review}
          className='text-[#999] font-poppins text-sm font-[300] tracking-[-0.14px] w-full h-48  resize-none outline-none rounded-lg pl-3 pt-3 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.03)] mt-3'
          onChange={e => setReview(e.target.value)}
          required
        />
      </div>

      {/* Submit button */}
      <div className='bg-[#9B4E2B] text-base font-[500] font-poppins tracking-[-0.16px] text-white rounded-full w-fit px-9 py-2 '>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default ReviewForm;
