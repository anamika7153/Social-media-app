import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const API_URL = "http://localhost:5000/api"; // Update with your backend URL

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const userToken = useSelector((state) => state.token);

  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", image);

      const response = await axios.post(
        `${API_URL}/posts/createpost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + userToken,
          },
        }
      );

      if (response.statusText === "Created") {
        console.log("Post created successfully!");
        navigate("/");

      }
      setCaption("");
      setImage(null);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response);
      } else {
        console.error("Error during signin:", error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-5 p-5">
      <h1 className="text-3xl font-semibold mb-3">Create Post</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="caption" className="block text-gray-600">
            Caption
          </label>
          <textarea
            id="caption"
            name="caption"
            rows="4"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
