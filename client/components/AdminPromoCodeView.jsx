import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';
import {
  fetchAllPromos,
  selectPromos,
  resetStatus as resetPromoStatus,
} from '../slices/product/promoSlice';

const AdminPromoCodeView = () => {
  const dispatch = useDispatch();

  const { auth, token } = useSelector(selectAuth);
  const { promos } = useSelector(selectPromos);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllPromos({ token }));
    }

    return () => {
      resetAuthStatus();
      resetPromoStatus();
    };
  }, [auth]);

  return (
    <div className="h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.jpg')] bg-cover bg-center">
      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className=" flex h-[calc(100vh_-_5rem)] w-1/4 -translate-x-full flex-col gap-5 transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="flex flex-col gap-3 pt-5">
            <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
              <button className="text-left">
                <Link to={'/account/admin'}>ADMIN DASHBOARD</Link>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/products'}>PRODUCTS</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/addproduct'}>ADD NEW PRODUCT</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full bg-green-900 p-3 pl-5 text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/promos'}>PROMOS</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/addpromo'}>ADD NEW PROMO</Link>
                </button>
              </div>
              <div className="mr-5 rounded-r-full p-3 pl-5 hover:bg-green-900 hover:text-primary-bright-white">
                <button className="text-left">
                  <Link to={'/account/admin/users'}>USER MANAGEMENT</Link>
                </button>
              </div>
            </div>
          </div>
          <button className="font-bold py-1 pl-5 text-left text-sm hover:text-primary-promo-banner">
            <Link to={'/account'}>Back</Link>
          </button>
        </aside>

        <div className="h-[calc(100vh_-_5rem)] w-3/4 overflow-auto p-4">
          <div className="p-4">
            <div className="flex h-[calc(100vh_-_10rem)] flex-col overflow-auto rounded-xl">
              <div id="products">
                <table id="productTable" className="w-full overflow-x-auto">
                  <thead className="sticky top-0 rounded-xl bg-gray-50 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="sticky top-0 px-6 py-3">
                        {'PROMO ID'}
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 px-6 py-3 text-left"
                      >
                        {'NAME'}
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3">
                        {'DISCOUNT RATE'}
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3">
                        {'STATUS'}
                      </th>
                      <th scope="col" className="sticky top-0 px-6 py-3">
                        {'ACTIONS'}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {promos && promos.length
                      ? promos.map((promo) => {
                          return (
                            <tr
                              key={promo.id}
                              className="text-sm odd:bg-white even:bg-slate-50"
                            >
                              <td scope="col" className="px-6 py-3 text-center">
                                {promo.id}
                              </td>
                              <td scope="col" className="px-6 py-3 text-left">
                                {promo.name}
                              </td>
                              <td scope="col" className="px-6 py-3 text-center">
                                {(promo.discountRate * 100).toFixed()}
                                {'%'}
                              </td>
                              <td scope="col" className="px-6 py-3 text-center">
                                {promo.status.toString()}
                              </td>
                              <td scope="col" className="px-6 py-3 text-center">
                                <Link
                                  className="hover:text-primary-promo-banner"
                                  to={`/account/admin/editpromos/${promo.id}`}
                                >
                                  {'Edit / Delete'}
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      : 'Promos Loading...'}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPromoCodeView;
