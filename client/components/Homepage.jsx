import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginMessage,
  resetStatus,
  selectLogoutMessage,
} from '../slices/users/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PromoBanner from './UI/PromoBanner.jsx';

export default function Homepage() {
  const dispatch = useDispatch();
  const showLoginMessage = useSelector(selectLoginMessage);
  const showLogoutMessage = useSelector(selectLogoutMessage);
  useEffect(() => {
    if (showLoginMessage === true) {
      const loginToast = toast.success('Logged in!');
    } else {
      if (showLogoutMessage === true) toast.success('Logged out!');
    }
    setTimeout(() => {
      dispatch(resetStatus());
      toast.dismiss();
    }, 2000);
    return () => dispatch(resetStatus());
  }, []);

  return (
    <>
      <PromoBanner />
      <div className="mx-auto h-[calc(100vh_-_5rem)] w-full bg-[url('/assets/bg_img/testing.jpg')] bg-cover bg-center bg-no-repeat lg:bg-[url('/assets/bg_img/homepage13.jpg')] lg:bg-right">
        <div className="absolute top-36 left-1/2 min-w-[500px] -translate-x-1/2 flex-col gap-5 text-center text-4xl tracking-wide sm:text-[3.5rem] md:bottom-auto lg:top-96 lg:left-36 lg:translate-x-0 lg:text-left">
          <div className="mb-4 w-full">
            <p className="mb-2 leading-none">Your perfect plant,</p>
            <p className="">one click away</p>
          </div>
          <div className="mb-16 flex flex-col text-xl sm:text-2xl">
            <p>Transform your space.</p>
            <p>No green thumb needed</p>
          </div>
          <Link to="/products">
            <button className="w-full max-w-xs rounded-xl bg-primary-deep-green py-2 text-xl text-white">
              Shop Now
            </button>
          </Link>
        </div>
        {/* <div className="flex absolute top-[35rem] text-2xl left-48"> */}
        {/* </div> */}
        <Toaster />
      </div>
    </>
  );
}
