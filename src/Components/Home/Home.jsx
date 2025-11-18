import React, { useEffect, useState, useContext } from "react";
import ModelCard from "../ModelCard/ModelCard";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");

  // Load all models initially
  useEffect(() => {
    fetch("https://my-cocerptual-session-server.vercel.app/models")
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error(err));
  }, []);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();
    const Issue = e.target.issue.value;

    fetch(`https://my-cocerptual-session-server.vercel.app/search?q=${Issue}`)
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error(err));
  };

  // Filter Logic
  const filteredModels = models.filter((item) => {
    if (filterCategory && item.category !== filterCategory) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {/* Banner */}
      <div className="bg-yellow-400 flex py-20 justify-center items-center text-center flex-col px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Report, view, or discuss Your City's problems
        </h1>
        <p className="text-gray-800 mb-6 text-lg">
          Garbage, Illegal Construction, Broken Public Property, Road Damage
        </p>
        <p className="text-gray-800 mb-2 font-semibold">
          Enter Your Issues To Help Your City
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white gap-0"
        >
          <input
            className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none"
            type="text"
            placeholder="Enter Issue ..."
            name="issue"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 font-semibold rounded-r-md hover:bg-gray-800 transition"
          >
            Go
          </button>
        </form>
      </div>

      {/* Title */}
      <div className="flex justify-center items-center mt-6">
        <p className="text-2xl font-bold">All Issues</p>
      </div>

      <div className="flex justify-center items-center">
        <p className="text-[12px] text-blue-500">
          Explore {filteredModels.length} models
        </p>
      </div>

      {/* Filter Section */}
      <div className="flex justify-center mt-6">
        <select
          className="border p-2 rounded-md"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Category</option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Nature">Nature</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-4 mt-4">
        {filteredModels.map((data) => (
          <ModelCard key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Home;
