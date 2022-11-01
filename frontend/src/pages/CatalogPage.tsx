// import React from 'react';
import { phones } from '../phones/phones_data';
export const CatalogPage = () => {

  return(
    <>
      <h1 className="title">Catalog</h1>
      <div className="block">
        {phones.map(phone => {
          const {
            id,
            category,
            name,
            price,
          } = phone;

          return (
            <tr
              data-cy="phone"
              key={id}
              className='has-background-warning'
            >
              <td>{category}</td>
              <td>{name}</td>
              <td>{price}</td>
            </tr>
          );
        }
        )}
      </div>
    </>
  );
};