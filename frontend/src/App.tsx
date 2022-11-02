import './App.css';
import { ProductCard } from './components/ProductCard';
import { Footer } from './components/Footer';

import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
// import { MainNav } from './components/MainNav';
import { Header } from './components/Header/header';
import { BurgerMenu } from './components/BurgerMenu/burger-menu';

import { AccessoriesPage } from './pages/AccessoriesPage';
import { CatalogPage } from './pages/CatalogPage';
import { Home } from './pages/Home';
import { PhoneCardPage } from './pages/PhoneCardPage';
import { TabletsPage } from './pages/TabletsPage';
import { Product } from './types/Product';

import { getAll } from '../src/api/products';
import { CartPage } from './pages/CartPage';
import { phones } from './phones/phones_data';

const App: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [burgerActive, setBurgerActive] = useState(false);

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
      {/* <MainNav /> */}
      <Header onClick={() => setBurgerActive(!burgerActive)} clicked={burgerActive}/>
      <BurgerMenu burgerActive={burgerActive}/>
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
      <Footer />
    </>
  );
};

export default App;
