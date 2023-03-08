import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn, attemptTokenLogin } from '../slices/users/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(
      logIn({
        email,
        password,
      })
    );

    dispatch(attemptTokenLogin());
    navigate('/');
  };

  const signup = () => {
    navigate('/signup');
  };

  const forgotPassword = () => {};

  return (
    <div className="bg-cover bg-center bg-[url('/assets/bg_img/login_signin_page.jpg')] h-[calc(100vh_-_5rem)]">
      <div className="w-full max-w-sm m-auto pt-16">
        <h2 className="text-center text-4xl font-bold">Log In</h2>
        <section className="flex flex-col gap-5 justify-center mt-16 ">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className=" appearance-none border rounded w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
                id="email"
                type="text"
                placeholder="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                name="email"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className=" appearance-none border rounded w-96 py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="************"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                name="password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-2xl mx-auto block text-xl hover:transition-all"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button
              onClick={forgotPassword}
              className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner py-3"
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={signup}
              className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner"
            >
              Don't have an account? Sign up!
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
