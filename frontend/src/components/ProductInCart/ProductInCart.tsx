import React, { useEffect, useState, useMemo } from 'react';
import styleCart from '../../pages/CartPage/CartPage.module.scss';

import { Product } from '../../types/Product';
import { removeFromCart } from '../../features/products/productsSlice';

type Props = {
  product: Product;
}

export const ProductInCart: React.FC<Props> = ({
  product,
}) => {
  const [img, setImg] = useState('');

  useEffect(() => {
    fetch(`https://i-mate-teams-product-catalog.herokuapp.com/${product.image}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImg(url);
      });
  }, []);

  return (
    <li className={styleCart.cart_product} >
      <div className={styleCart.cart_product__first}>
        <button 
          className={styleCart.cart_product__button_del}
          onClick={() => removeFromCart(product)}
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
            // onClick={() => countMinus(+product.id)}
            disabled={product.count === 1}
          >
            {'-'}
          </button>
          <div className={styleCart.cart_product__count}>
            {product.count}
          </div>
          <button 
            className={styleCart.cart_product__button}
            // onClick={() => countPlus(+product.id)}
          >
            {'+'}
          </button>
        </div>
        
        <div className={styleCart.cart_product__total}>
          {`$${(product.count || 0) * product.price}`}
        </div>
      </div>
    </li>
  );
};