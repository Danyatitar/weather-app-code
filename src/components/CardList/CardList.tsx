import React, { useContext } from "react";
import { DailyForecast, Forecast } from "../../hooks/useForm";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./cardList.css";

import { Navigation, Pagination } from "swiper";

type CardListType = {
  forecast: Forecast;
  location: string;
  more?: (date: Date, index: number, city: string) => void;
};

const CardList = ({ forecast, location, more }: CardListType) => {
  const pagination = {
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };
  return (
    <Swiper
      slidesPerView={1}
      cssMode={true}
      spaceBetween={50}
      navigation={true}
      pagination={pagination}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        500: {
          // navigation: {
          //   enabled: false,
          // },
          slidesPerView: 1,
        },
        925: {
          // navigation: {
          //   enabled: true,
          // },
          slidesPerView: 2,
        },
        1450: {
          // navigation: {
          //   enabled: true,
          // },
          slidesPerView: 3,
        },
      }}
    >
      {forecast.daily.map((item, index) => (
        <SwiperSlide key={index}>
          <Card
            index={index}
            forecast={item}
            city={location}
            more={more}
            button={true}
          ></Card>
        </SwiperSlide>
      ))}
      ;
    </Swiper>
  );
};
export default CardList;
