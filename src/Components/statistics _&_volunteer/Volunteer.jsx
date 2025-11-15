import React, { useState } from "react";

const Volunteer = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const Issue = e.target.issue.value;

    console.log("Searching for issue:", Issue);

    fetch(`https://my-cocerptual-session-server.vercel.app/search?q=${Issue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Search results:", data);
        setSearchQuery(data);
      })
      .catch((err) => console.error("Error search:", err));
  };
  return (
    <div>
      <div className="bg-yellow-400 flex py-20 justify-center items-center text-center flex-col  px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Report, view, or discuss Your City's problems
        </h1>
        <p className="text-gray-800 mb-6 text-lg">
          Garbage, Illegal, Construction, Broken Public Property, Road Damage
        </p>

        <p className="text-gray-800 mb-2 font-semibold">
          Enter Your Issues To Help Your City
        </p>
        <p className="text-gray-700 mb-6 italic"></p>

        <div className="">
          {/* <input
          type="text"
          placeholder="Enter location..."
          className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none"
        /> */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white gap-0"
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
        </div>

        <button className="flex items-center gap-2 border border-gray-800 px-5 py-2 rounded-md font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition">
          EXplore
        </button>
      </div>
    </div>
  );
};

export default Volunteer;
