import React from "react";
import { Link } from "react-router";

const ModelCard = ({ data }) => {
  const {
    title,
    _id,
    category,
    shortDescription,
    image,
    amount,
    location,
    date,
    email,
  } = data || {};

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Thumbnail Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      {/* Card Body */}
      <div className="p-4">
        {/* Title & Category */}
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-blue-600 mb-2">{category}</p>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3">{shortDescription}</p>

        {/* Location & Amount */}
        <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
          <span>Location: {location}</span>
          <span>Budget: ${amount}</span>
        </div>

        {/* Reported By & Date */}
        <div className="flex justify-between items-center text-gray-400 text-xs mb-3">
          <span>By: {email?.split("@")[0]}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>

        {/* View Button */}
        <Link
          to={`/models/${_id}`}
          className="w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600 transition-colors duration-200 text-center block"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default ModelCard;
