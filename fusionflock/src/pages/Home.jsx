import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  

  const user = useSelector((state) => state.user);
  const username = user.username;

  return (
    <div>
      Home
      {/* <form className="flex w-1/4 m-auto mt-12 items-center justify-center"
        action={`http://localhost:5000/api/posts/createpost`}
        method="POST"
        enctype="multipart/form-data"
      >
        <div className="flex flex-col gap-8 w-full items-start justify-center"> 
        <input type="text" name="caption" placeholder="caption" required />
        <input type="file" name="image" accept="image/*" required />
        <button className="border-solid bg-green-700 p-3 rounded" type="submit">Create Post</button>

        </div>
      </form> */}
    </div>
  );
};
export default Home;
