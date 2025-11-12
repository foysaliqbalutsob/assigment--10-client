// import React, { useContext } from "react";
// import { AuthContext } from "../../Context/AuthContext";
// import Loading from "../Loading";
// import { toast } from "react-toastify";

// const AddModel = () => {
//     const { user } = useContext(AuthContext);
//     console.log(user)



//     if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loading></Loading>
//       </div>
//     );
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const newModel = {
//       name: form.name.value,
//       category: form.category.value,
//       description: form.description.value,
//       thumbnailUrl: form.thumbnailUrl.value,
//       created_by: form.created_by.value,
//       downloads: 0,
//       created_at: new Date().toISOString(),
//     };

//  fetch('http://localhost:3000/models',{
//     method:'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newModel)
// })
// .then(res => res.json()) // 
// .then(result => {
//     console.log(result.message);
//     toast(' new model add')
// })
// .catch(e => console.log(e))









//     console.log("New Model:", newModel);
//     console.log("Submitted ");
//   };

//   return (



//     <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
//       <h2 className="text-2xl font-bold mb-5 text-center">Add New 3D Model</h2>

//       <form onSubmit={handleSubmit}>
        
//         {/* Model Name */}
//         <label className="font-semibold">Model Name</label>
//         <input defaultValue={user?.displayName}
//           type="text"
//           name="name"
 
//           required
//           className="input input-bordered w-full mb-3"
//           placeholder="Enter model name"
//         />

//         {/* Category */}
//         <label className="font-semibold">Category</label>
//         <input
//           type="text"
//           name="category"
//           required
//           className="input input-bordered w-full mb-3"
//           placeholder="E.g. Vehicles, Nature, Characters"
//         />

//         {/* Created_by Email */}
//         <label className="font-semibold">Artist Email</label>
//         <input defaultValue={user?.email}
//           type="email"
//           name="created_by"
//           required
//           className="input input-bordered w-full mb-3"
//           placeholder="Enter your email"
//         />

//         {/* Description */}
//         <label className="font-semibold">Description</label>
//         <textarea
//           name="description"
//           required
//           className="textarea textarea-bordered w-full mb-3"
//           placeholder="Enter model description"
//         ></textarea>

//         {/* Thumbnail URL */}
//         <label className="font-semibold">Thumbnail URL</label>
//         <input
//           type="text"
//           name="thumbnailUrl"
//           required
//           className="input input-bordered w-full mb-5"
//           placeholder="Enter image URL"
//         />

//         {/* Submit Button */}
//         <button className="btn btn-primary w-full" type="submit">
//           Submit
//         </button>

//       </form>
//     </div>
//   );
// };

// export default AddModel;




import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading";
import { toast } from "react-toastify";

const AddModel = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newModel = {
      title: form.title.value,
      category: form.category.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      amount: parseFloat(form.amount.value),
      email: form.email.value,

    };

    fetch("http://localhost:3000/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModel),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
        toast("New model added successfully!");
        form.reset();
      })
      .catch((e) => console.log(e));

    console.log("New Model:", newModel);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-5 text-center">Add New Report</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label className="font-semibold">Title</label>
        <input
          type="text"
          name="title"
          required
          className="input input-bordered w-full mb-3"
          placeholder="Enter report title"
        />

          {/* ✅ Email (Read Only) */}
        <label className="font-semibold">Reporter Email</label>
        <input
          type="email"
          name="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full mb-5 bg-gray-100 text-gray-600 cursor-not-allowed"
        />

        {/* Category */}
        <label className="font-semibold">Category</label>
        <input
          type="text"
          name="category"
          required
          className="input input-bordered w-full mb-3"
          placeholder="E.g. Road Damage, Broken Light"
        />

        {/* Location */}
        <label className="font-semibold">Location</label>
        <input
          type="text"
          name="location"
          required
          className="input input-bordered w-full mb-3"
          placeholder="Enter location"
        />

        {/* Description */}
        <label className="font-semibold">Description</label>
        <textarea
          name="description"
          required
          className="textarea textarea-bordered w-full mb-3"
          placeholder="Enter description"
        ></textarea>

        {/* Image URL */}
        <label className="font-semibold">Image URL</label>
        <input
          type="text"
          name="image"
          required
          className="input input-bordered w-full mb-3"
          placeholder="Enter image URL"
        />

        {/* Date */}
        <label className="font-semibold">Date</label>
        <input
          type="date"
          name="date"
          required
          className="input input-bordered w-full mb-3"
        />

        {/* Amount */}
        <label className="font-semibold">Suggested Fix Budget (Amount)</label>
        <input
          type="number"
          name="amount"
          required
          className="input input-bordered w-full mb-5"
          placeholder="Enter amount in BDT"
        />

        {/* Submit Button */}
        <button className="btn btn-primary w-full" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddModel;
