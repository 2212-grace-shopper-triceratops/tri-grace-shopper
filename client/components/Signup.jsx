import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../slices/users/authSlice';
import { attemptTokenLogin } from '../slices/users/authSlice';
import { selectAuth } from '../slices/users/authSlice';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
  const [isInvalidLastName, setIsInvalidLastName] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    imageURL: '',
    password: '',
  });

  const validClass =
    'appearance-none border rounded w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const invalidClass =
    'appearance-none border border-red-500 rounded w-96 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline';

  const token = window.localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(attemptTokenLogin());
      navigate('/products');
    }
  }, [token, isInvalid]);

  const validateEmail = (email) => {
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  };

  const checkFormValidation = () => {
    if (formData.firstName === '') {
      setIsInvalidFirstName(true);
      setIsInvalid(true);
    }
    if (formData.lastName === '') {
      setIsInvalidLastName(true);
      setIsInvalid(true);
    }

    if (formData.email === '') {
      setIsInvalidEmail(true);
      setIsInvalid(true);
    }

    if (!validateEmail(formData.email)) {
      setIsInvalidEmail(true);
      setIsInvalid(true);
    }

    if (formData.password === '' || formData.password.length < 8) {
      setIsInvalidPassword(true);
      setIsInvalid(true);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    checkFormValidation();
    if (!isInvalid) dispatch(signUp(formData));
  };

  return (
    <div className="bg-cover bg-center bg-[url('/assets/bg_img/login_signin_page.jpg')] h-[calc(100vh_-_5rem)]">
      <div className="w-full max-w-sm m-auto pt-16">
        <h2 className="text-center text-4xl font-bold">Sign Up</h2>
        <section className="flex flex-col gap-10 justify-center mt-16 ">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className={isInvalidFirstName ? invalidClass : validClass}
                id="firstName"
                type="text"
                placeholder="first name"
                value={formData.firstName}
                name="firstName"
                onChange={(e) => {
                  setIsInvalidFirstName(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, firstName: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidFirstName
                    ? 'text-xs mt-2 text-red-500'
                    : 'collapse -mt-2'
                }
              >
                Please enter your first name!
              </p>
            </div>

            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className={isInvalidLastName ? invalidClass : validClass}
                id="lastName"
                type="text"
                placeholder="last name"
                value={formData.lastName}
                name="lastName"
                onChange={(e) => {
                  setIsInvalidLastName(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, lastName: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidLastName
                    ? 'text-xs mt-2 text-red-500'
                    : 'collapse -mt-2'
                }
              >
                Please enter your last name!
              </p>
            </div>

            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={isInvalidEmail ? invalidClass : validClass}
                id="email"
                placeholder="email"
                value={formData.email}
                name="email"
                onChange={(e) => {
                  setIsInvalidEmail(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidEmail
                    ? 'text-xs mt-2 text-red-500'
                    : 'collapse -mt-2'
                }
              >
                Please enter a valid email!
              </p>
            </div>

            <div className="mb-3">
              <label
                className="block text-primary-deep-green text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={isInvalidPassword ? invalidClass : validClass}
                id="password"
                type="password"
                placeholder="************"
                value={formData.password}
                name="password"
                onChange={(e) => {
                  setIsInvalidPassword(false);
                  setIsInvalid(false);
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <p
                className={
                  isInvalidPassword
                    ? 'text-xs mt-2 text-red-500'
                    : 'collapse -mt-2'
                }
              >
                Please enter a valid password (at least 8 chars)!
              </p>
            </div>

            <div>
              <button
                className="ease-in duration-500  hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-xl mx-auto block text-xl hover:transition-all mt-10"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button className="inline-block align-baseline font-bold text-sm hover:text-primary-promo-banner">
              <Link to={'/login'}>Already have an account? Log in!</Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
