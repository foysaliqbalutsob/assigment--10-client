import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Loading";

const LatestUpdatedModel = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://my-cocerptual-session-server.vercel.app/models/latest")
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const Issue = e.target.issue.value;

    setLoading(true);
    fetch(`https://my-cocerptual-session-server.vercel.app/search?q=${Issue}`)
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Error search:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {/* Hero / Search Section */}
      <div className="bg-yellow-400 flex py-20 justify-center items-center text-center flex-col px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Report, view, or discuss Your City's problems
        </h1>
        <p className="text-gray-800 mb-6 text-lg">
          Garbage, Illegal, Construction, Broken Public Property, Road Damage
        </p>

        <p className="text-gray-800 mb-2 font-semibold">
          Enter Your Issues To Help Your City
        </p>

        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white gap-0 mb-4 w-full max-w-md mx-auto"
        >
          <input
            className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none"
            type="text"
            placeholder="Enter Issue  ..."
            name="issue"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 font-semibold rounded-r-md hover:bg-gray-800 transition"
          >
            Go
          </button>
        </form>

        <Link
          to="/allIssue"
          className="flex items-center gap-2 border border-gray-800 px-5 py-2 rounded-md font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition"
        >
          Explore More
        </Link>
      </div>

      
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6  text-center">
          Latest Updated Issues
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {models.map((model) => (
              <div
                key={model._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={model.image}
                  alt={model.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {model.title}
                  </h3>
                  <p className="text-sm text-blue-600 mb-2">{model.category}</p>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {model.shortDescription}
                  </p>

                  <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
                    <span>Location: {model.location}</span>
                    <span>Budget: ${model.amount}</span>
                  </div>

                  <div className="flex justify-between items-center text-gray-400 text-xs mb-3">
                    <span>By: {model.email?.split("@")[0]}</span>
                    <span>{new Date(model.date).toLocaleDateString()}</span>
                  </div>

                  <Link
                    to={`/models/${model._id}`}
                    className="w-full bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-600 transition-colors duration-200 text-center block"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestUpdatedModel;
