import React, { useEffect, useState } from 'react';
import { PaginationButtons } from '../components/Pagination/PaginationButtons';
import { PaginationPerPage } from '../components/Pagination/PaginationPerPage';
import { ProductCard } from '../components/ProductCard';
import { phones } from '../phones/phones_data';
import { Product } from '../types/Product';
import phonePage from './styles/CatalogPage.module.scss';
import home from '../images/home.svg';

import arrow_right from '../images/ArrowRight.svg';

type Props = {
  products: Product[];
  addOrRemoveCart: (id: number) => void;
}

export const CatalogPage: React.FC<Props> = ({ products , addOrRemoveCart }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage, setPhonesPerPage] = useState(16);
  const [visiblePhones, setVisiblePhones] = useState(products.slice(0,phonesPerPage));
 

  // console.log(products);
  // console.log(visiblePhones);
 

  useEffect(() => {
    const lastPhoneIndex = currentPage * phonesPerPage; 
    const firstPhoneIndex = lastPhoneIndex - phonesPerPage;

    setVisiblePhones(phones.slice(firstPhoneIndex,lastPhoneIndex));

  }, [currentPage, phonesPerPage]);

  return (
    <section className={phonePage.phones}>
      <div className={phonePage.container}>
        <div className={phonePage.phones__navInfo}>
          <a href="#" className={phonePage.phones__navInfo_home}>
            <img src={home} alt="Home" />
          </a>
          <img src={arrow_right} alt="Arrow" className={phonePage.phones__navInfo_arrow}/>
          <p className={phonePage.phones__navInfo_title}>
            Phones
          </p>
        </div>
        <h1 className={phonePage.phones__title}>
          Mobile Phones
        </h1>
        <p className={phonePage.phones__count}>
          95 models
        </p>
        <div className={phonePage.phones__sort}>
          <PaginationPerPage 
            amountPhones={products.length}
            phonesPerPage={phonesPerPage}
            setPhonesPerPage={setPhonesPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div className={phonePage.phones__cards}>
          {visiblePhones.map(product => {
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
          amountPhones={products.length}
          phonesPerPage={phonesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};
