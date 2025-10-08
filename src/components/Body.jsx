import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401){
        navigate("/login");
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!userData){
      fetchUser();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body