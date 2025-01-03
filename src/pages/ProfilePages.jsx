import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const ProfilePages = ({ setPage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState([]);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get("/profile");
            const data = response.data.data;

            setProfile(data[0]);
            setUsername(data[0].username);
            setName(data[0].name);
            setAddress(data[0].address);
        } catch (error) {
            console.error(`error : ${error}`);
        }
        setIsLoading(false);
    }

    const resetValueProfile = () => {
        setUsername(profile.username);
        setName(profile.name);
        setAddress(profile.address);
    }

    const updateProfile = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.put("/profile", {
                username: username,
                fullname: name,
                address: address
            });

            setIsUpdated(false);
            fetchProfile();
            
        } catch (error) {
            console.error(`error : ${error}`);
        }
        setIsLoading(false);
    }

    const changeUsername = (e) => {
        const username = e.target.value;
        setIsUpdated(true);
        setUsername(username);
    }

    const changeName = (e) => {
        const name = e.target.value;
        setIsUpdated(true);
        setName(name);
    }

    const changeAddress = (e) => {
        const address = e.target.value;
        setIsUpdated(true);
        setAddress(address);
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="p-5 bg-white rounded-lg shadow-lg m-5">
            <div className="flex flex-row justify-between w-full items-center align-middle mb-3">
                <button
                    onClick={() => setPage('dashboard')}
                    className="mb-3 md:bg-gray-200 md:btn md:hover:bg-gray-300"
                >
                    <span className="max-sm:hidden"><i className="ri-arrow-left-s-line"></i> Back to Dashboard</span>
                    <i className="ri-arrow-left-line text-2xl opacity-80 md:hidden"></i>
                </button>
                <span className="text-xl">Profile Pages</span>
                <button
                    onClick={() => setPage('dashboard')}
                    className="mb-3 bg-gray-200 btn hover:bg-gray-300 opacity-0"
                >
                    <span className="max-sm:hidden"><i className="ri-arrow-left-s-line"></i> Back to Dashboard</span>
                </button>
            </div>
            <div className="flex flex-col rounded-lg shadow-sm p-5 w-full gap-3">
                <div className="flex flex-col">
                    {username && (<span className="label-text text-lg mb-1">Username</span>)}
                    <input type="text" placeholder="Username..." className="input input-bordered w-full" value={username} onChange={(e) => changeUsername(e)} />
                    {username.length === 0 && (<span className="label-text-alt text-red-500">Username cannot be blank!</span>)}
                </div>
                <div className="flex flex-col">
                    {name && (<span className="label-text text-lg mb-1">Name</span>)}
                    <input type="text" placeholder="Name..." className="input input-bordered w-full" value={name} onChange={(e) => changeName(e)} />
                    {name.length === 0 && (<span className="label-text-alt text-red-500">Name cannot be blank!</span>)}
                </div>
                <div className="flex flex-col">
                    {address && (<span className="label-text text-lg mb-1">Address</span>)}
                    <input type="text" placeholder="Name..." className="input input-bordered w-full" value={address} onChange={(e) => changeAddress(e)} />
                    {address.length === 0 && (<span className="label-text-alt text-red-500">Address cannot be blank!</span>)}
                </div>
                {profile.username !== username || profile.name !== name || profile.address !== address ? isUpdated && (
                    <div className="flex flex-row justify-start gap-3 mt-5">
                        <button className="btn" onClick={() => {
                            username.length > 0 && name.length > 0 && address.length > 0 && updateProfile();
                        }}>
                            {isLoading ? (
                                <span className="flex justify-center align-middle items-center flex-row gap-2">
                                    <span className="loading loading-spinner loading-sm"></span> Saving!
                                </span>
                            ) : (
                                <span>
                                <i className="ri-check-line"></i> Save
                                </span>
                            )}
                        </button>
                        <button className="btn" onClick={() => resetValueProfile()}>
                            <i className="ri-reset-left-line"></i> Reset
                        </button>
                    </div>
                ) : ''}
            </div>
        </div>
    );
}

export default ProfilePages;