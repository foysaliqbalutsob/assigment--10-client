import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loading";
import { toast } from "react-toastify";

const UpdateCard = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data?.result || data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicke')

    // form data collect
    const form = e.target;
    const updatedData = {
      name: form.name.value,
      category: form.category.value,
      thumbnailUrl: form.thumbnailUrl.value,
      description: form.description.value,
      downloads: Number(form.downloads.value),
    };
    console.log(updatedData)

    fetch(`http://localhost:3000/models/${id}`, {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(updatedData),
     })
       .then((res) => res.json())
       .then((data) => {
         console.log(data);
        toast(data.success ? "Model updated successfully!" : "Update failed!");
       })
       .catch((err) => {
         console.error(err);
         toast("Something went wrong!");
       });
  };




  if (!model) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Model Info</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Name */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Model Name</label>
          <input name="name" defaultValue={model.name} className="border rounded-lg p-3" type="text" />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Category</label>
          <input name="category" defaultValue={model.category} className="border rounded-lg p-3" type="text" />
        </div>

        {/* Thumbnail URL */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Thumbnail URL</label>
          <input name="thumbnailUrl" defaultValue={model.thumbnailUrl} className="border rounded-lg p-3" type="text" />
        </div>

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Description</label>
          <textarea name="description" defaultValue={model.description} className="border rounded-lg p-3" rows="4"></textarea>
        </div>

        {/* Downloads */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Downloads</label>
          <input name="downloads" defaultValue={model.downloads} className="border rounded-lg p-3" type="number" />
        </div>

        {/* Created By */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Created By</label>
          <input defaultValue={model.created_by} className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed" type="text" readOnly />
        </div>

        {/* Created At */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Created At</label>
          <input defaultValue={new Date(model.created_at).toLocaleDateString()} className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed" type="text" readOnly />
        </div>

        {/* Submit */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow transition md:col-span-2">
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateCard;
