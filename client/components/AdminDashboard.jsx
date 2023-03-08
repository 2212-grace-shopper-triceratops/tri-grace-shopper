import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';
import {
  fetchAllUsers,
  selectUsers,
  resetStatus as resetUserStatus,
} from '../slices/users/userSlice';
import {
  fetchAllProducts,
  selectAllProducts,
  resetStatusError as resetProductStatus,
} from '../slices/product/productSlice';
import {
  fetchAllPromos,
  selectPromos,
  resetStatus as resetPromoStatus,
} from '../slices/product/promoSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const { auth, token } = useSelector(selectAuth);
  const { users } = useSelector(selectUsers);
  const { promos } = useSelector(selectPromos);

  const [adminTable, setAdminTable] = useState('visible');
  const [userTable, setUserTable] = useState('collapse');
  const [productTable, setProductTable] = useState('collapse');
  const [promoTable, setPromoTable] = useState('collapse');

  const inactiveButtonClass =
    'hover:bg-green-900 hover:text-primary-bright-white pl-5 p-3 rounded-r-full mr-5';

  const activeButtonClass =
    'bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5';

  const [adminButtonStatus, setAdminButtonStatus] = useState(activeButtonClass);
  const [prodButtonStatus, setProdButtonStatus] = useState(inactiveButtonClass);
  const [userButtonStatus, setUserButtonStatus] = useState(inactiveButtonClass);
  const [promoButtonStatus, setPromoButtonStatus] =
    useState(inactiveButtonClass);

  useEffect(() => {
    dispatch(fetchAllUsers({ token }));
    dispatch(fetchAllProducts());
    dispatch(fetchAllPromos({ token }));

    return () => {
      resetAuthStatus();
      resetUserStatus();
      resetProductStatus();
      resetPromoStatus();
    };
  }, [auth]);

  return (
    <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.jpg')]">
      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className=" w-1/4 h-[calc(100vh_-_5rem)] transition-transform -translate-x-full sm:translate-x-0 flex flex-col gap-10"
          aria-label="Sidebar"
        >
          <div className="pt-5">
            <div className={adminButtonStatus}>
              <button
                onClick={() => {
                  setAdminTable('visible');
                  setProductTable('collapse');
                  setPromoTable('collapse');
                  setUserTable('collapse');
                  setAdminButtonStatus(activeButtonClass);
                  setProdButtonStatus(inactiveButtonClass);
                  setPromoButtonStatus(inactiveButtonClass);
                  setUserButtonStatus(inactiveButtonClass);
                }}
                className="text-left"
              >
                {'ADMIN DASHBOARD'}
              </button>
            </div>
            <div>
              <div className={prodButtonStatus}>
                <button
                  onClick={() => {
                    setAdminTable('collapse');
                    setProductTable('visible');
                    setPromoTable('collapse');
                    setUserTable('collapse');
                    setAdminButtonStatus(inactiveButtonClass);
                    setProdButtonStatus(activeButtonClass);
                    setUserButtonStatus(inactiveButtonClass);
                    setPromoButtonStatus(inactiveButtonClass);
                  }}
                  className="flex flex-row"
                >
                  {'PRODUCTS'}
                </button>
              </div>
              <div className={promoButtonStatus}>
                <button
                  onClick={() => {
                    setAdminTable('collapse');
                    setProductTable('collapse');
                    setPromoTable('visible');
                    setUserTable('collapse');
                    setAdminButtonStatus(inactiveButtonClass);
                    setProdButtonStatus(inactiveButtonClass);
                    setPromoButtonStatus(activeButtonClass);
                    setUserButtonStatus(inactiveButtonClass);
                  }}
                  className="text-left"
                >
                  {'PROMOCODES'}
                </button>
              </div>
              <div className={userButtonStatus}>
                <button
                  onClick={() => {
                    setAdminTable('collapse');
                    setProductTable('collapse');
                    setPromoTable('collapse');
                    setUserTable('visible');
                    setAdminButtonStatus(inactiveButtonClass);
                    setProdButtonStatus(inactiveButtonClass);
                    setPromoButtonStatus(inactiveButtonClass);
                    setUserButtonStatus(activeButtonClass);
                  }}
                  className="text-left"
                >
                  {'USER MANAGEMENT'}
                </button>
              </div>
              <div className={inactiveButtonClass}>
                <p className="text-left">PLANTS&CO SHOPS</p>
              </div>
            </div>
          </div>
          <button className="text-left pl-5 font-bold text-sm hover:text-primary-promo-banner py-1">
            <Link to={'/account'}>Back</Link>
          </button>
        </aside>

        <div className="p-4 w-3/4  h-[calc(100vh_-_5rem)] overflow-auto">
          <div className="p-4 border-2 border-primary-button-hover border-dashed rounded-lg">
            <div className="flex flex-col h-[calc(100vh_-_10rem)] rounded bg-gray-50 dark:bg-gray-800 overflow-auto">
              <div id="users" className={userTable}>
                <table
                  id="userTable"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white rounded-xl overflow-x-auto"
                >
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-xl sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 sticky top-0">
                        {'USER ID'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'NAME'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'EMAIL'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'ROLE'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length
                      ? users.map((user) => {
                          return (
                            <tr
                              key={user.id}
                              className="text-xs odd:bg-white even:bg-slate-50"
                            >
                              <th scope="col" className="px-6 py-3">
                                {user.id}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {user.fullName}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {user.email}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {user.role}
                              </th>
                            </tr>
                          );
                        })
                      : 'Users Loading...'}
                  </tbody>
                </table>
              </div>
              <div id="products" className={productTable}>
                <table
                  id="productTable"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white rounded-xl overflow-x-auto"
                >
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-xl sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 sticky top-0">
                        {'PRODUCT ID'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'NAME'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'PRICE'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'QTY'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'ACTIONS'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length
                      ? products.map((product) => {
                          return (
                            <tr
                              key={product.id}
                              className="text-xs odd:bg-white even:bg-slate-50"
                            >
                              <th scope="col" className="px-6 py-3">
                                {product.id}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {product.name}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {'$'}
                                {product.price}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {product.qty}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                <Link
                                  className="hover:text-primary-promo-banner"
                                  to={`/account/admin/editproduct/${product.id}`}
                                >
                                  {'Edit / Delete'}
                                </Link>
                              </th>
                            </tr>
                          );
                        })
                      : 'Products Loading...'}
                  </tbody>
                </table>
              </div>
              <div id="promos" className={promoTable}>
                <table
                  id="promoTable"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white rounded-xl overflow-x-auto"
                >
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-xl sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 sticky top-0">
                        {'PROMO ID'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'NAME'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'DISCOUNT RATE'}
                      </th>
                      <th scope="col" className="px-6 py-3 top-0 sticky">
                        {'STATUS'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {promos && promos.length
                      ? promos.map((promo) => {
                          return (
                            <tr
                              key={promo.id}
                              className="text-xs odd:bg-white even:bg-slate-50"
                            >
                              <th scope="col" className="px-6 py-3">
                                {promo.id}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {promo.name}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {(promo.discountRate * 100).toFixed(0)}
                                {'%'}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                {promo.status.toString()}
                              </th>
                            </tr>
                          );
                        })
                      : 'Promos Loading...'}
                  </tbody>
                </table>
              </div>
              <div id="admin" className={adminTable}>
                <p>{`Howdy, ${auth.firstName}!`}</p>
                <p>{"You're an admin... Nice!"}</p>
                <div>
                  <span>
                    <button className="py-3 px-5 mr-2 m-5 text-center text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100">
                      Add Product
                    </button>
                    <button className="py-3 px-5 mr-2 m-5 text-center text-text-primary-deep-green-900 bg-white rounded-lg border hover:bg-gray-100">
                      Add Promo
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
