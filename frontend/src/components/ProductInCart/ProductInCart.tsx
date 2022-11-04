import React, { useEffect, useState } from 'react';
// import classNames from 'classnames';
import styleCart from '../../pages/styles/CartPage.module.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  removeFromCart: (id: number) => void;
  countPlus: (id: number) => void;
  countMinus: (id: number) => void;
}

export const ProductInCart: React.FC<Props> = ({
  product,
  removeFromCart,
  countPlus,
  countMinus,
}) => {
  const [img, setImg] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/${product.image}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImg(url);
      });
  }, [product.image]);

  return (
    <li className={styleCart.cart_product} >
      <div className={styleCart.cart_product__first}>
        <button 
          className={styleCart.cart_product__button_del}
          onClick={() => removeFromCart(+product.id)}
        >
          {'x'}
        </button>
        <img src={img} alt="phoneImage" className={styleCart.cart_product__img} />
        <div className={styleCart.cart_product__name}>
          {product.name}
        </div>
      </div>
      <div className={styleCart.cart_product__second}>
        <div className={styleCart.cart_product__count_box}>
          <button 
            className={styleCart.cart_product__button}
            onClick={() => countMinus(+product.id)}
            disabled={product.count === 1}
          >
            {'-'}
          </button>
          <div className={styleCart.cart_product__count}>
            {product.count}
          </div>
          <button 
            className={styleCart.cart_product__button}
            onClick={() => countPlus(+product.id)}
          >
            {'+'}
          </button>
        </div>
        
        <div className={styleCart.cart_product__total}>
          {`$${product.count * product.price}`}
        </div>
      </div>
      
    </li>

  );
};