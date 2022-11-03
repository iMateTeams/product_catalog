import React from 'react';
import styles from './Pagination.module.scss';


type Props = {
  dataAmount: number;
  phonesPerPage: number
  setPhonesPerPage: (num: number) => void;
  setCurrentPage: (num: number) => void;
}

export const PaginationPerPage: React.FC<Props> = ({
  dataAmount,
  phonesPerPage,
  setPhonesPerPage,
  setCurrentPage,
}) => {
  

  return(
    <div>
      <p className={styles.pagination_title}>
        Items on page
      </p>
      <div className={styles.pagination_box}>
        <select
          className={styles.pagination_page}
          value={phonesPerPage}
          onChange={event => {
            setPhonesPerPage(+event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="10" className={styles.pagination_page__option}>10</option>
          <option value="16" className={styles.pagination_page__option}>16</option>
          <option value="32" className={styles.pagination_page__option}>32</option>
          <option value="50" className={styles.pagination_page__option}>50</option>
          <option value={dataAmount} className={styles.pagination_page__option}>ALL</option>
        </select>
      </div>
    </div>
  );
};