import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './ProductCard.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  addOrRemoveCart: (id: number) => void;
  
}

export const ProductCard: React.FC<Props> = ({ product, addOrRemoveCart }) => {
  const {
    id,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
    inCart,
  } = product;

  const [addToFavorites, setAddToFavorites] = useState(false);

  const handleAddToFavorites = () => {
    setAddToFavorites(prevState => !prevState);
  };

  const [img, setImg] = useState('');

  useEffect(() => {
    fetch(`https://i-mate-teams-product-catalog.herokuapp.com/${image}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setImg(url);
      });
  }, [image]);


  return (
    <section className="card">
      <div className="card__content">
        <img src={img}  alt="phoneImage" className="card__image" />
        <div className="card__name">
          {name}
        </div>
        <div className="card__price">
          <div className="card__price-current">
            {`${price}€`}
          </div>
          <div className="card__price-full">
            {`${fullPrice}€`}
          </div>
        </div>
        <div className="card__specs">
          <div className="card__specs-block">
            <div className="card__specs-title">
              Screen
            </div>
            <div className="card__specs-value">
              {screen}
            </div>
          </div>
          <div className="card__specs-block">
            <div className="card__specs-title">
              Capacity
            </div>
            <div className="card__specs-value">
              {capacity}
            </div>
          </div>
          <div className="card__specs-block">
            <div className="card__specs-title">
              RAM
            </div>
            <div className="card__specs-value">
              {ram}
            </div>
          </div>
        </div>
        <div className="card__buttons">
          {inCart ? (
            <button
              type="button"
              className="card__buttons-cart card__buttons-cart--added"
              onClick={() => addOrRemoveCart(+product.id)}
            >
              Added
            </button>
          ) : (
            <button
              type="button"
              className="card__buttons-cart"
              onClick={() => addOrRemoveCart(+product.id)}
            >
             Add to cart
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
