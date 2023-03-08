import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError as resetProductStatus,
  editSingleProduct,
  deleteSingleProduct,
} from '../slices/product/productSlice';
import {
  selectAuth,
  resetStatus as resetAuthStatus,
} from '../slices/users/authSlice';

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const singleProduct = useSelector(selectSingleProduct);
  const { auth, token } = useSelector(selectAuth);

  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));

    return () => {
      resetProductStatus();
      resetAuthStatus();
    };
  }, [productId]);

  useEffect(() => {
    setName(singleProduct.name || '');
    setDescription(singleProduct.description || '');
    setQty(singleProduct.qty || 0);
    setPrice(singleProduct.price || 0);
    setImageURL(singleProduct.imageURL || '');
  }, [singleProduct]);

  const updateProduct = (evt) => {
    evt.preventDefault();
    const updates = { name, qty, description, price, imageURL };
    const id = +productId;
    dispatch(editSingleProduct({ productId, token, updates }));
    dispatch(fetchSingleProduct(productId));
  };

  const deleteProduct = async () => {
    await dispatch(deleteSingleProduct({ productId, token }));
    navigate('/account/admin');
  };

  return (
    <div className="bg-cover bg-center h-[calc(100vh_-_5rem)] bg-[url('/assets/bg_img/admin.jpg')]">
      <div className="flex flex-row">
        <aside
          id="default-sidebar"
          className=" w-1/4 h-[calc(100vh_-_5rem)] transition-transform -translate-x-full sm:translate-x-0 flex flex-col gap-10"
          aria-label="Sidebar"
        >
          <div className="pt-5">
            <div className="bg-green-900 text-primary-bright-white pl-5 p-3 rounded-r-full mr-5">
              <div className="">{'EDIT/DELETE PRODUCT'}</div>
            </div>
            <button className="text-left pl-5 pt-5 font-bold text-sm hover:text-primary-promo-banner py-1">
              <Link to={'/account/admin'}>Back</Link>
            </button>
          </div>
        </aside>
        <section className="flex flex-col w-5/6 mt-5">
          <div className=" w-5/6 justify-center pb-10">
            <p className="text-center m-auto text-4xl font-extrabold pb-5 text-primary-deep-green">
              {singleProduct.name}
            </p>
            <img
              src={imageURL}
              className="object-scale-down h-48 w-96 m-auto"
            />
          </div>
          <form className="w-5/6 pl-10 pr-10" onSubmit={updateProduct}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name"
                  type="text"
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                  htmlFor="grid-first-qty"
                >
                  Quantity In Stock
                </label>
                <input
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-qty"
                  type="number"
                  min={0}
                  value={qty}
                  onChange={(evt) => setQty(evt.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                  htmlFor="grid-price"
                >
                  Price
                </label>
                <input
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-price"
                  type="number"
                  min="0.00"
                  max="10000.00"
                  step="0.01"
                  value={price}
                  onChange={(evt) => setPrice(evt.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                  htmlFor="grid-description"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-description"
                  type="text"
                  rows="7"
                  value={description}
                  onChange={(evt) => setDescription(evt.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-primary-deep-green text-xs font-bold mb-2"
                  htmlFor="imageURL"
                >
                  Upload image
                </label>
                <input
                  className="appearance-none block w-full text-md text-gray-700 border border-gray-200 rounded cursor-pointer bg-primary-bright-white"
                  id="imageURL"
                  type="file"
                  onChange={(evt) => setImageURL(evt.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between">
              <button
                type="submit"
                className="hover:bg-primary-button-hover w-full bg-primary-deep-green text-white py-2 rounded-lg mx-auto block text-xl hover:transition-all mt-5"
              >
                Save
              </button>
            </div>
            <div className="flex justify-center"></div>
          </form>
          <button
            className="text-red-600 w-5/6 py-2 rounded-lg block text-sm hover:text-primary-promo-banner mt-5"
            onClick={deleteProduct}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
};

export default EditProduct;
