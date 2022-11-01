import phonePage from './PhonesPage.module.scss';
import { ProductCard } from '../ProductCard';
import home from '../../images/home.svg';
import arrow_right from '../../images/ArrowRight.svg';

export const PhonesPage: React.FC = () => {
  return (
    <section className={phonePage.phones}>
      <div className={phonePage.container}>
        <div className={phonePage.phones__navInfo}>
          <a href="#" className={phonePage.phones__navInfo_home}>
            <img src={home} alt="Home" />
          </a>
          <img src={arrow_right} alt="Arrow" className={phonePage.phones__navInfo_arrow}/>
          <p className={phonePage.phones__navInfo_title}>
            Phones
          </p>
        </div>
        <h1 className={phonePage.phones__title}>
          Mobile Phones
        </h1>
        <p className={phonePage.phones__count}>
          95 models
        </p>
        <div className={phonePage.phones__sort}>
          <div className={phonePage.phones__sort__col}>
            <p>Sort by</p>
            <button
              type="button"
              className={phonePage.phones__sort__dropdown}
            >
              Newest
            </button>
          </div>
          <div className={phonePage.phones__sort__col}>
            <p>Items on page</p>
            <button
              type="button"
              className={phonePage.phones__sort__dropdown_2}
            >
              16
            </button>
          </div>
        </div>

        <div className={phonePage.phones__cards}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
};
