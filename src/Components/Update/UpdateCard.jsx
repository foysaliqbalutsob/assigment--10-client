// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import Loading from "../Loading";
// import { toast } from "react-toastify";

// const UpdateCard = () => {
//   const { id } = useParams();
//   const [model, setModel] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/models/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setModel(data?.result || data);
//       });
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('clicked')

//     // form data collect
//     const form = e.target;
//     const updatedData = {
//       name: form.name.value,
//       category: form.category.value,
//       thumbnailUrl: form.thumbnailUrl.value,
//       description: form.description.value,
//       downloads: Number(form.downloads.value),
//     };
//     console.log(updatedData)

//     fetch(`http://localhost:3000/models/${id}`, {
//        method: "PUT",
//        headers: { "Content-Type": "application/json" },
//        body: JSON.stringify(updatedData),
//      })
//        .then((res) => res.json())
//        .then((data) => {
//          console.log(data);
//         toast(data.success ? "Model updated successfully!" : "Update failed!");
//        })
//        .catch((err) => {
//          console.error(err);
//          toast("Something went wrong!");
//        });
//   };




//   if (!model) return <Loading />;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-3xl font-bold mb-6 text-center">Update Model Info</h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

//         {/* Name */}
//         <div className="flex flex-col">
//           <label className="font-semibold mb-1">Model Name</label>
//           <input name="name" defaultValue={model.name} className="border rounded-lg p-3" type="text" />
//         </div>

//         {/* Category */}
//         <div className="flex flex-col">
//           <label className="font-semibold mb-1">Category</label>
//           <input name="category" defaultValue={model.category} className="border rounded-lg p-3" type="text" />
//         </div>

//         {/* Thumbnail URL */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="font-semibold mb-1">Thumbnail URL</label>
//           <input name="thumbnailUrl" defaultValue={model.thumbnailUrl} className="border rounded-lg p-3" type="text" />
//         </div>

//         {/* Description */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="font-semibold mb-1">Description</label>
//           <textarea name="description" defaultValue={model.description} className="border rounded-lg p-3" rows="4"></textarea>
//         </div>

//         {/* Downloads */}
//         <div className="flex flex-col">
//           <label className="font-semibold mb-1">Downloads</label>
//           <input name="downloads" defaultValue={model.downloads} className="border rounded-lg p-3" type="number" />
//         </div>

//         {/* Created By */}
//         <div className="flex flex-col">
//           <label className="font-semibold mb-1">Created By</label>
//           <input defaultValue={model.created_by} className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed" type="text" readOnly />
//         </div>

//         {/* Created At */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="font-semibold mb-1">Created At</label>
//           <input defaultValue={new Date(model.created_at).toLocaleDateString()} className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed" type="text" readOnly />
//         </div>

//         {/* Submit */}
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow transition md:col-span-2">
//           Update Model
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateCard;









import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

const UpdateCard = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const {user} =use(AuthContext)

  console.log("update er ager ",user.email)

  useEffect(() => {
    fetch(`http://localhost:3000/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data?.result || data);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");

    const form = e.target;

    const updatedData = {
      title: form.title.value,
      shortDescription: form.shortDescription.value,
      category: form.category.value,
      location: form.location.value,
      image: form.image.value,
      amount: parseFloat(form.amount.value),
      status: form.status.value,
      date: form.date.value,
      email: form.email.value, // read-only, but sent to backend
    };

    console.log(updatedData);

    fetch(`http://localhost:3000/models/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast(data.success ? "Issue updated successfully!" : "Update failed!");
      })
      .catch((err) => {
        console.error(err);
        toast("Something went wrong!");
      });
  };

  if (!issue) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Issue</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input
            name="title"
            defaultValue={issue.title}
            className="border rounded-lg p-3"
            type="text"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Category</label>
          <input
            name="category"
            defaultValue={issue.category}
            className="border rounded-lg p-3"
            type="text"
            required
          />
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Location</label>
          <input
            name="location"
            defaultValue={issue.location}
            className="border rounded-lg p-3"
            type="text"
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Status</label>
          <select
            name="status"
            defaultValue={issue.status}
            className="border rounded-lg p-3"
            required
          >
            <option value="pending">Pending</option>
            <option value="ongoing">Ongoing</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Image URL</label>
          <input
            name="image"
            defaultValue={issue.image}
            className="border rounded-lg p-3"
            type="text"
            required
          />
        </div>

        {/* Short Description */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Short Description</label>
          <textarea
            name="shortDescription"
            defaultValue={issue.shortDescription}
            className="border rounded-lg p-3"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Fix Budget (Amount)</label>
          <input
            name="amount"
            defaultValue={issue.amount}
            className="border rounded-lg p-3"
            type="number"
            required
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Date</label>
          <input
            name="date"
            defaultValue={issue.date}
            className="border rounded-lg p-3"
            type="date"
            required
          />
        </div>

        {/* Reporter Email (Read Only) */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Reporter Email</label>
          <input
            name="email"
            defaultValue={issue.email}
            className="border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            type="email"
            readOnly
          />
        </div>

        {/* Submit */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg shadow transition md:col-span-2"
          type="submit"
        >
          Update Issue
        </button>
      </form>
    </div>
  );
};

export default UpdateCard;
