import React from 'react';
import { Product } from '../../types/Product';

import phonePage from '../../pages/CatalogPage/CatalogPage.module.scss';
import home from '../../images/home.svg';
import arrow_right from '../../images/ArrowRight.svg';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';

type Props = {
  products: Product[];
  addOrRemoveCart: (id: number) => void;
  addOrRemoveLiked: (id: number) => void;
  isLoad: boolean;
};

export const FavoritesPage:React.FC<Props> = ({
  products,
  addOrRemoveCart,
  addOrRemoveLiked,
  isLoad,
}) => {
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
        {!isLoad 
          ? <Loader />
          : (<>
            <p className={phonePage.phones__count}>
              {products.length} models
            </p>
            <div className={phonePage.phones__cards}>
              {products.map(product => {
                return (
                  <ProductCard
                    product={product}
                    addOrRemoveCart={addOrRemoveCart}
                    addOrRemoveLiked={addOrRemoveLiked}
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