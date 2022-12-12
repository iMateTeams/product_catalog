import React, { useRef } from 'react';
import style from './Main.module.scss';
import { NewModels } from './components/NewModels';
import { Category } from './components/Category';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { HotPrices } from './components/HotPrices';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

export const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  SwiperCore.use([Navigation]);

  return (
    <div className={style.grid}>
      <h1 className={style.title}>
        Welcome to Nice Gadgets store!
      </h1>

      <div className={style.news_carousel}>
        <div className={style.news_carousel__wrapper}>
          <button
            className={style.news_carousel__button}
            // onClick={() => handlePageChange('prev')}
            ref={navigationPrevRef}
          >
            <div className={`${style.news_carousel__button__arrow} ${style.news_carousel__button__arrow_left}`}>
            </div>
          </button>
          <Swiper
            onSlideChange={(swiper) => {
              console.log(swiper.activeIndex);
              if (swiper.activeIndex === 0) {
                setCurrentPage(0);
              } else if (swiper.activeIndex === 1) {
                setCurrentPage(1);
              } else {
                setCurrentPage(swiper.activeIndex);
              }
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            spaceBetween={50}
          >
            <SwiperSlide>
              <div className={style.news_carousel__banner}>
                <div className={style.news_carousel__banner_order}>
                  <h2 className={style.news_carousel__banner_order_title}>
                    Now available in our store!👌
                  </h2>
                  <p className={style.news_carousel__banner_order_text}>
                    Be the first!
                  </p>
                </div>

                <div className={style.news_carousel__banner_presentation}
                >
                  <p className={style.news_carousel__banner_presentation_text}>
                    iPhone 14 pro
                  </p>

                  <p className={style.news_carousel__banner_presentation_text_small}>
                    Pro. Beyond.
                  </p>

                  <div className={`${style.news_carousel__banner_presentation_img} ${style.news_carousel__banner_presentation_img_phone}`}>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={style.news_carousel__banner}>
                <div className={style.news_carousel__banner_order}>
                  <h2 className={style.news_carousel__banner_order_title}>
                    Now available in our store!👌
                  </h2>
                  <p className={style.news_carousel__banner_order_text}>
                    Be the first!
                  </p>
                </div>

                <div className={style.news_carousel__banner_presentation}
                >
                  <p className={style.news_carousel__banner_presentation_text}>
                    iPad 15 pro
                  </p>

                  <p className={style.news_carousel__banner_presentation_text_small}>
                    Pro. Beyond.
                  </p>

                  <div className={`${style.news_carousel__banner_presentation_img} ${style.news_carousel__banner_presentation_img_pad}`}>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className={style.news_carousel__banner_image}>
              </div>
            </SwiperSlide>
          </Swiper>
          <button
            className={style.news_carousel__button}
            // onClick={() => handlePageChange('next')}
            ref={navigationNextRef}
          >
            <div className={`${style.news_carousel__button__arrow} ${style.news_carousel__button__arrow_right}`}>
            </div>
          </button>
        </div>

        <ul className={style.news_carousel__list}>
          <li className={style.news_carousel__list_item}>
            <button className={`${style.news_carousel__list_item_button} ${currentPage === 0 && style.news_carousel__list_item_button_active}`} />
          </li>
          <li className={style.news_carousel__list_item}>
            <button className={`${style.news_carousel__list_item_button} ${currentPage === 1 && style.news_carousel__list_item_button_active}`} />
          </li>
          <li className={style.news_carousel__list_item}>
            <button className={`${style.news_carousel__list_item_button} ${currentPage === 2 && style.news_carousel__list_item_button_active}`} />
          </li>
        </ul>
      </div>
      <NewModels />
      <Category />
      <HotPrices />
    </div>
  );
};