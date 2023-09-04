import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const Home = () => {
  

  const user = useSelector((state) => state.user);
  const username = user.username;

  return (
    <div>
      Home
      <form
        action="/api/users/posts"
        method="POST"
        enctype="multipart/form-data"
      >
        <input type="text" name="caption" placeholder="caption" required />
        {/* <textarea name="content" placeholder="Content" required></textarea> */}
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default Home;
