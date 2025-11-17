import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading";
import { toast } from "react-toastify";

const AddIssue = () => {
  const { user } = useContext(AuthContext);

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

    const newIssue = {
      title: form.title.value,
      category: form.category.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: new Date(),
      amount: parseFloat(form.amount.value),
      email: user.email, // Reporter email
      status: "ongoing", // Default status
    };

    fetch("https://my-cocerptual-session-server.vercel.app/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIssue),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);
        toast.success("New issue reported successfully!");
        form.reset();
      })
      .catch((e) => console.log(e));

    // console.log("New Issue:", newIssue);
  };

  return (
    <div className="max-w-md text-[#FFD700] mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-5 text-center">Report New Issue</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label className="font-semibold">Title</label>
        <input
          type="text"
          name="title"
          required
          className="input input-bordered w-full mb-3"
          placeholder="Enter issue title"
        />

        {/* Reporter Email (Read Only) */}
        <label className="font-semibold">Reporter Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          readOnly
          className="input input-bordered w-full mb-5 bg-gray-100 text-gray-600 cursor-not-allowed"
        />

        {/* Category Dropdown */}
        <label className="font-semibold">Category</label>
        <select
          name="category"
          required
          className="input input-bordered w-full mb-3"
        >
          <option value="">Select Category</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Broken Light">Broken Light</option>
          <option value="Garbage Overflow">Garbage Overflow</option>
          <option value="Public Space Issue">Public Space Issue</option>
        </select>

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

export default AddIssue;

