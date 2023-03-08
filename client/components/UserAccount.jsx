import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  logOut,
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth, status } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(attemptTokenLogin());

    return () => {
      dispatch(resetStatus());
    };
  }, []);

  const attemptLogOut = async () => {
    await dispatch(logOut());
    navigate('/');
  };

  if (status !== 'success') return <h1>Page Loading...</h1>;

  return (
    <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/wishlist_page.jpg')]">
      <div className="w-full max-w-sm absolute top-40 right-10 mr-20 pt-16">
        <p className="text-center text-4xl font-extrabold pb-2 text-primary-deep-green">
          Welcome Back,
        </p>
        <p className="text-center text-4xl font-extrabold">{auth.firstName}</p>
        <div className="flex flex-col mt-8 gap-3">
          <Link
            to={'/account/editprofile'}
            className="py-3 px-5 mr-2 mb-2 text-center text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Edit Profile
          </Link>
          {/* <Link
            to={'/account/updatepassword'}
            className="py-3 px-5 mr-2 mb-2 text-center text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Update Password
          </Link> */}
          <Link
            to={'/account/orderhistory'}
            className="py-3 px-5 mr-2 mb-2 text-center text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Order History
          </Link>
          <Link
            to={'/account/wishlist'}
            className="py-3 px-5 mr-2 mb-2 text-center text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
          >
            Wishlist
          </Link>
          {auth.isAdmin ? (
            <Link
              to={'/account/admin'}
              className="py-3 px-5 mr-2 mb-2 text-center text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100"
            >
              Admin Settings
            </Link>
          ) : (
            ''
          )}

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
