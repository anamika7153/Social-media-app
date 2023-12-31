import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import { setLogout } from "../../state";

const Avatar = () => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="relative group cursor-pointer">
      <img
        // src={user.photoURL ? user.photoURL : avatar}
        src={avatar}
        alt="profile pic"
        className="w-[40px] h-[40px] rounded-full object-cover"
        loading="lazy"
      />

      <div className="absolute top-15 right-[4px] hidden group-hover:block hover:block ease-in w-[160px]">
        <div className="py-2"></div>
        <ul className="text-gray-900 dark:text-dimWhite bg-gray-300 dark:bg-secondary px-3 py-4 rounded font-light text-sm">
          <Link to={`/api/users/${user.username}`}>
            <li className=" text-gray-900 hover:underline dark:text-dimWhite dark:hover:text-white px-4 py-2 rounded">
              Your Profile
            </li>
          </Link>
          <Link to="/favourite">
            <li className=" text-gray-900 hover:underline dark:text-dimWhite dark:hover:text-white px-4 py-2 rounded">
              Favourites
            </li>
          </Link>
          <hr className="border-primary my-2" />
          <li className="hover:bg-gray-200 dark:text-dimWhite dark:hover:bg-primary text-gray-900 dark:hover:text-white px-4 py-2 rounded">
            <button onClick={() => dispatch(setLogout())}>Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Avatar;
