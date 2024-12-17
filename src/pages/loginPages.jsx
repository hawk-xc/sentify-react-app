import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";

export default function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    // if (!loading && (user || token) && window.location.pathname === "/login") {
    //   navigate("/dashboard", { replace: true });
    // }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axiosClient.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const { token } = response.data;
        login(token);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message || "Login failed");
      document.getElementById("my_modal_3").showModal();
    }
  };

  return (
    <div className="flex flex-row flex-wrap items-center h-screen font-sans max-sm:w-screen justify-evenly bg-slate-100">
      <div className="flex justify-center align-middle bg-white shadow-2xl card">
        <div className="card-body">
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button
                  type="button"
                  className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  ✕
                </button>
              </form>
              <h3 className="text-2xl font-bold">😟 Login Error!</h3>
              <p className="py-4">🔒 {errorMessage}</p>
            </div>
          </dialog>

          <h2 className="mb-6 text-2xl font-bold card-title">Perceivo Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="flex items-center gap-2 input input-bordered">
                <span id="faceEmoji">😀</span>
                <input
                  type="email"
                  className="grow"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </label>
            </div>
            <div className="mt-4 form-control">
              <label className="flex items-center gap-2 input input-bordered">
                <span id="keyEmoji">🔑</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="z-50 border rounded-md btn-xs active:bg-slate-100"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>
            </div>
            <div className="mt-6 form-control">
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? (<span className="loading loading-dots loading-lg"></span>) : "Login"}
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p>Don't have an account?</p>
            <a href="#" className="link link-primary">
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
