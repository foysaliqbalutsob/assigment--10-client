import React from "react";
import QNO from "../assets/Qn.jpg";
import garbage from "../assets/Garbage.jpg";
import illegalConstruction from "../assets/Illegal Construction.jpg";
import brokenPublicProperty from "../assets/Broken Public Property.jpg";
import roadDamage from "../assets/RoadDamage.jpg";
import Swal from "sweetalert2";
import Aos from "../Components/Aos";

const categories = [
  {
    title: "Garbage",
    img: garbage,
    desc: "Report uncollected waste and help keep your area clean.",
  },
  {
    title: "Illegal Construction",
    img: illegalConstruction,
    desc: "Identify unauthorized structures affecting your community.",
  },
  {
    title: "Broken Public Property",
    img: brokenPublicProperty,
    desc: "Notify authorities about damaged public infrastructure.",
  },
  {
    title: "Road Damage",
    img: roadDamage,
    desc: "Report potholes or broken roads to ensure safer travel.",
  },
];

const handleReport = () => {
  // console.log('click')

  Swal.fire({
    title: "Add your Issues!",
    icon: "success",
    draggable: true,
  });
};

const Categories = () => {
  return (
    <div>
     
      <div className="flex flex-col lg:flex-row  justify-center items-center max-w-6xl mx-auto px-4 py-10 gap-40  ">
        <div>
          <img className="w-100 h-100" src={QNO} alt="" />
        </div>
        <div>
          <p>Want to contribute to your community?</p>

          <ul className="steps steps-vertical">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Post Issue</li>
            <li className="step">Contribute Amount </li>
            <li className="step"> Create a Ideal City </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#FFD700]">
        <div className="max-w-6xl mx-auto px-4 py-10 ">
          <h2 className="text-3xl font-bold text-center ">Issue Categories</h2>
          <p className="text-center text-gray-600 mb-10">
            Select a category to report and contribute to a cleaner, safer city.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="bg-white  rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm">{cat.desc}</p>
                </div>
                <div className="px-4 pb-4 text-center">
                  <button
                    onClick={handleReport}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Report Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
