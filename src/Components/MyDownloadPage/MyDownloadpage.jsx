import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ModelCard from "../ModelCard/ModelCard";
import { Link } from "react-router";

const MyDownloadpage = () => {
  const [models, setModels] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.accessToken) return;

    fetch(
      `https://my-cocerptual-session-server.vercel.app/my-downloads?email=${user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
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
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">My Downloads</h2>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.length > 0 ? (
            models.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
              >
                {item.thumbnailUrl && (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.modelName}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">{item.modelName}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Model ID:</strong> {item.modelId}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Created by:</strong> {item.createdBy}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Downloaded by:</strong> {item.downloadedBy}
                </p>

                <Link to={`/models/${item.modelId}`}>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    View Model
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p>No downloads found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDownloadpage;
