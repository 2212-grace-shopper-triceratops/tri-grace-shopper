import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PromoBanner from './UI/PromoBanner.jsx';
import box from '../../public/assets/box.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError,
  fetchAllProducts,
  selectProductLoading,
} from '../slices/product/productSlice.js';
import LikedProduct from './UI/LikedProduct.jsx';
import { addOneToCart } from '../slices/users/cartSlice.js';
import SimilarProducts from './SimilarProducts.jsx';
import toast, { Toaster } from 'react-hot-toast';
import ProductSkeleton from './UI/ProductSkeleton.jsx';

const singleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productLoading = useSelector(selectProductLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchAllProducts());
    return () => dispatch(resetStatusError());
  }, [dispatch, productId]);

  const singleProduct = useSelector(selectSingleProduct);

  function addToCart() {
    dispatch(addOneToCart(productId));
  }

  const notify = () => toast.success('Product added to cart!');

  return (
    <>
      {/* <PromoBanner /> */}
      {!productLoading ? (
        <main className="font-serif flex md:h-[470px]">
          <section className="mt-8 flex flex-col justify-center md:flex-row md:gap-20">
            <div className="mx-auto md:mx-0">
              <img
                className="h-96 rounded-xl md:h-full"
                src={`${singleProduct.imageURL}`}
                alt="error showing photo"
              />
            </div>
            <div className="mx-8 md:mx-0 md:w-1/3">
              <div className="mb-8 flex items-center justify-between">
                <header className=" text-3xl text-green-900">
                  {singleProduct.name}
                </header>
                <LikedProduct />
              </div>

              <div className="mb-4 flex justify-between border-b-4 pb-2">
                <p>
                  {singleProduct?.tags
                    ?.map(({ tagName }) => tagName)
                    .join(', ')}
                </p>
              </div>
              <p className="font-bold mb-4 text-3xl text-primary-deep-green">
                ${singleProduct.price}
              </p>
              <p className="mb-8 leading-tight">
                {singleProduct.shortDescription?.slice(0, 50)}
              </p>
              <div className="mb-3 border-b-4 pb-4">
                <button
                  onClick={() => {
                    notify();
                    addToCart();
                  }}
                  className="mx-auto block w-full rounded-2xl bg-primary-deep-green py-3 text-xl text-white hover:bg-primary-button-green hover:transition-all"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="flex items-center gap-2">
                <img src={box} alt="shipping box icon" className="w-6" />
                <p className="text-sm">Free shipping in the USA</p>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <ProductSkeleton />
      )}
      {/* <div className="hidden md:block"> */}
      <SimilarProducts />
      {/* </div> */}
      <Toaster />
    </>
  );
};

export default singleProduct;
