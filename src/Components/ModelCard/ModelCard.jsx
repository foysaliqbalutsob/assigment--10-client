import React from 'react';
import { Link } from 'react-router';

const ModelCard = ({ data }) => {
  const {
    name,_id,
    category,
    description,
    thumbnailUrl,
    downloads,
    created_by,
    created_at
  } = data;

  // console.log(data,_id);

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={thumbnailUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <p className="text-gray-700 text-sm mb-3">{description}</p>

        <div className="flex justify-between items-center text-gray-600 text-sm">
          <span>Downloads: {downloads}</span>
          <span>By: {created_by.split('@')[0]}</span>
        </div>

        <div className="mt-2 text-gray-400 text-xs">
          Created: {new Date(created_at).toLocaleDateString()}
        </div>

        <Link to={`/models/${_id}`} className="btn btn-primary  mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200">
          View
        </Link>
      </div>
    </div>
  );
};

export default ModelCard;
