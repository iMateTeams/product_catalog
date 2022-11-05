import React, { useState } from 'react';
import { Product } from '../../types/Product';
import styleCart from './CartPage.module.scss';
import arrow_left from '../../images/ArrowLeft.svg';
import { ProductInCart } from '../../components/ProductInCart';



type Props = {
  products: Product[];
  removeFromCart: (id: number) => void;
  countPlus: (id: number) => void;
  countMinus: (id: number) => void;
  totalPrice: number;
  clearCart: (items:Product[]) => void;
}

export const CartPage: React.FC<Props> = ({ 
  products,
  removeFromCart,
  countPlus,
  countMinus,
  totalPrice,
  clearCart,
}) => {
  const [isCheck, setCheckout] = useState(false);

  const clearCartOnClick = () => {
    setCheckout(false);
    clearCart(products);
  };
  const saveCartOnClick = () => {
    setCheckout(false);
  };
  
  return(
    <div className={styleCart.page}>
    
      <a href="#" className={styleCart.page_nav}>
        <img src={arrow_left} alt="Arrow" className={styleCart.page_nav__img}/>
        <p className={styleCart.page_nav__title}>
            Back
        </p>
      </a>
  
      <h1>Cart</h1>
      <section className={styleCart.page_cart}>
        <div className={styleCart.cart_box}>
          <ul className={styleCart.cart_list}>
            { products.map(product => (
              <ProductInCart
                product={product} 
                removeFromCart={removeFromCart}
                countPlus={countPlus}
                countMinus={countMinus}
                key={product.id}/>
            ))}
            
          </ul>
        </div>
        <div className={styleCart.cart_box_total}>
          <p className={styleCart.cart__total_price}>{`$${totalPrice}`}</p>
          <p className={styleCart.cart__count_items}>{`Total for ${products.reduce((sum, product) => ((product.count || 0) + sum), 0)} items`}</p>
      
          <div className={styleCart.cart__checkout}>
            <button 
              className={styleCart.cart__checkout_cart}
              onClick={() => setCheckout(true)}
            >Checkout</button>
          </div>
        </div>
      </section>
      {isCheck && (
        <div className={styleCart.page_opasity}>
          <div className={`${styleCart.cart_box_total} ${styleCart.page_approve}`}>
            <p>Checkout is not implemented yet. Do you wan't to clear the Cart?: </p>
            <div className={styleCart.cart__checkout_approve}>
              <button
                type="button"
                className={styleCart.cart__checkout_cart}
                onClick={() =>clearCartOnClick()}
              >
                Yes
              </button>
              <button
                type="button"
                className={styleCart.cart__checkout_cart}
                onClick={() => saveCartOnClick()}
              >No</button>

            </div>
            
          
          </div>
        </div>
      )}
        
    </div>
    
  );
};