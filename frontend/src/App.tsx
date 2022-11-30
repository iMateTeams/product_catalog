import './App.css';

import { Header } from './components/Header/';

import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { HomePage } from './pages/HomePage';
import { PhoneCardPage } from './pages/PhoneCardPage';
import { TabletsPage } from './pages/TabletsPage';
import { Product } from './types/Product';

import { getPart, update } from '../src/api/products';
import { CartPage } from './pages/CartPage';
import { SortBy } from './types/SortBy';
import { FavoritesPage } from './pages/FavoritesPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateTotalCartPrice,
} from './features/products/productsSlice';

import { getNewest } from '../src/api/products';

const App: React.FC = () => {
  const [burgerActive, setBurgerActive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage, setPhonesPerPage] = useState(16);
  const [sortBy, setSortBy] = useState<SortBy | string>(SortBy.age);

  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(state => state.products.itemsInCart);
  const productsFavor = useAppSelector(state => state.products.itemsLiked);

  useEffect(() => {
    window.localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }, [productsInCart]);
  useEffect(() => {
    window.localStorage.setItem('productsFavor', JSON.stringify(productsFavor));
  }, [productsFavor]);


  useEffect(() => {
    dispatch(getProductsStart());
    getPart(phonesPerPage, currentPage, sortBy)
      .then((products) => {
        dispatch(getProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(getProductsFailure(error));
      });
  }, [currentPage, phonesPerPage, sortBy]);

  useEffect(() => {
    dispatch(updateTotalCartPrice());
  }, [productsInCart]);

  const handleAddToCart = (product: Product) => {
    if (product.inCart) {
      update(+product.id, { ...product, inCart: false })
        .then((product) => {
          dispatch(updateProductSuccess(product));
        })
        .catch((error) => {
          dispatch(updateProductFailure(error));
        });
    } else {
      update(+product.id, { ...product, inCart: true })
        .then((product) => {
          dispatch(updateProductSuccess(product));
        })
        .catch((error) => {
          dispatch(updateProductFailure(error));
        });
    }
  };

  const handleAddToFavorites = (product: Product) => {
    if (product.liked) {
      update(+product.id, { ...product, liked: false })
        .then((product: Product) => {
          dispatch(updateProductSuccess(product));
        })
        .catch((error) => {
          dispatch(updateProductFailure(error));
        });
    } else {
      update(+product.id, { ...product, liked: true })
        .then((product: Product) => {
          dispatch(updateProductSuccess(product));
        })
        .catch((error) => {
          dispatch(updateProductFailure(error));
        });
    }
  };

  return (
    <>
      <Header
        onClick={() => setBurgerActive(!burgerActive)}
        clicked={burgerActive}
        amontInCart={productsInCart.length}
        amountLiked={productsFavor.length}
      />
      <BurgerMenu onClick={() => setBurgerActive(!burgerActive)} clicked={burgerActive} />
      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/" element={
              <HomePage
                handleAddToCart={handleAddToCart}
                handleAddToFavorites={handleAddToFavorites}
              />
            } />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={
                <CatalogPage
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  phonesPerPage={phonesPerPage}
                  setPhonesPerPage={setPhonesPerPage}
                  handleAddToCart={handleAddToCart}
                  handleAddToFavorites={handleAddToFavorites}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              }
              />
              <Route path=":idPhone" element={<PhoneCardPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<TabletsPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
            </Route>
            <Route path="cart">
              <Route index element={
                <CartPage />} />
            </Route>
            <Route path="liked">
              <Route index element={
                <FavoritesPage
                  handleAddToCart={handleAddToCart}
                  handleAddToFavorites={handleAddToFavorites}
                />} 
              />
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
