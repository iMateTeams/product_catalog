import classNames from 'classnames';
import React from 'react';
import styles from './Pagination.module.scss';

type Props = {
  phonesPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  dataLength: number;
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
  dataLength,
}) => {
  const totalPages = Math.ceil(dataLength / phonesPerPage);


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
            styles.pagination__list,
            {
              [styles.pagination__disabled]: currentPage === 1,
            },
          )}
        >
          <button 
            className={classNames(
              styles.pagination__button, 
              styles.pagination__button_left_right
            )}
            disabled={currentPage === 1}
          >
            <a
              data-cy="prevLink"
              className={classNames(
                styles.pagination__link,
                styles.pagination__link_left_right,
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
                className={styles.pagination__list}
                key={page}
              >
                <button 
                  className={styles.pagination__button}
                >
                  <a
                    data-cy="pageLink"
                    className={classNames(
                      styles.pagination__link,
                      {
                        [styles.pagination__active]: page === currentPage,
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
            styles.pagination__list,
            {
              [styles.pagination__disabled]: currentPage === totalPages,
            },
          )}
        >
          <button className={classNames(
            styles.pagination__button, 
            styles.pagination__button_left_right
          )}
          >
            <a
              className={classNames(
                styles.pagination__link,
                styles.pagination__link_left_right
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