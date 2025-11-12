import React, { use, useEffect, useState } from "react";
import { Link,  useNavigate, useParams } from "react-router";
import { BsDownload } from "react-icons/bs";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const ModelDetails = () => {
  const [model, setModel] = useState(null);
  const { user } = use(AuthContext)
  // console.log(user.accessToken)
 
  
  const navigate = useNavigate(); 
  const { id } = useParams() 
  console.log(id)


   useEffect(() => {
  if (!user) return; 

  fetch(`http://localhost:3000/models/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setModel(data.result))
    .catch((err) => console.error(err));
}, [id, user]);



   if (!model) {
    return (
      <Loading></Loading>
    );
  }

  const handleDelete = () => {
    const id = model._id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/models/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.success) {
              Swal.fire("Deleted!", "Model has been deleted.", "success");
              navigate("/"); // ✅ After delete go to Home
            } else {
              Swal.fire("Failed!", "Delete operation failed!", "error");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Something went wrong!", "error");
          });
      }
    });
  };





 
 const handleDownload = () => {
  fetch("http://localhost:3000/downloads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      modelId: model._id,
      modelName: model.name,
      downloadedBy: user.email,
      createdBy: model.created_by,
      downloadedAt: new Date(),
    }),
  })
    .then(res => res.json())
    .then(data => {
      toast("Download successfully!");
      setModel(prev => ({ ...prev, downloads: prev.downloads + 1 }));
    })
    .catch(err => {
      console.error(err);
      alert("Error!");
    });
};



  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border">

        {/* ✅ Model Image */}
        <div className="relative">
          <img
            src={model.thumbnailUrl}
            alt={model.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {model.category}
          </span>
        </div>

        {/* ✅ Model Info */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-gray-900">{model.name}</h2>
          <p className="text-gray-700 mt-3">{model.description}</p>

          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Created By:</span> {model.created_by}</p>
            <p><span className="font-medium">Created On:</span> {new Date(model.created_at).toLocaleDateString()}</p>
            <p><span className="font-medium">Downloads:</span> <span className="text-blue-600 font-semibold">{model.downloads}</span></p>
          </div>

          {/* ✅ Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">

            {/* Download */}
            <button onClick={handleDownload } className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md flex items-center gap-2">
              <BsDownload size={20} /> Download
            </button>

            {/* Update */}
            <Link to={`/update-models/${model._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md">
              Update
            </Link>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md">
              Delete
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;
