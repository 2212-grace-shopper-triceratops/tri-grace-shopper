import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from '../store';
import { Homepage, AllProducts, SingleProduct, NavBar, Cart } from './index';

export default function Main() {
  return (
    <>
      <div className="font-fraunces text-primary-deep-green">
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Provider>
      </div>
    </>
  );
}
