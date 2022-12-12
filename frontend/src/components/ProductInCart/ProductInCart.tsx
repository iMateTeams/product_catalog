import React, { useEffect, useState } from 'react';
import styleCart from '../../pages/CartPage/CartPage.module.scss';

import { Product } from '../../types/Product';
import { handleUpdateProductCard, updateProductSuccess, updateTotalCartPrice } from '../../features/products/productsSlice';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  product: Product;
}

export const ProductInCart: React.FC<Props> = ({
  product,
}) => {
  const [img, setImg] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4002/${product.image}`)
    // fetch(`https://i-mate-teams-product-catalog.herokuapp.com/${product.image}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImg(url);
      });
  }, []);
  const dispatch = useAppDispatch();

  // const productsInCart = useAppSelector(state => state.products.itemsInCart);

  // const productInCart = useMemo(() => {
  //   return productsInCart.find(item => item.id === product.id);
  // }, [productsInCart, product.id]);

  const handleAddToCartClick = () => {
    let productInCart;

    console.log('changeBef', product);

    if (product.inCart === undefined) {
      productInCart = { ...product, inCart: true };
    } else if (product.inCart) {
      productInCart = { ...product, inCart: false };
    } else {
      productInCart = { ...product, inCart: true };
    }

    console.log('change', productInCart);
  
    console.log('updatedData', productInCart);
    dispatch(handleUpdateProductCard(productInCart));
    dispatch(updateProductSuccess(productInCart));
    dispatch(updateTotalCartPrice());
  };

  return (
    <li className={styleCart.cart_product} >
      <div className={styleCart.cart_product__first}>
        <button 
          className={styleCart.cart_product__button_del}
          onClick={handleAddToCartClick}
        >
          <div className={styleCart.cart_product__button_del__image}/>
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
          {`$${(product.count || 1) * product.price}`}
        </div>
      </div>
    </li>
  );
};