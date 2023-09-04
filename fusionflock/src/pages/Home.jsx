import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import firebase from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();

const Home = () => {
  // Function to upload an image
  function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    const file = fileInput.files[0];

    // Create a reference to the Firebase Storage location where you want to store the image
    const storageRef = ref(storage, "images/" + file.name);

    // Upload the image
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Image uploaded successfully!");
        // You can retrieve the image URL here and save it to your database
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }

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
