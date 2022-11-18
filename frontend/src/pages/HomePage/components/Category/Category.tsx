import React from 'react';
import style from './Category.module.scss';
import { NavLink } from 'react-router-dom';
import { PageNavLink } from '../../../../components/PageNavLink';

export const Category: React.FC = () => {
  return (
    <div className={style.category}>
      <h2 className={style.category__title}>
        Shop by category
      </h2>

      <div className={style.category__wrapper}>
        <div className={style.category__wrapper__item}>
          <NavLink to="phones" className={style.category__wrapper__item__link}>
            <div
              className={`${style.category__wrapper__item__link__block} ${style.category__wrapper__item__link__block_1}`}
            >
              <div className={`${style.category__wrapper__item__link__block__img} ${style.category__wrapper__item__link__block__img_phones}`} />
            </div>
            <p className={style.category__wrapper__item__link__text}>
              Mobile phones
            </p>
          </NavLink>

          <p className={style.category__wrapper__item__link__count}>
            && modeles
          </p>
        </div>

        <div className={style.category__wrapper__item}>
          <NavLink to="tablets" className={style.category__wrapper__item__link}>
            <div
              className={`${style.category__wrapper__item__link__block} ${style.category__wrapper__item__link__block_2}`}
            >
              <div className={`${style.category__wrapper__item__link__block__img} ${style.category__wrapper__item__link__block__img_tablets}`} />
            </div>
            <p className={style.category__wrapper__item__link__text}>
              Tablets
            </p>
          </NavLink>

          <p className={style.category__wrapper__item__link__count}>
            && modeles
          </p>
        </div>

        <div className={style.category__wrapper__item}>
          <NavLink to="accessories" className={style.category__wrapper__item__link}>
            <div
              className={`${style.category__wrapper__item__link__block} ${style.category__wrapper__item__link__block_3}`}
            >
              <div className={`${style.category__wrapper__item__link__block__img} ${style.category__wrapper__item__link__block__img_accessories}`} />
            </div>
            <p className={style.category__wrapper__item__link__text}>
              Accessories
            </p>
          </NavLink>

          <p className={style.category__wrapper__item__link__count}>
            && modeles
          </p>
        </div>
      </div>
    </div>
  );
};
