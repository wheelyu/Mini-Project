import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Carousel = () => {
    const carouselData = [
        {
            title: "Low",
            image: "sun1.png",
            range: "0-2",
            description: "Aman untuk aktivitas luar ruangan. Risiko terbakar sangat rendah."
        },
        {
            title: "Medium",
            image: "sun2.png",
            range: "3-5",
            description: "Gunakan kacamata hitam dan sunscreen. Kulit bisa terbakar setelah beberapa jam."
        },
        {
            title: "High",
            image: "sun3.png",
            range: "6-7",
            description: "Disarankan memakai topi, sunscreen, dan kacamata hitam. Kulit bisa terbakar lebih cepat."
        },
        {
            title: "Very High",
            image: "sun4.png",
            range: "8-10",
            description: "Hindari matahari di tengah hari. Wajib sunscreen dan pelindung mata."
        },
        {
            title: "Extremely High",
            image: "sun5.png",
            range: "11+",
            description: "Matahari sangat berbahaya. Wajib pelindung lengkap, dan hindari keluar jika memungkinkan."
        }
    ];

    return (
        <div className="bg-[#588157] dark:bg-[#344E41] py-8 md:py-12 lg:py-16 h-[500px]" id="uv-index">
            <div className="max-w-[90rem] mx-auto px-4 md:px-8 lg:px-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    UV Index
                </h1>
                <p className="text-base md:text-lg lg:text-xl font-bold text-white mb-8 md:mb-12 text-justify" >
                    Angka yang menunjukkan tingkat radiasi ultraviolet (UV) matahari yang mencapai permukaan bumi. Semakin tinggi 
                    angkanya, semakin kuat radiasi UV, dan semakin besar risiko kerusakan kulit, mata, serta risiko kanker kulit.
                </p>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                centeredSlides
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto pb-16"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }}
            >
                {carouselData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="carousel-item bg-[#344E41] text-white dark:bg-[#263a30] shadow-lg rounded-lg min-h-[24rem] scale-90 transition-all duration-300 p-4">
                            <h1 className="text-xl md:text-2xl font-bold mb-4 text-center py-2">
                                {item.title}
                            </h1>
                            <img 
                                src={item.image} 
                                alt={`UV Index ${item.title}`} 
                                className="rounded-lg w-40  mx-auto"
                            />
                            <p className="text-lg md:text-xl font-bold px-2 md:px-4 text-center my-3">
                                {item.range}
                            </p>
                            <p className="px-2 md:px-4 text-justify text-base">
                                {item.description}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;