import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const LatestUpdatedModel = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/models/latest")
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Latest Updated Models</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model._id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={model.thumbnailUrl}
              alt={model.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-3">{model.name}</h3>
            <p className="text-gray-700 text-sm line-clamp-2">
              {model.description}
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Updated: {new Date(model.created_at).toLocaleDateString()}
            </p>
            <Link to={`/models/${model._id}`} className="btn btn-primary  mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200">
          View
        </Link>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default LatestUpdatedModel;
