import style from './HotPrices.module.scss';
import { ProductCard } from '../../../../components/ProductCard';
import { getBestPrice } from '../../../../api/products';
import { useEffect, useState, useRef } from 'react';
import { Product } from '../../../../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

type Props = {
  handleAddToCart: (product: Product) => void;
  handleAddToFavorites: (product: Product) => void;
}

export const HotPrices: React.FC<Props> = ({ handleAddToCart, handleAddToFavorites }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    getBestPrice()
      .then((products) => {
        setProducts(products);
      });
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
          Hot prices
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
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                // handleAddToCart={handleAddToCart}
                handleAddToFavorites={handleAddToFavorites}
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