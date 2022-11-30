import React, { useState, useEffect, Component } from 'react';
import classNames from 'classnames';
import productCard from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleAddToCart } from '../../features/products/productsSlice';

type Props = {
  product: Product;
  // handleAddToCart: (product: Product) => void;
  handleAddToFavorites: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({
  product,
  // handleAddToCart,
  handleAddToFavorites
}) => {
  const {
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    inCart,
    liked,
  } = product;

  const [img, setImg] = useState('');

  const dispatch = useAppDispatch();
  const productsInCart = useAppSelector(state => state.products.itemsInCart);
  const products = useAppSelector(state => state.products.items);

  useEffect(() => {
    // fetch(`https://i-mate-teams-product-catalog.herokuapp.com/${image}`)
    fetch(`http://localhost:4002/${image}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImg(url);
      });
  }, [image]);  

  return (
    <section className={productCard.card}>
      <div className={productCard.card__content}>
        <img src={img} alt="phoneImage" className={productCard.card__image} />
        <div className={productCard.card__name}>
          {name}
        </div>
        <div className={productCard.card__price}>
          <div className={productCard.card__price_current}>
            {`${price}$`}
          </div>
          <div className={productCard.card__price_full}>
            {`${fullPrice}$`}
          </div>
        </div>
        <div className={productCard.card__specs}>
          <div className={productCard.card__specs_block}>
            <div className={productCard.card__specs_title}>
              Screen
            </div>
            <div className={productCard.card__specs_value}>
              {screen}
            </div>
          </div>
          <div className={productCard.card__specs_block}>
            <div className={productCard.card__specs_title}>
              Capacity
            </div>
            <div className={productCard.card__specs_value}>
              {capacity}
            </div>
          </div>
          <div className={productCard.card__specs_block}>
            <div className={productCard.card__specs_title}>
              RAM
            </div>
            <div className={productCard.card__specs_value}>
              {ram}
            </div>
          </div>
        </div>
        <div className={productCard.card__buttons}>
          <button
            type="button"
            className={`
              ${productCard.card__buttons_cart} 
              ${inCart && productCard.card__buttons_cart__added}
            `}
            onClick={() => dispatch(handleAddToCart(product))}
          >
            {inCart ? 'Added' : 'Add to cart'}
          </button>
          <button
            type="button"
            className={`
            ${productCard.card__buttons_fav} 
            ${liked && productCard.card__buttons_fav__added}
          `}
            onClick={() => handleAddToFavorites(product)}
          >
          </button>
        </div>
      </div>
    </section>
  );
};
