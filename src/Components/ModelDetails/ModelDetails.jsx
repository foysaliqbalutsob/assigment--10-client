import React, { use, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { BsDownload } from "react-icons/bs";
import Swal from "sweetalert2";
import Loading from "../Loading";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import UpdateCard from "../Update/UpdateCard";
import Contribution from "../ContributionTableAndChart/Contribution";

const ModelDetails = () => {
  const [model, setModel] = useState(null);
  const { user } = use(AuthContext);
  const handleModalRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(model, id);

  useEffect(() => {
    if (!user) return;

    fetch(`https://my-cocerptual-session-server.vercel.app/models/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setModel(data.result))
      .catch((err) => console.error(err));
  }, [id, user]);

  if (!model) {
    return <Loading></Loading>;
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-cocerptual-session-server.vercel.app/models/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.success) {
              Swal.fire("Deleted!", "Model has been deleted.", "success");
              navigate("/");
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
    fetch("https://my-cocerptual-session-server.vercel.app/downloads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelId: model._id,
        modelName: model.title,
        downloadedBy: user.email,
        createdBy: model.email,
        thumbnailUrl: model.image,
        downloadedAt: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Download successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error!");
      });
  };

  const handleContributionSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const contribution = {
      issueId: model._id,
      issueTitle: model.title,
      contributorName: form.name.value,
      image: user.photoURL,
      email: user.email,
      phone: form.phone.value,
      address: form.address.value,
      amount: parseFloat(form.amount.value),
      date: new Date(),
      info: form.info.value,
    };

    fetch("https://my-cocerptual-session-server.vercel.app/contributions", {
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

  const HandleOpenModal = () => {
    handleModalRef.current.showModal();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border">
        <div className="relative">
          <img
            src={model.image}
            alt={model.title}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {model.category}
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {model.title}
            </h2>

            <p className="text-gray-700 mb-4">{model.shortDescription}</p>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium"> Location:</span> {model.location}
              </p>
              <p>
                <span className="font-medium"> Date:</span>{" "}
                {new Date(model.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium"> Suggested Fix Budget:</span>{" "}
                <span className="font-semibold text-green-700">
                  ${model.amount}
                </span>
              </p>
              <p>
                <span className="font-medium">Reported By:</span> {model.email}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    model.status === "ongoing"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {model.status}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {/* <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md flex items-center gap-2"
            >
              <BsDownload size={20} /> Download
            </button> */}

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md"
              onClick={HandleOpenModal}
            >
              {" "}
              Pay Clean-Up Contribution
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog
          ref={handleModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Pay Clean-Up Contribution
            </h3>
            <form onSubmit={handleContributionSubmit} className="space-y-3">
              <input
                type="text"
                value={model.title}
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

              <button type="submit" className="btn btn-success w-full mt-3">
                Submit Contribution
              </button>
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <Contribution key={id} model={model}></Contribution>
    </div>
  );
};

export default ModelDetails;
