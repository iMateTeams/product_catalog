import style from './NewModels.module.scss';
import { ProductCard } from '../../../../components/ProductCard';
import { getNewest } from '../../../../api/products';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { setNewModels } from '../../../../features/products/productsSlice';

export const NewModels: React.FC = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  SwiperCore.use([Navigation]);
  
  const dispatch = useAppDispatch();
  const newModels = useAppSelector(state => state.products.newModels);

  useEffect(() => {
    const fetchNewModeles = async () =>{
      const newModelesData = await getNewest()
        .then((res) => {
          dispatch(setNewModels(res.data));
        });

      return newModelesData;
    };

    fetchNewModeles();
  }, []);

  const handleNext = () => {
    // scroll element to the right

    const element = document.querySelector('.swiper-wrapper');

    if (element) {
      element.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }

  };

  return (
    <section className={style.new_models}>
      <div className={style.new_models__top}>
        <h2 className={style.new_models__top_title}>
          Brand new models
        </h2>

        <div className={style.new_models__top__button}>
          <button
            ref={navigationPrevRef}
            className={`${style.new_models__top__button_left} ${style.button} ${style.swiper_button_next}`}
          />
          <button
            className={`${style.new_models__top__button_right} ${style.button}`}
            onClick={handleNext}
            ref={navigationNextRef}
          />
        </div>
      </div>

      <div className={style.new_models__list}>
        <Swiper
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 2.5 },
            1200: { slidesPerView: 4 },
          }}

          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
        >
          {newModels.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                key={product.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* swipper with custom buttons  */}
    </section>
  );
};