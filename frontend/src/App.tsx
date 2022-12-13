import './App.scss';

import { Header } from './components/Header/';

import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { BurgerMenu } from './components/BurgerMenu';
import { AuthPopup } from './components/AuthPopup';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { HomePage } from './pages/HomePage';
import { PhoneCardPage } from './pages/PhoneCardPage';
import { TabletsPage } from './pages/TabletsPage';

import { getPart } from '../src/api/products';
import { CartPage } from './pages/CartPage';
import { SortBy } from './types/SortBy';
import { FavoritesPage } from './pages/FavoritesPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  updateTotalCartPrice,
} from './features/products/productsSlice';

const App: React.FC = () => {
  const [burgerActive, setBurgerActive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage, setPhonesPerPage] = useState(16);
  const [sortBy, setSortBy] = useState<SortBy | string>(SortBy.age);

  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(state => state.products.itemsInCart);
  const productsInLiked = useAppSelector(state => state.products.itemsLiked);

  useEffect(() => {
    window.localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }, [productsInCart]);
  useEffect(() => {
    window.localStorage.setItem('productsInLiked', JSON.stringify(productsInLiked));
  }, [productsInLiked]);


  useEffect(() => {
    dispatch(getProductsStart());
    getPart(phonesPerPage, currentPage, sortBy)
      .then((res) => {
        dispatch(getProductsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getProductsFailure(error));
      });
  }, [ currentPage, phonesPerPage, sortBy, dispatch ]);

  useEffect(() => {
    dispatch(updateTotalCartPrice());
  }, [productsInCart]);

  return (
    <div className='app'>
      <AuthPopup />
      <Header
        onClick={() => setBurgerActive(!burgerActive)}
        clicked={burgerActive}
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
              <HomePage />
            } />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={
                <CatalogPage
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  phonesPerPage={phonesPerPage}
                  setPhonesPerPage={setPhonesPerPage}
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
                <FavoritesPage />} 
              />
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
