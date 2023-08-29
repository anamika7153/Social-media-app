import React, {useContext, useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const Home = () => {

  const user = useSelector((state) => state.user);
  const username = user.username;

  return (
    <div>
      home
    </div>
  )
}

export default Home
