import React, { useEffect, useState } from 'react';
import { PaginationButtons } from '../../components/Pagination/PaginationButtons';
import { PaginationPerPage } from '../../components/Pagination/PaginationPerPage';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';
import phonePage from './CatalogPage.module.scss';
import home from '../../images/home.svg';

import arrow_right from '../../images/ArrowRight.svg';

type Props = {
  products: Product[];
  currentPage: number;
  setCurrentPage: (num: number) => void;
  phonesPerPage: number;
  setPhonesPerPage: (num: number) => void;
  addOrRemoveCart: (id: number) => void;
  dataAmount: number;
};

export const CatalogPage: React.FC<Props>
  = ({
    products,
    currentPage,
    setCurrentPage,
    phonesPerPage,
    setPhonesPerPage,
    addOrRemoveCart,
    dataAmount,
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
              Phones
            </p>
          </div>
          <h1 className={phonePage.phones__title}>
            Mobile Phones
          </h1>
          <p className={phonePage.phones__count}>
            {dataAmount} models
          </p>
          <div className={phonePage.phones__sort}>
            <PaginationPerPage
              dataAmount={dataAmount}
              phonesPerPage={phonesPerPage}
              setPhonesPerPage={setPhonesPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <div className={phonePage.phones__cards}>
            {products.map(product => {
              return (
                <ProductCard
                  product={product}
                  addOrRemoveCart={addOrRemoveCart}
                  key={product.id}
                />
              );
            }
            )}
          </div>
          <PaginationButtons
            phonesPerPage={phonesPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            dataAmount={dataAmount}
          />
        </div>
      </section>
    );
  };
