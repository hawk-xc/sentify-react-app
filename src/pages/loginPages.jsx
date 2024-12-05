// src/pages/Login.jsx
import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = (e) => {
    e.preventDefault(); // Mencegah form submit saat tombol diklik
    setShowPassword((prev) => !prev);
  };

  const closeModal = () => {
    document.getElementById("my_modal_3").close(); // Menutup modal dengan close()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/login", {
        email: email,
        password: password,
      });
      const { token, user } = response.data;
      login(token, user);
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message);
      setErrorMessage(error.response?.data?.message || "Login failed");
      // Open the modal on error
      document.getElementById("my_modal_3").showModal(); // Menampilkan modal error
    }
  };

  return (
    <div className="flex flex-row flex-wrap items-center h-screen font-sans max-sm:w-screen justify-evenly bg-slate-100">
      <div className="flex justify-center align-middle bg-white shadow-2xl card">
        <div className="card-body">
          {/* Modal DaisyUI */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button
                  type="button"
                  className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
              </form>
              <h3 className="text-2xl font-bold">😟Login Error!</h3>
              <p className="py-4">🔒{errorMessage}</p>
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
                  required
                />
                <button
                  onClick={handleClickShowPassword}
                  className="z-50 border rounded-md btn-xs active:bg-slate-100"
                  type="button"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="mt-6 form-control">
              <button className="btn btn-primary" type="submit">
                Login
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
