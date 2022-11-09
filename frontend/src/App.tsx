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

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [burgerActive, setBurgerActive] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage, setPhonesPerPage] = useState(16);
  const [dataAmount, setDataAmount] = useState(0);
  const [productsInCart, setProductsInCart] = useState<Product[]>([]);
  const [productsFavor, setProductsFavor] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortBy | string>(SortBy.age);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }, [productsInCart]);
  

  useEffect(() => {
    getPart(phonesPerPage, currentPage, sortBy)
      .then((products) => {
        setProducts(products.items);
        setDataAmount(products.dataLength);
        setProductsInCart(products.itemsInCart || []);
        setProductsFavor(products.itemsFavor || []);
      });
    
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 1000);
    getPart(phonesPerPage, currentPage, sortBy)
      .then((products) => {
        setProducts(products.items.map((pr:Product) => {
          const product = productsInCart.find(prInCart => prInCart.id === pr.id);
          if (product) {
            pr = {...product};
          }
          return pr;
        }));
        setDataAmount(products.dataLength);
        
      });

    // setProducts(prev => prev.map(pr => {
    //   pr.inCart = false;
    //   update(+pr.id, { liked:false});

    //   return pr;
    // }));
    
    setTotalPrice(productsInCart
      .map(product => (product.count || 0) * product.price)
      .reduce((sum, number) => sum + number,0) 
      || 0);

  }, [phonesPerPage, currentPage, productsInCart, sortBy]);

  const addOrRemoveCart = (id: number) => {
    const newProducts = products.map((product) => {
      if (+product.id === id && !product.inCart) {
        product.inCart = true;
        product.count = 1;
        setProductsInCart(prevProdacts => [...prevProdacts,product]);
        console.log(product);
        update(id, {inCart: product.inCart });
        update(id, { count : product.count });
      }
      return product;
    });

    setProducts(newProducts);
  };

  const addOrRemoveLiked = (id: number) => {
    products.map((product) => {
      if (+product.id === id) {
        product.liked = !product.liked;
        setProductsFavor(prevProdacts => [...prevProdacts,product]);
        // console.log(product);
        update(id, {liked: product.liked });
      }

      return product;
    });
  };

  const removeFromCart = (id: number) => {
    products.map((product) => {
      if (+product.id === id) {
        product.inCart = false;
        product.count = 0;
        setProductsInCart(prevProdacts => prevProdacts.filter(product => +product.id !== id));
        update(id, {inCart: product.inCart });
        update(id, { count : product.count });
      }
      return product;
    });
  };

  const countPlus = (id: number) => {
    setProductsInCart(prevProducts => prevProducts.map(product => {
      if (+product.id === id) {
        product.count = (product.count) ? (product.count + 1) : 1;
        update(id, { count : product.count });
      }
      return product;
    }));

  };

  const countMinus = (id: number) => {
    setProductsInCart(prevProducts => prevProducts.map(product => {
      if (+product.id === id) {
        product.count = (product.count) ? (product.count - 1) : 1;
        update(id, { count : product.count });
      }
      return product;
    }));
    
  };

  const clearCart = (cart:Product[]) => {
    cart.forEach(product => {
      update(+product.id, { count: 0});
      update(+product.id, { inCart: false });
    });
    setProductsInCart([]);
  };


  return (
    <>
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
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  isLoad={isLoad}
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
                <CartPage 
                  products={productsInCart}
                  removeFromCart={removeFromCart}
                  countPlus={countPlus}
                  countMinus={countMinus}
                  totalPrice={totalPrice}
                  // saveCart={saveCart}
                  clearCart={clearCart}

                />} />
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
