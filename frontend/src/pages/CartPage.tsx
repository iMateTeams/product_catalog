import React, { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import styleCart from './styles/CartPage.module.scss';
import arrow_left from '../images/ArrowLeft.svg';
import imgPh from '../../src/img/phones/apple-iphone-7/black/00.jpg';


type Props = {
  products: Product[];
}

export const CartPage: React.FC<Props> = ({ products }) => {
  const totalPriceFirst = products.reduce((sum, products) => sum + products.price, 0);
  const [totalPrice, setTotalPrice] = useState(totalPriceFirst);
  useEffect(() => {
    
    setTotalPrice(products.reduce((sum, products) => sum + products.price, 0));

  }, [products]);
  return(
    <div className={styleCart.page}>
      
      <a href="#" className={styleCart.page_nav}>
        <img src={arrow_left} alt="Arrow" className={styleCart.page_nav__img}/>
        <p className={styleCart.page_nav__title}>
            Back
        </p>
      </a>
      {/* </div> */}
      <h1>Cart</h1>
      <section className={styleCart.page_cart}>
        <div className={styleCart.cart_box}>
          <ul className={styleCart.cart_list}>
            { products.map(product => (
              <li className={styleCart.cart_product} key={product.id}>
                <div className={styleCart.cart_product__first}>
                  <button className={styleCart.cart_product__del}>
                    {'X'}
                  </button>
                  <img src={imgPh} alt="phoneImage" className={styleCart.cart_product__img} />
                  <div className={styleCart.cart_product__name}>
                    {product.name}
                  </div>
                </div>
                <div className={styleCart.cart_product__second}>
                  <div className={styleCart.cart_product__count_box}>
                    <button className={styleCart.cart_product__button}>
                      {'-'}
                    </button>
                    <div className={styleCart.cart_product__count}>
                      {product.price}
                    </div>
                    <button className={styleCart.cart_product__button}>
                      {'+'}
                    </button>
                  </div>
                  
                  <div className={styleCart.cart_product__total}>
                    {`$${product.price}`}
                  </div>
                </div>
                
              </li>
            ))}
            
          </ul>
        </div>
        <div className={styleCart.cart_box}>
          <p>{`$${totalPrice}`}</p>
          <p>{`Total for ${products.length} items`}</p>
      
          <div className="section_cart">
            <button>Checkout</button>
          </div>
        </div>

      </section>
    </div>
  );
};
