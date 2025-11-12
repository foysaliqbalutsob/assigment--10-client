import React, { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const ForgetEmailPage = () => {
  const { sendPasswordResetEmailFunc } = useContext(AuthContext);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    sendPasswordResetEmailFunc(email)
      .then(() => {
        toast("Password reset email sent!");
        window.location.href = "https://mail.google.com";
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address format.");
        } else if (error.code === "auth/missing-email") {
          toast.error("Please provide a valid email address.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(`Something went wrong: ${error.message}`);
        }
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Reset Your Password
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgetEmailPage;
