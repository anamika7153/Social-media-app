import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../assets/avatar.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [data, setDate] = useState({
    username: user?.username,
    fullName: user?.fullName,
    email: user?.email,
    // password: user?.password,
    password: "",
  });

  return (
    <>
      <section
        style={{ height: "calc(100vh - 90px)", overflow: "hidden" }}
        className="w-full bg-gray-100 dark:bg-gray-900"
      >
        <div className="min-h-full flex  mx-auto items-center justify-end">
          <div className="flex flex-col p-6 items-center justify-center bg-white text-black dark:text-dimWhite dark:bg-gray-500 shadow-md rounded-md h-1/2 w-1/3  mx-auto">
            <div className="w-[150px] h-[150px] flex items-center">
              <img
                src={avatar}
                alt="profile pic"
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="mt-8">{data.username}</h3>
            <h3 className="mt-2">{data.fullName}</h3>
            <h3 className="mt-2">{data.email}</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
