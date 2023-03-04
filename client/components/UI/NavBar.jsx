import React from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../../public/assets/search-icon.svg';

const NavBar = () => {
  return (
    <nav className="border-b-2 border-green-900 flex justify-between font-serif h-20 items-center tracking-tighter text-green-900 px-5">
      <div>
        <Link to={'/'}>
          <h1 className="text-green-900 text-5xl font-bold">Plants&Co</h1>
        </Link>
      </div>
      <div className="flex gap-10">
        <div className="flex gap-1 stroke-green-900">
          <img src={searchIcon} alt="magnifying glass" className="w-6" />
          <input
            type="text"
            placeholder="succulent..."
            className="border-2 border-green-700 rounded-full pl-3"
          />
        </div>
        <ul className="flex text-2xl gap-10">
          <Link to={`/products`}>
            <li>Shop</li>
          </Link>
          <li>Login</li>
          <Link to={'/cart'}>
            <li>Cart</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
