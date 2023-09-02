import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import avatar from "../assets/avatar.png";

import { setLogin } from "../state";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  //   const API_URL = process.env.API_URL
  const API_URL = "http://localhost:5000/api"; // Update with your backend URL

  const [data, setData] = useState({
    username: user?.username,
    fullName: user?.fullName,
    email: user?.email,
    // password: user?.password,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setData((prevData) => ({ ...prevData, [name]: value }));
    if (name !== "password") {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/users/${user.username}/${user._id}/update`,
        data
      );
      // console.log("response",response)
      // console.log("response.data",response.data)
      // console.log("response.data.user",response.data.user)
      if (response.statusText === "OK") {
        dispatch(
          setLogin({
            user: response.data.targetUser,
          })
        );
      }
      console.log("Profile updated:", response.data); // Replace with your desired action
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      <section
        style={{ height: "calc(100vh - 90px)", overflow: "hidden" }}
        className="w-full bg-gray-100 dark:bg-gray-900"
      >
        <div className="min-h-full flex  mx-auto items-center justify-end">
          <div className="flex flex-col p-6 items-center justify-center bg-white text-black dark:text-dimWhite dark:bg-gray-500 shadow-md rounded-md h-1/2 w-1/3  mx-auto">
            <h2 className="my-4">Update Profile</h2>
            <div className="w-[150px] h-[150px] flex items-center">
              <img
                src={avatar}
                alt="profile pic"
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              value={data.username}
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="fullName" className="">
              Full Name
            </label>
            <input
              value={data.fullName}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Username"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              value={data.email}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {/* <h3 className="mt-8">{data.username}</h3>
            <h3 className="mt-2">{data.fullName}</h3>
            <h3 className="mt-2">{data.email}</h3> */}
            <button
              className="text-black rounded focus:outline-none"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
