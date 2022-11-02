import React, { useState } from 'react';
import classNames from 'classnames';
import productCard from './ProductCard.module.scss';
import { productT } from '../../types/productT';
import imageTest from '../../img/phones/apple-iphone-11/black/00.jpg';

type Props = {
  product: productT;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    category,
    phoneId,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    color,
    ram,
    year,
    image,
  } = product;

  const [addToCart, setAddToCart] = useState(false);
  const [addToFavorites, setAddToFavorites] = useState(false);

  const handleAddToCart = () => {
    setAddToCart(prevState => !prevState);
  };

  const handleAddToFavorites = () => {
    setAddToFavorites(prevState => !prevState);
  };

  const imgSrc = `../../${image}`;

  return (
    <section className={productCard.card}>
      <div className={productCard.card__content}>
        <div className={productCard.card__image}>
          <img src={imageTest} alt="phoneImage" className={productCard.card__image_1}/>
        </div>
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
          {addToCart ? (
            <button
              type="button"
              className={productCard.card__buttons_cart__added}
              onClick={handleAddToCart}
            >
              Added
            </button>
          ) : (
            <button
              type="button"
              className={productCard.card__buttons_cart}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          )}
          {addToFavorites ? (
            <button
              type="button"
              className={productCard.card__buttons_fav__added}
              onClick={handleAddToFavorites}
            >
            </button>
          ) : (
            <button
              type="button"
              className={productCard.card__buttons_fav}
              onClick={handleAddToFavorites}
            >
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
