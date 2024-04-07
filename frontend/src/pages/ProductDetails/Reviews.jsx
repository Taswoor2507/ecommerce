import React from "react";
import ReactStars from "react-rating-stars-component";

const Reviews = ({ review }) => {
  return (
    <div className="bg-slate-300 p-6 shadow-md rounded-md">
      <img
        className="w-[50px] h-[50px] object-cover rounded-full object-top"
        src="https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8101.jpg?w=360"
      />
      <h1 className="font-bold">{review.name}</h1>
      <p className="">{review.comment}</p>
      <ReactStars
        edit={false}
        count={5}
        size={40}
        isHalf={true}
        activeColor="orange"
        value={review.rating}
      />
    </div>
  );
};

export default Reviews;
