import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';
import { updateSingleUser, selectUsers } from '../slices/users/userSlice';
import toast, { Toaster } from 'react-hot-toast';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector(selectAuth);

  const { user } = useSelector(selectUsers);
  const id = auth.id;
  const token = localStorage.getItem('token');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(attemptTokenLogin());

    return () => {
      dispatch(resetStatus());
    };
  }, [user]);

  useEffect(() => {
    setFirstName(auth.firstName || '');
    setLastName(auth.lastName || '');
    setEmail(auth.email || '');
  }, [auth]);

  const updateUser = (evt) => {
    evt.preventDefault();
    toast.success('Account info successfully changed');
    const updates = { firstName, lastName, email };
    dispatch(updateSingleUser({ id, token, updates }));
  };

  const goBack = () => {
    navigate('/account');
  };

  return (
    <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/wishlist_page.jpg')]">
      <div className="w-full max-w-sm absolute top-40 right-10 mr-20 pt-16">
        <p className="text-center text-4xl font-extrabold pb-2 text-primary-deep-green">
          Welcome Back,
        </p>
        <p className="text-center text-4xl font-extrabold">{auth.firstName}</p>
        <div className="flex flex-col mt-8 gap-3">
          <h2 className="text-center font-bold mt-3 mb-3">EDIT PROFILE</h2>
          <section className="flex gap-20 justify-center ">
            <form className="w-full max-w-lg" onSubmit={updateUser}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    value={firstName}
                    onChange={(evt) => setFirstName(evt.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    value={lastName}
                    onChange={(evt) => setLastName(evt.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="text"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-lg mx-auto block text-xl hover:transition-all mt-5"
                >
                  Save
                </button>
              </div>
              <div className="flex justify-center"></div>
            </form>
          </section>
          <button
            className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner py-1"
            onClick={goBack}
          >
            Back
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default EditProfile;
