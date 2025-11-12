import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import SingeDoctors from "./SingeDoctors";

const EXpert = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("/doctors.json")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((e) => console.error( e));
  }, []);

  // console.log(doctors)

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-5">Meet Our Expert Vets</h1>
       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
         {
          doctors.map((doctor) =><SingeDoctors doctor={doctor} ></SingeDoctors>)
        }
       </div>
      </div>
      
    </div>
  );
};

export default EXpert;
