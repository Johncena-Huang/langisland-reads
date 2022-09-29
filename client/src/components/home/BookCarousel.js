import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BookCarousel.css";
const BookCarousel = ({ bookCollection }) => {
  const renderBookSlide = () => {
    return bookCollection.map(({ bookUrl, imgUrl }, index) => (
      <SwiperSlide key={index}>
        <a href={bookUrl} target="_blank">
          <img src={imgUrl} alt={`book-${index}`} />
        </a>
      </SwiperSlide>
    ));
  };
  return (
    <div className=" mb-3">
      <h2 className="text-center mb-5 books-pick" style={{ color: "#78B6AF" }}>
        Best picks of the year
      </h2>
      <Swiper
        className="container"
        spacebetween={30}
        slidesPerView={1}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          992: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {renderBookSlide()}
      </Swiper>
    </div>
  );
};

export default BookCarousel;
