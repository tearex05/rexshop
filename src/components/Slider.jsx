import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import Dumbbell from "../assets/dumbbell.png";
import Fridge from "../assets/fridge.png";
import Headphone from "../assets/headphone.png";
import Laptop from "../assets/laptops.png";

export default function Slider() {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                loop={true}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                centeredSlides={true}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="bg-red-500 h-52 w-full flex items-center justify-between">
                        <p className="text-3xl font-bold ml-2 md:text-5xl">
                            Music EveryWhere
                            <br />
                            <span className="text-xl font-normal md:text-2xl">
                                50% off for headphones
                            </span>
                        </p>
                        <img src={Headphone} className="w-1/2 max-w-lg" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg-blue-500 h-52 w-full flex items-center justify-between">
                        <p className="text-5xl font-bold ml-2 md:text-7xl">
                            Best Fridges Ever
                        </p>
                        <img src={Fridge} className="w-1/3 translate-y-10" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg-slate-200 h-52 w-full flex items-center relative text-center">
                        <p className="text-5xl font-bold ml-2 absolute bottom-0 mb-6 z-10 md:text-7xl">
                            Fitness Equipments
                        </p>
                        <img
                            src={Dumbbell}
                            className="absolute z-0 w-1/2 opacity-60 left-1/3 right-1/2"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg-purple-500 h-52 w-full flex items-center justify-center text-center">
                        <p className="text-5xl font-bold ml-2 md:text-6xl absolute z-10 text-white">
                            Top Selling Laptops
                        </p>
                        <img src={Laptop} className="w-1/2 opacity-80" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
