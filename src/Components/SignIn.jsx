import { GithubAuthProvider } from "firebase/auth";
import React, { useContext, useRef, useState } from "react";

import { toast } from "react-toastify";

import { GoogleAuthProvider } from "firebase/auth";
import { FaEye, FaEyeSlash, FaGit, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import Loading from "./Loading";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const SignIn = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    signInWithEmailAndPasswordFun,
    signInWithGithubPopupFun,
    signInWithGooglePopupFun,

    sendPasswordResetEmailFunc,
    user,
    setUser,
  } = useContext(AuthContext);

  const handlePasswordShow = (e) => {
    e.preventDefault();
    console.log("eye button clicked");
    setShow(!show);
  };
  // const [emailStored, setEmail] = useState(null)
  // console.log(emailStored)

  const emailRef = useRef(null);

  // console.log(user);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log("signIn click", email, password);

    signInWithEmailAndPasswordFun(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          toast("your email is not verified");
          return;
        }

        toast("log in successfull");
        // console.log(result);
        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  // const handleLogOut = () => {
  //   signOutFunc()
  //     .then(() => {
  //       toast("Logged out successfully!");
  //       setUser(null);
  //     })
  //     .catch((error) => {
  //       toast(error.message);
  //     });
  // };

  const handleSignInWithGoogle = () => {
    signInWithGooglePopupFun(googleProvider)
      .then((result) => {
        // console.log(result);

        toast("log in successfull");

        setUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const handleSignInWithGithub = () => {
    signInWithGithubPopupFun(githubProvider)
      .then((result) => {
        // console.log(result);
        toast("log in successfull");

        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        navigate(from, { replace: true });
      });
  };

  // handle   Forget   Password
  const handleForgetPassword = () => {
    // console.log("clicked");
    // window.location.href = "https://mail.google.com";

    // console.log(emailRef.current.value);
    const email = emailRef.current.value;
    navigate("/forget-password");
    // sendPasswordResetEmailFunc(email)
    //   .then(() => {
    //     toast("Password reset email sent!");
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message
    //     // console.log(errorMessage, errorCode);

    //     if (error.code === "auth/user-not-found") {
    //       toast.error(" No account found with this email.");
    //     } else if (error.code === "auth/invalid-email") {
    //       toast.error(" Invalid email address format.");
    //     } else if (error.code === "auth/missing-email") {
    //       toast.error("Please provide a valid email address.");
    //     } else if (error.code === "auth/network-request-failed") {
    //       toast.error(" Network error. Please check your connection.");
    //     } else {
    //       toast.error(`Something went wrong: ${error.message}`);
    //     }
    //   });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
          Sign in to track your reported issues and see the impact you're making. <br />
Every report counts! Let's fix the city, one issue at a time. <br />

Join thousands of citizens improving their neighborhoods daily.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              {user ? (
                <Loading></Loading>
              ) : (
                <div>
                  <form onSubmit={handleLogIn}>
                    <fieldset className="fieldset">
                      {/* for email */}
                      <label className="label">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="input"
                        // onChange={(e) =>setEmail(e.target.value)}

                        ref={emailRef}
                        placeholder="Email"
                      />

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
                        <button
                          type="button"
                          onClick={handleForgetPassword}
                          className="link link-hover underline text-blue-600 cursor-pointer"
                        >
                          Forgot password?
                        </button>
                        <p>
                          Have'nt an account ?{" "}
                          <Link
                            to={"/signup"}
                            className="text-blue-500 underline"
                          >
                            Sign Up!{" "}
                          </Link>
                        </p>
                      </div>
                      <button type="submit" className="btn btn-neutral mt-4">
                        Login
                      </button>
                    </fieldset>
                  </form>
                  <div>
                    <button
                      onClick={handleSignInWithGoogle}
                      className="btn btn-accent w-full mt-4"
                    >
                      {" "}
                      <FaGoogle />
                      Sign in with google
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={handleSignInWithGithub}
                      className="btn btn-accent w-full mt-4"
                    >
                      {" "}
                      <FaGithub />
                      Sign in with Github
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
