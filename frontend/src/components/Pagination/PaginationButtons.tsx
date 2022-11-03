import classNames from 'classnames';
import React from 'react';
import styles from './Pagination.module.scss';
import { Product } from '../../types/Product';



type Props = {
  phonesPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  dataAmount: number;
};

function getButtons(start: number, finish: number): number[] {
  const numbers = [];

  for (let i = start; i <= finish; i++) {
    numbers.push(i);
  }

  return numbers;
}

export const PaginationButtons: React.FC<Props> = ({
  phonesPerPage,
  currentPage,
  setCurrentPage,
  dataAmount,
}) => {
  const totalPages = Math.ceil(dataAmount / phonesPerPage);


  const handlePageNumberClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const nextPage = +(event.currentTarget.dataset.page || 0);

    if (
      nextPage === currentPage || nextPage < 1 || nextPage > totalPages
    ) {
      return;
    }

    setCurrentPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return(
    <div className={styles.pagination}>
      <ul className={styles.pagination}>
        <li
          className={classNames(
            styles.pagination_list,
            {
              [styles.pagination_disabled]: currentPage === 1,
            },
          )}
        >
          <button 
            className={classNames(
              styles.pagination_button, 
              styles.pagination_button__left_right
            )}
            disabled={currentPage === 1}
          >
            <a
              data-cy="prevLink"
              className={classNames(
                styles.pagination_link,
                styles.pagination_link__left_right,
                {
                  [styles.pagination_disabled]: currentPage === 1,
                },
              )}
              aria-disabled={currentPage === 1}
              data-page={currentPage - 1}
              onClick={handlePageNumberClick}
            >
              {'<'}
            </ a>
          </button>
          
        </li>
        {
          getButtons(1, totalPages)
            .map(page => (
              <li
                className={styles.pagination_list}
                key={page}
              >
                <button 
                  className={styles.pagination_button}
                >
                  <a
                    data-cy="pageLink"
                    className={classNames(
                      styles.pagination_link,
                      {
                        [styles.pagination_active]: page === currentPage,
                      },
                    )}
                    href={`#${page}`}
                    data-page={page}
                    onClick={handlePageNumberClick}
                  >
                    {`   ${page}   `}
                  </a>
                </button>
                
              </li>
            ))
        }
        <li
          className={classNames(
            styles.pagination_list,
            {
              [styles.pagination_disabled]: currentPage === totalPages,
            },
          )}
        >
          <button className={classNames(
            styles.pagination_button, 
            styles.pagination_button__left_right
          )}
          >
            <a
              className={classNames(
                styles.pagination_link,
                styles.pagination_link__left_right
              )}
              aria-disabled={currentPage === totalPages}
              data-page={currentPage + 1}
              onClick={handlePageNumberClick}
            >
              {'>'}
            </a>
          </button>
          
        </li>
      </ul>
    </div>
  );
};