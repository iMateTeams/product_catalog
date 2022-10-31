import React, { useState } from 'react';
import classNames from 'classnames';
import './ProductCard.scss';
import image from '../../images/image.jpg';
// import { Card } from './types/card';

/*type Props = {
  card: Card;
}*/

export const ProductCard: React.FC/*<Props>*/ = (/* { card } */) => {
/*  const {
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
  } = card;
*/
  const [addToCart, setAddToCart] = useState(false);
  const [addToFavorites, setAddToFavorites] = useState(false);

  const handleAddToCart = () => {
    setAddToCart(prevState => !prevState);
  };

  const handleAddToFavorites = () => {
    setAddToFavorites(prevState => !prevState);
  };
  return (
    <section className="card">
      <div className="card__content">
        <img src={image} alt="phoneImage" className="card__image" />
        <div className="card__name">
          {/* {name} */}
          Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
        </div>
        <div className="card__price">
          <div className="card__price-current">
            {/* {price} */}
            $799
          </div>
          <div className="card__price-full">
            {/* {fullPrice} */}
            $899
          </div>
        </div>
        <div className="card__specs">
          <div className="card__specs-block">
            <div className="card__specs-title">
              Screen
            </div>
            <div className="card__specs-value">
              {/* {screen} */}
              5.8” OLED
            </div>
          </div>
          <div className="card__specs-block">
            <div className="card__specs-title">
              Capacity
            </div>
            <div className="card__specs-value">
              {/* {capacity} */}
              64 GB
            </div>
          </div>
          <div className="card__specs-block">
            <div className="card__specs-title">
              RAM
            </div>
            <div className="card__specs-value">
              {/* {ram} */}
              4 GB
            </div>
          </div>
        </div>
        <div className="card__buttons">
          {addToCart ? (
            <button
              type="button"
              className="card__buttons-cart"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              className="card__buttons-cart card__buttons-cart--added"
              onClick={handleAddToCart}
            >
              Added
            </button>
          )}
          <button
            type="button"
            className={classNames(
              'card__buttons-fav',
              { 'card__buttons-fav--added': addToFavorites }
            )}
            onClick={handleAddToFavorites}
          >
          </button>
        </div>
      </div>
    </section>
  );
};
