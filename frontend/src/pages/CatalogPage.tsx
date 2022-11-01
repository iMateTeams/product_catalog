import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { productT } from '../types/productT';

type Props = {
  products: productT[];
}
export const CatalogPage: React.FC<Props> = ({ products }) => {

  return(
    <>
      <h1 className="title">Catalog</h1>
      <div className="block">
        {products.map(product => {
          return (
            <ProductCard product={product} key={product.id}/>
          );
        }
        )}
      </div>
    </>
  );
};