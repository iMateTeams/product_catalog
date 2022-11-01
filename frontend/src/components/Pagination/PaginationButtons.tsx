import classNames from 'classnames';
import React from 'react';
import '../../components/Pagination/Pagination.scss';



type Props = {
  amountPhones: number;
  phonesPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

function getButtons(start: number, finish: number): number[] {
  const numbers = [];

  for (let i = start; i <= finish; i++) {
    numbers.push(i);
  }

  return numbers;
}

export const PaginationButtons: React.FC<Props> = ({
  amountPhones,
  phonesPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(amountPhones / phonesPerPage);


  const handlePageNumberClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const nextPage = +(event.currentTarget.dataset.page || 0);

    if (
      nextPage === currentPage || nextPage < 1 || nextPage > totalPages
    ) {
      return;
    }

    setCurrentPage(nextPage);
  };

  return(
    <div className="pagination">
      <ul className="pagination">
        <li
          className={classNames(
            'pagination_list',
            {
              pagination_disabled: currentPage === 1,
            },
          )}
        >
          <button 
            className="pagination_button pagination_button--left-ritgh"
            disabled={currentPage === 1}
          >
            <a
              data-cy="prevLink"
              className={classNames(
                'pagination_link',
                'pagination_link--left-ritgh',
                {
                  pagination_disabled: currentPage === 1,
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
                className="pagination_list"
                key={page}
              >
                <button 
                  className="pagination_button"
                  disabled={page === currentPage}
                >
                  <a
                    data-cy="pageLink"
                    className={classNames(
                      'pagination_link',
                      {
                        pagination_active: page === currentPage,
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
            'pagination_list',
            {
              pagination_disabled: currentPage === totalPages,
            },
          )}
        >
          <button className="pagination_button pagination_button--left-ritgh">
            <a
              className="pagination_link pagination_link--left-ritgh"
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