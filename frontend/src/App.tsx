import './App.css';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Header } from './components/Header/header';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CatalogPage } from './pages/CatalogPage';
import { Home } from './pages/Home';
import { PhoneCardPage } from './pages/PhoneCardPage';
import { TabletsPage } from './pages/TabletsPage';
import { productT } from './types/productT';

import { getAll } from '../src/api/products';
import { CartPage } from './pages/CartPage';
import { phones } from './phones/phones_data';

const App: React.FC = () => {
  const [products, setProducts] = useState<productT[]>([]);
  const [productsInCart, setProductsInCart] = useState<productT[]>([]);


  useEffect(() => {
    getAll()
      .then((data) => {
        setProducts(data);
      });
    [...products].forEach(product => {
      product.inCart = false;
      product.isFavorite= false;
    });
    
  }, []);

  const addOrRemoveCart = (id: number) => {
    products[id].inCart = !products[id].inCart;
    setProductsInCart([...products].filter(product => product.inCart = true));
    console.log(products[id]);
  };


  return (
    <>
      <Header/>
      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={
                <CatalogPage 
                  products={products} 
                  addOrRemoveCart={addOrRemoveCart}
                />
              } />
              <Route path=":idPhone" element={<PhoneCardPage />} />
            </Route>
            <Route path="tablets">
              <Route index element={<TabletsPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
            </Route>
            <Route path="cart">
              <Route index element={<CartPage products={productsInCart} />} />
            </Route>
          </Routes>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default App;
