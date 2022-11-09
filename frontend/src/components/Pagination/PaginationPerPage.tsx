import React from 'react';
import { SortBy } from '../../types/SortBy';
import styles from './Pagination.module.scss';


type Props = {
  dataAmount: number;
  phonesPerPage: number
  setPhonesPerPage: (num: number) => void;
  setCurrentPage: (num: number) => void;
  sortBy:SortBy | string;
  setSortBy: (sort: SortBy | string) => void;
}

export const PaginationPerPage: React.FC<Props> = ({
  dataAmount,
  phonesPerPage,
  setPhonesPerPage,
  setCurrentPage,
  sortBy,
  setSortBy,
}) => {
  

  return(
    <div className={styles.pagination} >
      <div className={styles.pagination__section}>
        <p className={styles.pagination__title}>
          Sort By
        </p>
        <div className={styles.pagination__box}>
          <select
            className={styles.pagination__page}
            value={sortBy}
            onChange={event => {
              setSortBy(event.target.value);
              console.log(event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value={SortBy.age} className={styles.pagination__page_sort}>{SortBy.age}</option>
            <option value={SortBy.title} className={styles.pagination__page_sort}>{SortBy.title}</option>
            <option value={SortBy.price} className={styles.pagination__page_sort}>{SortBy.price}</option>
          </select>
        </div>
      </div>
      <div className={styles.pagination__section}>
        <p className={styles.pagination__title}>
          Items on page
        </p>
        <div className={styles.pagination__box}>
          <select
            className={styles.pagination__page}
            value={phonesPerPage}
            onChange={event => {
              setPhonesPerPage(+event.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="10" className={styles.pagination__page_sort}>10</option>
            <option value="16" className={styles.pagination__page_sort}>16</option>
            <option value="32" className={styles.pagination__page_sort}>32</option>
            <option value="50" className={styles.pagination__page_sort}>50</option>
            <option value={dataAmount} className={styles.pagination__page_sort}>ALL</option>
          </select>
        </div>
      </div>
    </div>
  );
};