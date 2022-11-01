import React, { useEffect, useState } from 'react';
import { PaginationButtons } from '../components/Pagination/PaginationButtons';
import { PaginationPerPage } from '../components/Pagination/PaginationPerPage';
import { ProductCard } from '../components/ProductCard';
import { phones } from '../phones/phones_data';
import { productT } from '../types/productT';

type Props = {
  products: productT[];
}

export const CatalogPage: React.FC<Props> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage, setPhonesPerPage] = useState(16);
  const [visiblePhones, setVisiblePhones] = useState(products.slice(0,phonesPerPage));

  useEffect(() => {
    const lastPhoneIndex = currentPage * phonesPerPage; 
    const firstPhoneIndex = lastPhoneIndex - phonesPerPage;

    setVisiblePhones(phones.slice(firstPhoneIndex,lastPhoneIndex));

  }, [currentPage, phonesPerPage]);

  return(
    <>
      <h1 className="phones_title">Mobile phones</h1>
      <PaginationPerPage 
        amountPhones={products.length}
        phonesPerPage={phonesPerPage}
        setPhonesPerPage={setPhonesPerPage}
        setCurrentPage={setCurrentPage}
      />
      
      <div className="block">
        {visiblePhones.map(product => {
          return (
            <ProductCard product={product} key={product.id}/>
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
    </>
  );
};
