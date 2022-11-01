import React from 'react';
import '../../components/Pagination/Pagination.scss';


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
      <p className='pagination_title'>
        Items on page
      </p>
      <div className="pagination_box">
        <select
          className="pagination_page"
          value={phonesPerPage}
          onChange={event => {
            setPhonesPerPage(+event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="10" className="pagination_page--option">10</option>
          <option value="16" className="pagination_page--option" selected>16</option>
          <option value="32" className="pagination_page--option">32</option>
          <option value="50" className="pagination_page--option">50</option>
          <option value={amountPhones} className="pagination_page--option">ALL</option>
        </select>
      </div>
    </div>
  );
};