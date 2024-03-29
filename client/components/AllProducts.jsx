import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  adjustFilter,
  fetchAllProducts,
  resetStatusError,
} from '../slices/product/productSlice';
import FilterSection from './FilterSection.jsx';
import AllProductsSection from './AllProductsSection.jsx';
import ProductPagination from './ProductPagination.jsx';
import Sort from './Sort.jsx';
import { selectProductLoading } from '../slices/product/productSlice';
import PromoBanner from './UI/PromoBanner.jsx';

const AllProducts = () => {
  const dispatch = useDispatch();

  const productsLoading = useSelector(selectProductLoading);

  console.log('products loading?', productsLoading);

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      dispatch(resetStatusError());
      dispatch(adjustFilter(''));
    };
  }, [dispatch]);

  return !productsLoading ? (
    // return !true ? (
    <>
      <PromoBanner />
      <div className="flex justify-center">
        <section>
          <FilterSection />
          <Sort />
          <AllProductsSection />
          <ProductPagination />
        </section>
      </div>
    </>
  ) : (
    <div className="mx-auto w-full max-w-7xl">
      <FilterSection />
      {/* <Sort /> */}
      <div className="flex flex-wrap justify-center gap-12 ">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((e) => (
          <div className="block w-64">
            <div
              style={{
                background: '#ccc',
                animation: 'fade 2s ease-in-out infinite alternate',
                backgroundSize: '200% 100%',
                animation: 'pulse 2s ease-in-out infinite',
              }}
              className="mx-auto mb-2 block h-80 w-full animate-pulse rounded-md bg-gray-300"
            ></div>
            <div
              className="mx-auto h-6 w-full pr-12"
              style={{
                background: '#ccc',
                animation: 'fade 2s ease-in-out infinite alternate',
                backgroundSize: '200% 100%',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
