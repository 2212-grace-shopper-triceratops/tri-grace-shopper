import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  adjustSearchBy,
  selectSearchBy,
} from '../../slices/product/productSlice';
import searchIcon from '../../../public/assets/search-icon.svg';

const MobileNav = ({ expand, setExpand }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector(selectSearchBy);

  const handleClick = () => {
    setExpand(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    handleClick();
    navigate('/products');
  };

  return (
    <div
      className="absolute top-0 z-10 mt-20 h-[calc(100vh-80px)] w-72 bg-gray-100 transition-all lg:hidden"
      style={{
        right: `${expand ? '0' : '-18rem'}`,
        display: `${expand ? 'block' : 'none'}`,
      }}
    >
      <ul className="flex basis-16 flex-col items-center justify-center text-center text-2xl">
        <div className="mx-auto flex h-16 w-5/6 gap-1 border-b-2 stroke-green-900 py-4">
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="magnifying glass" className="w-8 pt-1" />
          </button>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="succulent..."
              className="h-8 w-full rounded-full border-2 border-green-700 bg-gray-100 pl-3 text-base"
              value={searchTerm}
              onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
            />
          </form>
        </div>
        <div
          className="w-full transition-all hover:bg-slate-200"
          onClick={handleClick}
        >
          {localStorage.getItem('token') ? (
            <Link to="/account">
              <li className="mx-auto h-16 w-5/6 border-b-2 py-4">Account</li>
            </Link>
          ) : (
            <Link to="/login">
              <li className="mx-auto h-16 w-5/6 border-b-2 py-4">Login</li>
            </Link>
          )}
        </div>
        <div
          className="w-full transition-all hover:bg-slate-200"
          onClick={handleClick}
        >
          <Link to="/products">
            <li className="mx-auto h-16 w-5/6 border-b-2 py-4">Shop</li>
          </Link>
        </div>
        <div
          className="w-full transition-all hover:bg-slate-200"
          onClick={handleClick}
        >
          <Link to="/cart">
            <li className="mx-auto h-16 w-5/6 border-b-2 py-4">Cart</li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default MobileNav;
