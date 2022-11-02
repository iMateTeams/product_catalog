import React from 'react';
import pagination from '../../components/Pagination/Pagination.module.scss';


type Props = {
  amountPhones:number;
  phonesPerPage: number
  setPhonesPerPage: (num: number) => void;
  setCurrentPage: (num: number) => void;
}

export const PaginationPerPage: React.FC<Props> = ({
  amountPhones,
  phonesPerPage,
  setPhonesPerPage,
  setCurrentPage,
}) => {
  

  return(
    <div>
      <p className={pagination.pagination_title}>
        Items on page
      </p>
      <div className={pagination.pagination_box}>
        <select
          className={pagination.pagination_page}
          value={phonesPerPage}
          onChange={event => {
            setPhonesPerPage(+event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="10" className={pagination.pagination_page__option}>10</option>
          <option value="16" className={pagination.pagination_page__option} selected>16</option>
          <option value="32" className={pagination.pagination_page__option}>32</option>
          <option value="50" className={pagination.pagination_page__option}>50</option>
          <option value={amountPhones} className={pagination.pagination_page__option}>ALL</option>
        </select>
      </div>
    </div>
  );
};