import React from 'react';
import { Product } from '../../types/Product';

import phonePage from '../../pages/CatalogPage/CatalogPage.module.scss';
import home from '../../images/home.svg';
import arrow_right from '../../images/ArrowRight.svg';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';
import { useAppSelector } from '../../app/hooks';

type Props = {
  handleAddToCart: (product: Product) => void;
  handleAddToFavorites: (product: Product) => void;
};

export const FavoritesPage:React.FC<Props> = ({
  handleAddToCart,
  handleAddToFavorites,
}) => {
  const products = useAppSelector(state => state.products.items);
  const isLoading = useAppSelector(state => state.products.loading);

  const favorites = products.filter(product => product?.liked);

  return (
    <section className={phonePage.phones}>
      <div className={phonePage.container}>
        <div className={phonePage.phones__navInfo}>
          <a href="#" className={phonePage.phones__navInfo_home}>
            <img src={home} alt="Home" />
          </a>
          <img src={arrow_right} alt="Arrow" className={phonePage.phones__navInfo_arrow} />
          <p className={phonePage.phones__navInfo_title}>
          Favorites
          </p>
        </div>
        <h1 className={phonePage.phones__title}>
          Favorites
        </h1>
        {isLoading
          ? <Loader />
          : (<>
            <p className={phonePage.phones__count}>
              {favorites.length} models
            </p>
            <div className={phonePage.phones__cards}>
              {favorites.map(product => {
                return (
                  <ProductCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleAddToFavorites={handleAddToFavorites}
                    key={product.id}
                  />
                );
              }
              )}
            </div>
          </>
          )
        }
      </div>
    </section>
  );
};