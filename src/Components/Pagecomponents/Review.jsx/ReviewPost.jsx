import React from "react";
import StarRatings from "react-star-ratings";

const ReviewPost = ({ review }) => {
  // Format date nicely, fallback if no date provided
  const formattedDate = review.date
    ? new Date(review.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
      
       
        

        <div className=" flex flex-col leading-4">

      <div className="flex  gap-10 items-center  ">
        <h4 className="font-semibold text-lg text-[#414141]">{review.name}</h4>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
      <StarRatings
        rating={review.rating}
        numberOfStars={5}
        starRatedColor="orange"
        starDimension="15px"
        starSpacing="0px"
        name="rating"
      />
      <p className=" text-[#414141] text-base font-[400] font-poppins tracking-[-0.16px] mt-4 ">{review.review}</p>
        </div>
        
   
  );
};

export default ReviewPost;
