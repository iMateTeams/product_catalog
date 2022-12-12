import React, { useState, useEffect } from 'react';
import productCard from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useAppDispatch } from '../../app/hooks';
import {
  handleAddToCart,
  handleAddToLiked,
  updateProductSuccess,
  updateTotalCartPrice,
} from '../../features/products/productsSlice';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, fullPrice, price, screen, capacity, ram, image, inCart, liked } = product;

  const [img, setImg] = useState('');

  const dispatch = useAppDispatch();
  // const productsInCart = useAppSelector((state) => state.products.itemsInCart);

  useEffect(() => {
    // fetch(`https://i-mate-teams-product-catalog.herokuapp.com/${image}`)
    fetch(`http://localhost:4002/${image}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImg(url);
      });
  }, [image]);

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
    dispatch(handleAddToCart(productInCart));
    dispatch(updateProductSuccess(productInCart));
    dispatch(updateTotalCartPrice());
  };

  const handleAddToLikedClick = () => {
    dispatch(handleAddToLiked(product));
  };

  return (
    <section className={productCard.card}>
      <div className={productCard.card__content}>
        <img src={img} alt='phoneImage' className={productCard.card__image} />
        <div className={productCard.card__name}>{name}</div>
        <div className={productCard.card__price}>
          <div className={productCard.card__price_current}>{`${price}$`}</div>
          <div className={productCard.card__price_full}>{`${fullPrice}$`}</div>
        </div>
        <div className={productCard.card__specs}>
          <div className={productCard.card__specs_block}>
            <div className={productCard.card__specs_title}>Screen</div>
            <div className={productCard.card__specs_value}>{screen}</div>
          </div>
          <div className={productCard.card__specs_block}>
            <div className={productCard.card__specs_title}>Capacity</div>
            <div className={productCard.card__specs_value}>{capacity}</div>
          </div>
          <div className={productCard.card__specs_block}>
            <div className={productCard.card__specs_title}>RAM</div>
            <div className={productCard.card__specs_value}>{ram}</div>
          </div>
        </div>
        <div className={productCard.card__buttons}>
          <button
            type='button'
            className={`
              ${productCard.card__buttons_cart} 
              ${inCart && productCard.card__buttons_cart__added}
            `}
            onClick={handleAddToCartClick}
          >
            {inCart ? 'Added' : 'Add to cart'}
          </button>
          <button
            type='button'
            className={`
            ${productCard.card__buttons_fav} 
            ${liked && productCard.card__buttons_fav__added}
          `}
            onClick={handleAddToLikedClick}
          ></button>
        </div>
      </div>
    </section>
  );
};
