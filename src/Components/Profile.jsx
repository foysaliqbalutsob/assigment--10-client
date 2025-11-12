import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

import profile from "../assets/istockphoto-1495088043-612x612.jpg";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const auth = getAuth();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateName, setUpdateName] = useState(user?.displayName || "");
  const [updatePhotoURL, setUpdatePhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = () => {
    if (!updateName) {
      toast("Name field is empty!");
      return;
    }

    if (!auth.currentUser) {
      toast("No user logged in!");
      return;
    }

    updateProfile(auth.currentUser, {
      displayName: updateName,
      photoURL: updatePhotoURL,
    })
      .then(() => {
        auth.currentUser.reload().then(() => {
          setUpdateName(auth.currentUser.displayName);
          setUpdatePhotoURL(auth.currentUser.photoURL);
          toast("Profile updated successfully!");
          setIsUpdating(false);
        });
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  return (
    <div className="mx-auto p-8 bg-white rounded-xl shadow-md mt-10">
      <div>
        <h1 className="text-3xl font-bold text-center mb-6">My Profile</h1>
      </div>

      <div className="flex flex-col items-center gap-4">
        <img
          src={updatePhotoURL || profile}
          alt="Profile"
          className="w-33 h-32 rounded-full object-cover border-3 border-sky-500"
        />

        {isUpdating ? (
          <input
            type="text"
            placeholder="Name"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            className="input w-full max-w-xs text-center"
          />
        ) : (
          <h2 className="text-xl font-semibold">{updateName || "User"}</h2>
        )}

        {isUpdating ? (
          <input
            type="text"
            value={updatePhotoURL}
            placeholder="Photo URL"
            onChange={(e) => setUpdatePhotoURL(e.target.value)}
            className="input input-bordered w-full max-w-xs text-center"
          />
        ) : null}

        <p className="text-gray-600">{user?.email || "No Email"}</p>

        {isUpdating ? (
          <div className="flex gap-4">
            <button onClick={handleUpdate} className="btn btn-primary">
              Save
            </button>
            <button
              onClick={() => setIsUpdating(false)}
              className="btn btn-secondary"
            >
              Return
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsUpdating(true)}
            className="btn btn-primary mt-4"
          >
            Update Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
