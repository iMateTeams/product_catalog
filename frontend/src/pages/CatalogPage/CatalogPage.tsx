import React from 'react';
import { PaginationButtons } from '../../components/Pagination/PaginationButtons';
import { PaginationPerPage } from '../../components/Pagination/PaginationPerPage';
import { ProductCard } from '../../components/ProductCard';
import phonePage from './CatalogPage.module.scss';
import home from '../../images/home.svg';

import arrow_right from '../../images/ArrowRight.svg';
import { SortBy } from '../../types/SortBy';
import { Loader } from '../../components/Loader';
import { useAppSelector } from '../../app/hooks';

type Props = {
  currentPage: number;
  setCurrentPage: (num: number) => void;
  phonesPerPage: number;
  setPhonesPerPage: (num: number) => void;
  sortBy: SortBy | string;
  setSortBy: (sort: SortBy | string) => void;
};

export const CatalogPage: React.FC<Props>
  = ({
    currentPage,
    setCurrentPage,
    phonesPerPage,
    setPhonesPerPage,
    sortBy,
    setSortBy,
  }) => {
    const products = useAppSelector(state => state.products.items);
    const isLoadind = useAppSelector(state => state.products.loadingMainData);
    const dataLength = useAppSelector(state => state.products.dataLength);


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
          {isLoadind
            ? <Loader />
            : (<>

              <p className={phonePage.phones__count}>
                {dataLength} models
              </p>
      
              <div className={phonePage.phones__sort}>
                <PaginationPerPage
                  dataLength={dataLength}
                  phonesPerPage={phonesPerPage}
                  setPhonesPerPage={setPhonesPerPage}
                  setCurrentPage={setCurrentPage}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
          
              <div className={phonePage.phones__cards}>
                {products.map(product => {
                  return (
                    <ProductCard
                      product={product}
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
                dataLength={dataLength}
              />  
            </>
            )
          }
        </div>
      </section>
    );
  };
