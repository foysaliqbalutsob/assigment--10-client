import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ModelCard from "../ModelCard/ModelCard";

const MyDownloadpage = () => {
  const [models, setModels] = useState([]);
  const { user } = useContext(AuthContext);

useEffect(() => {
  if (!user?.accessToken) return;

  fetch(`http://localhost:3000/my-downloads?email=${user.email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setModels(data.result);
        console.log("Downloads loaded:", data.result);
      } else {
        console.error("Failed to load downloads:", data.message);
      }
    })
    .catch((err) => console.error("Error fetching downloads:", err));
}, [user]);


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Downloads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.length > 0 ? (
          models.map((model) => (
            <ModelCard key={model._id} model={model} />
          ))
        ) : (
          <p>No downloads found.</p>
        )}
      </div>
    </div>
  );
};

export default MyDownloadpage;
