import './App.css';
import { ProductCard } from './components/ProductCard';
import { Header } from './components/Header/';

import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
// import { MainNav } from './components/MainNav';
import { Footer } from './components/Footer/Footer';
import { BurgerMenu } from './components/BurgerMenu';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { HomePage } from './pages/HomePage';
import { PhoneCardPage } from './pages/PhoneCardPage';
import { TabletsPage } from './pages/TabletsPage';
import { Product } from './types/Product';

import { getPart, update } from '../src/api/products';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [burgerActive, setBurgerActive] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage, setPhonesPerPage] = useState(16);
  const [dataAmount, setDataAmount] = useState(0);

  useEffect(() => {
    getPart(phonesPerPage, currentPage)
      .then((products) => {
        setProducts(products.items);
        setDataAmount(products.dataLength);
      });
  }, []);

  useEffect(() => {
    getPart(phonesPerPage, currentPage)
      .then((products) => {
        setProducts(products.items);
        setDataAmount(products.dataLength);
      });
  }, [phonesPerPage, currentPage]);

  const addOrRemoveCart = (id: number) => {
    const newProducts = products.map((product) => {
      if (+product.id === id) {
        return {
          ...product,
          inCart: !product.inCart || false,
        };
      }

      return product;
    });

    update(id, { inCart: newProducts.find(product => +product.id === id)?.inCart });

    setProducts(newProducts);
  };

  const addOrRemoveLiked = (id: number) => {
    const newProducts = products.map((product) => {
      if (+product.id === id) {
        return {
          ...product,
          liked: !product.liked || false,
        };
      }

      return product;
    });

    update(id, { liked: newProducts.find(product => +product.id === id)?.liked });

    setProducts(newProducts);
  };

  return (
    <>
      {/* <MainNav /> */}
      <Header onClick={() => setBurgerActive(!burgerActive)} clicked={burgerActive}/>
      <BurgerMenu onClick={() => setBurgerActive(!burgerActive)} clicked={burgerActive}/>
      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={
                <CatalogPage 
                  products={products} 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  phonesPerPage={phonesPerPage}
                  setPhonesPerPage={setPhonesPerPage}
                  addOrRemoveCart={addOrRemoveCart}
                  dataAmount={dataAmount}
                  addOrRemoveLiked={addOrRemoveLiked}
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
              <Route index element={<div />} />
            </Route>
            {/* <Route path="favorites">
              <Route index element={<Favorites />} />
            </Route> */}
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
