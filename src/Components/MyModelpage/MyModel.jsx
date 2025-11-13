import React, { useEffect, useState, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyModel = () => {
  const [models, setModels] = useState([]);
  const { user } = React.useContext(AuthContext);
  const [selectedModel, setSelectedModel] = useState(null);
  const handleModalRef = useRef(null);

  // Fetch user's models
  useEffect(() => {
    if (!user?.accessToken) return;

    fetch("http://localhost:3000/my-models", {
      headers: { authorization: `Bearer ${user.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setModels(data.result);
      })
      .catch((err) => console.error(err));
  }, [user?.accessToken]);

  // Delete a model
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/models/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Issue deleted.", "success");
              setModels(models.filter((m) => m._id !== id));
            }
          });
      }
    });
  };

  // Open modal for contribution
  const handleOpenModal = (model) => {
    setSelectedModel(model);
    handleModalRef.current.showModal();
  };

  // Submit contribution
  const handleContributionSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!selectedModel) return;

    const contribution = {
      issueId: selectedModel._id,
      issueTitle: selectedModel.title,
      contributorName: form.name.value,
      image: user.photoURL,
      email: user.email,
      phone: form.phone.value,
      address: form.address.value,
      amount: parseFloat(form.amount.value),
      date: new Date(),
      info: form.info.value,
    };

    fetch("http://localhost:3000/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contribution),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Thank you! Your contribution has been recorded.");
          form.reset();
          handleModalRef.current.close();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Issues</h2>

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Location</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m) => (
            <tr key={m._id}>
              <td className="border px-2 py-1">{m.title}</td>
              <td className="border px-2 py-1">{m.category}</td>
              <td className="border px-2 py-1">{m.location}</td>
              <td className="border px-2 py-1">${m.amount}</td>
              <td className="border px-2 py-1">{m.status}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleOpenModal(m)}
                  className="bg-yellow-500 px-2 py-1 rounded text-white"
                >
                  Contribute
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="bg-red-600 px-2 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Contribution Modal */}
      <dialog ref={handleModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Pay Clean-Up Contribution</h3>
          {selectedModel && (
            <form onSubmit={handleContributionSubmit} className="space-y-3">
              <input
                type="text"
                value={selectedModel.title}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="amount"
                placeholder="Contribution Amount"
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="input input-bordered w-full"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <textarea
                name="info"
                placeholder="Additional Info"
                className="textarea textarea-bordered w-full"
              ></textarea>
              <p className="text-gray-500">
                Date: {new Date().toLocaleDateString()}
              </p>
              <button
                type="submit"
                className="btn btn-success w-full mt-3"
              >
                Submit Contribution
              </button>
            </form>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyModel;
