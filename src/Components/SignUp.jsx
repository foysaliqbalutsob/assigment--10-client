// sign out vule sigbn in likhchi

import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    setLoading,
    signOutFunc,
    setUser,
  } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsChecked = e.target.terms.checked;
    const displayName = e.target.name.value;
    const photoURL = e.target.photoUrl.value;
    // console.log({ displayName, password, termsChecked, photoURL, email });

    // Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password Regex: min 8 chars, uppercase, lowercase, number, special char
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Email is not valid!");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 chars, include uppercase, lowercase, number, and special character!"
      );
      return;
    }

    if (!termsChecked) {
      toast.error("You must accept the terms and conditions!");
      return;
    }

    // console.log("sign Un", { email, password });
    createUserWithEmailAndPasswordFunc(email, password)
      .then((result) => {
        toast("sign up sucessfull");
        // console.log(result);
        setLoading(false);

        // verify er jonno function take call korlam

        // sendEmailVerification(auth.currentUser)
        //   .then((result) => {
        //     toast('mail sent')

        //   })

        signOutFunc()
          .then(() => {
            setUser(null);
            navigate("/");
          })

          .catch((error) => {
            toast(error.code);
          });

        //profile  update korlam

        updateProfileFunc(displayName, photoURL)
          .then(() => {
            toast.success("Profile updated successfully!");
          })
          .catch((error) => {
            toast.error("Profile update failed: ", error.message);
          });
      })
      .catch((error) => {
        // console.log(error.message);
        toast(error.message);
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already in use. Try logging in instead.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address format.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password too weak. Try a stronger one.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error(
            "Email/password sign-up is disabled in Firebase settings."
          );
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };

  const handlePasswordShow = (e) => {
    e.preventDefault();
    // console.log("eye button clicked");
    setShow(!show);
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">
              Register now to report issues, track progress, and help build an ideal city. <br />

Connect with a community of active citizens who care about their neighborhoods. <br />

Every contribution, big or small, matters for a cleaner, safer city. <br />
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  {/* for name */}
                  <label className="label">Name</label>
                  <input
                    name="name"
                    type="name"
                    className="input"
                    placeholder="name"
                  />

                  {/* for email */}
                  <label className="label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input"
                    placeholder="Email"
                  />

                  {/* for photoUrl*/}

                  <label className="label">Photo Url</label>
                  <input
                    name="photoUrl"
                    type="text"
                    className="input"
                    placeholder="Photo URL"
                  />
                  {/* password */}

                  <div className="relative ">
                    <label className="label">Password</label>
                    <input
                      name="password"
                      type={show ? "text" : "password"}
                      className="input"
                      placeholder="Password"
                    />
                    <button
                      onClick={handlePasswordShow}
                      className="btn absolute bottom-1.5  btn-xs right-5"
                    >
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div>
                    <label className="label mt-4 cursor-pointer flex items-center gap-2">
                      <input
                        name="terms"
                        type="checkbox"
                        className="checkbox"
                      />
                      I accept the{" "}
                      <span className="text-blue-600 underline">
                        Terms and Conditions
                      </span>
                    </label>
                  </div>
                  <div>
                    <p>
                      Already Have an account ?{" "}
                      <Link className="text-blue-700 underline" to={"/signin"}>
                        log in
                      </Link>{" "}
                    </p>
                  </div>
                  <button className="btn btn-neutral mt-4">Sign Up</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
