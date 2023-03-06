import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  logOut,
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';
// import {
//   fetchSingleUser,
//   selectUsers,
//   resetStatus,
// } from '../slices/users/userSlice';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, status } = useSelector(selectAuth);
  // const { user } = useSelector(selectUsers);
  // const id = auth.id;
  // const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(attemptTokenLogin());

    return () => {
      dispatch(resetStatus());
    };
  }, []);

  // useEffect(() => {
  //   dispatch(fetchSingleUser({ id, token }));
  // }, [auth]);

  const editProfile = async () => {
    navigate('/account/editprofile');
  };

  const wishlist = async () => {
    navigate('/account/wishlist');
  };

  const orderHistory = () => {
    navigate('/account/orderhistory');
  };

  const updatePassword = () => {
    navigate('/account/updatepassword');
  };

  const attemptLogOut = async () => {
    await dispatch(logOut());
    navigate('/login');
  };

  if (status !== 'success') return <h1>Page Loading...</h1>;

  return (
    <div className="bg-cover bg-center h-screen bg-[url('/assets/bg_img/user_acc_page.jpg')]">
      <div className="w-full max-w-sm absolute top-40 right-10 pt-16">
        <p className="text-center text-4xl font-extrabold pb-2 text-primary-deep-green">
          Welcome Back,
        </p>
        <p className="text-center text-4xl font-extrabold">{auth.firstName}</p>
        <div className="flex flex-col mt-8 gap-3">
          <button
            onClick={editProfile}
            className="py-3 px-5 mr-2 mb-2 text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Edit Profile
          </button>
          <button
            onClick={updatePassword}
            className="py-3 px-5 mr-2 mb-2 text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Update Password
          </button>
          <button
            onClick={wishlist}
            className="py-3 px-5 mr-2 mb-2 text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Wishlist
          </button>
          <button
            onClick={orderHistory}
            className="py-3 px-5 mr-2 mb-2 text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Order History
          </button>
          <button
            onClick={attemptLogOut}
            className="text-primary-deep-green hover:text-primary-promo-banner pb-16 text-sm"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
