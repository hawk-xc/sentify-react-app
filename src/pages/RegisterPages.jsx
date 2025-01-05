import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function RegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [address, setAddress] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const RegisterHandler = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await axiosClient.post("/register", {
                username,
                fullname,
                address,
                email,
                password
            })

            if (response.status === 200) {
                const loginResponse = await axiosClient.post('/login', {
                    email,
                    password
                });

                if (loginResponse.status === 200) {
                    const { token } = loginResponse.data;
                    login(token);
                    setIsLoading(false);
                    navigate('/', { replace: true });
                }
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage(error.response?.data?.message || "Register failed");
            document.getElementById("my_modal_3").showModal();
            console.error(`error: ${error}`);
        }
    }

    return (
        <div className="flex flex-row flex-wrap items-center h-screen font-sans max-sm:w-screen justify-evenly bg-slate-100 max-sm:p-6">
            <div className="flex justify-center align-middle bg-white shadow-2xl card max-sm:w-full">
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
                            <h3 className="text-2xl font-bold">😟 Register Error!</h3>
                            <p className="py-4">🔒 {errorMessage}</p>
                        </div>
                    </dialog>

                    <h2 className="mb-6 text-2xl font-bold card-title">Perceivo Register</h2>
                    <form onSubmit={RegisterHandler} className='flex flex-col gap-4'>
                        <div className="form-control">
                            <label className="flex items-center gap-2 input input-bordered">
                                <span id="faceEmoji">👤</span>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="UserName"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="flex items-center gap-2 input input-bordered">
                                <span id="faceEmoji">😀</span>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Full Name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="flex items-center gap-2 input input-bordered">
                                <span id="faceEmoji">🗺️</span>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="flex items-center gap-2 input input-bordered">
                                <span id="faceEmoji">📧</span>
                                <input
                                    type="email"
                                    className="grow"
                                    placeholder="yourmail@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="flex items-center gap-2 input input-bordered">
                                <span id="keyEmoji">🔑</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="grow max-sm:w-40"
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
                        <div className='flex flex-row gap-2'>
                            <input type="checkbox" id="measurement" required />
                            <label htmlFor="measurement">I henerby that my information is true</label>
                        </div>
                        <div className="form-control">
                            <button className="btn btn-primary" type="submit" disabled={isLoading}>
                                {isLoading ? (<span className="loading loading-dots loading-lg"></span>) : "Register"}
                            </button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="text-center">
                        <p>Already have an account?</p>
                        <a href="/login" className="link link-primary">
                            Login now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}