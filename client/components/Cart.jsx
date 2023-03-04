import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetStatus, fetchCart } from '../slices/users/userSlice';

const Cart = () => {
  // /user/:userid/cart
  // check if user is logged in
  const { userId } = useParams();
  // if user is logged in and cart doesn't exist, return no items in cart
  // if user is logged in and cart items exist, populate cart

  // /cart
  // if user is not logged in, pull cart from local storage
  // if no cart obj in local storage, return no items in cart view
  // if cart items in local storage, populate local state

  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // get cart - send userid
    // update cart - send userid, productid, qty
    // delete cart - send userid, productid
  });

  https: return (
    <>
      <main>
        <section>
          <div>
            <h2 className="text-2xl">Your Cart</h2>
            <p>Our team picks, prunes, & packs every order -</p>
            <p>meaning lots of care goes into every step!</p>
          </div>
          <div>
            <div>
              <h3>CART ITEMS</h3>
              <div></div>
            </div>
            <div>
              <h2>SUBTOTAL:</h2>
              <h3>SHIPPING:</h3>
            </div>
            <div className="border-b-4 pb-4 mb-3">
              <button className="hover:bg-primary-button-green w-full bg-primary-deep-green text-white py-3 rounded-2xl mx-auto block text-xl hover:transition-all">
                CHECKOUT
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Cart;
