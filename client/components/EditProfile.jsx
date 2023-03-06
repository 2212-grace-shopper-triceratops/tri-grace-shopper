import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';
import { updateSingleUser, selectUsers } from '../slices/users/userSlice';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector(selectAuth);

  const { user } = useSelector(selectUsers);
  console.log(auth.currencyId);

  const id = auth.id;
  const token = localStorage.getItem('token');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  // const [shipping, setShipping] = useState('');
  // const [payment, setPayment] = useState('');
  // const [currency, setCurrency] = useState('');

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
    setCurrencyId(auth.currencyId || '');
  }, [auth]);

  const updateUser = (evt) => {
    evt.preventDefault();
    const updates = { firstName, lastName, email };
    dispatch(updateSingleUser({ id, token, updates }));
  };

  const goBack = () => {
    navigate('/account');
  };

  return (
    <div className="bg-cover bg-center h-screen bg-[url('/assets/bg_img/user_acc_page.jpg')]">
      <div className="w-full max-w-sm absolute top-40 right-10 pt-16">
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
              {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-currency"
                  >
                    Default Currency
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-currency"
                    type="text"
                    value={currencyId}
                    onChange={(evt) => setCurrencyId(evt.target.value)}
                  />
                </div>
              </div> */}
              {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="password"
                    placeholder="**************"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                  />
                </div>
              </div> */}
              {/* <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-city"
                  >
                    City
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    placeholder="Albuquerque"
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    State
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option>New Mexico</option>
                      <option>Missouri</option>
                      <option>Texas</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                    htmlFor="grid-zip"
                  >
                    Zip
                  </label>
                  <input
                    className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    placeholder="90210"
                  />
                </div>
              </div> */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="hover:bg-primary-button-green w-full bg-primary-deep-green text-white py-2 rounded-lg mx-auto block text-xl hover:transition-all mt-5"
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
      </div>
    </div>
  );
};

export default EditProfile;
