import './App.css';
// import { ProductCard } from './components/ProductCard';
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

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsInCart, setProductsInCart] = useState<Product[]>(() => {
    const localCart = localStorage.getItem('productsInCart') || '';
    const initialCart = JSON.parse(localCart);
    console.log(localCart);
    return initialCart;
  });
  const [burgerActive, setBurgerActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getAll()
      .then((data) => {
        setProducts(data);
      });
   
    setProducts(prev => prev.map(product => Object.assign(product,{inCart : false, isFavorite: false, count: 0,})));

  }, []);
  

  useEffect(() => {
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }, [productsInCart]);

  useEffect(() => {
    setProductsInCart([...products].filter(product => product.inCart === true));
  }, [products]);

  useEffect(() => {
    setTotalPrice([...productsInCart].map(product => product.count * product.price)
      .reduce((sum, number) => sum + number,0));
  }, [productsInCart]);

  const addOrRemoveCart = (id: number) => {
    setProducts(prev => prev.map(product => {
      if (+product.id === id) {
        product.inCart = !product.inCart;
      }
      if (product.inCart) {
        product.count = 1;
      } else {
        product.count = 0;
      }
      return product;
    }));
  };

  const removeFromCart = (id: number) => {
    setProducts(prev => prev.map(product => {
      if (+product.id === id) {
        product.inCart = false;
        product.count = 0;
      }
      return product;
    }));
  };

  const countPlus = (id: number) => {
    setProducts(prev => prev.map(product => {
      if (+product.id === id) {
        product.count++;
      }
      return product;
    }));
  };

  const countMinus = (id: number) => {
    setProducts(prev => prev.map(product => {
      if (+product.id === id) {
        product.count--;
      }
      return product;
    }));
  };

  return (
    <>
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
              <Route index element={
                <CartPage 
                  products={productsInCart}
                  removeFromCart={removeFromCart}
                  countPlus={countPlus}
                  countMinus={countMinus}
                  totalPrice={totalPrice}
                />} />
            </Route>
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
