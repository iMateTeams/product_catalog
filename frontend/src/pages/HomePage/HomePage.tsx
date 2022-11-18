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

type Props = {
  addOrRemoveCart: (id: number) => void;
  addOrRemoveLiked: (id: number) => void;
}

export const HomePage: React.FC<Props> = ({ addOrRemoveCart, addOrRemoveLiked }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  SwiperCore.use([Navigation]);

  const handlePageChange = (direction: string) => {
    if (currentPage === 1 && direction === 'prev') {
      setCurrentPage(3);
    } else if (currentPage === 3 && direction === 'next') {
      setCurrentPage(1);
    } else if (direction === 'prev') {
      console.log(currentPage);
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className={style.grid}>
      <h1 className={style.title}>
        Welcome to Nice Gadgets store!
      </h1>

      <div className={style.news_carousel}>
        <div className={style.news_carousel__wrapper}>
          <button
            className={style.news_carousel__button_left}
            onClick={() => handlePageChange('prev')}
            ref={navigationPrevRef}
          >
            <div className={style.news_carousel__button_left_arrow}>

            </div>
          </button>
          <Swiper
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
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
            className={style.news_carousel__button_right}
            onClick={() => handlePageChange('next')}
            ref={navigationNextRef}
          >
            <div className={style.news_carousel__button_right_arrow}>

            </div>
          </button>
        </div>

        <ul className={style.news_carousel__list}>
          <li className={style.news_carousel__list_item}>
            <button className={`${style.news_carousel__list_item_button} ${currentPage === 1 && style.news_carousel__list_item_button_active}`}>

            </button>
          </li>
          <li className={style.news_carousel__list_item}>
            <button className={`${style.news_carousel__list_item_button} ${currentPage === 2 && style.news_carousel__list_item_button_active}`}>

            </button>
          </li>
          <li className={style.news_carousel__list_item}>
            <button className={`${style.news_carousel__list_item_button} ${currentPage === 3 && style.news_carousel__list_item_button_active}`}>

            </button>
          </li>
        </ul>
      </div>
      <NewModels
        addOrRemoveCart={addOrRemoveCart}
        addOrRemoveLiked={addOrRemoveLiked}
      />
      <Category />
      <HotPrices
        addOrRemoveCart={addOrRemoveCart}
        addOrRemoveLiked={addOrRemoveLiked}
      />
    </div>
  );
};