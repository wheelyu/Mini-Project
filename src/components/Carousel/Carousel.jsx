// components/Carousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

// Optional jika ingin menambahkan navigasi atau pagination
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
const Carousel = () => {
    return (
        <div className="bg-[#415A77] dark:bg-[#1b263b] max-h-[100rem]">
            <h1 className="text-4xl font-bold text-white mb-4 max-w-[100rem] w-full mx-auto px-10 pt-10" data-aos="fade-right">UV Index</h1>
            <p className="text-xl font-bold text-white mb-4 max-w-[100rem] w-full mx-auto px-10 pt-10 text-justify" data-aos="fade-right">
                Angka yang menunjukkan tingkat radiasi ultraviolet (UV) matahari yang mencapai permukaan bumi. Semakin tinggi 
                angkanya, semakin kuat radiasi UV, dan semakin besar risiko kerusakan kulit, mata, serta risiko kanker kulit. 
                Indeks ini membantu kita menentukan kapan harus memakai perlindungan, seperti sunscreen, kacamata hitam, dan topi, 
                untuk melindungi diri dari paparan sinar UV yang berbahaya.
            </p>
            <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      
      centeredSlides
      autoplay={{ delay: 5000, disableOnInteraction: false }} // menambahkan autoplay

      style={{ width: '60%', margin: '0 auto',position: 'relative',bottom: '-80px' }} // mengatur agar carousel berada di tengah
      data-aos="fade-right" data-aos-delay="200"
    >
      <SwiperSlide>
        <div className="carousel-item bg-white dark:text-white dark:bg-gray-800 shadow-lg mb-5 rounded-lg min-h-96 scale-90 hover:scale-100 transition-all duration-300">
        <h1 className="text-2xl font-bold  mb-4 text-center py-3">Low</h1>
          <img src="sun1.png" alt="Slide 1" className="rounded-lg w-40 justify-center mx-auto" />
          <p className=' text-xl font-bold px-5 text-center '>0-2</p>
          <p className='px-5 text-justify'>Aman untuk aktivitas luar ruangan. Risiko terbakar sangat rendah.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-item bg-white dark:text-white dark:bg-gray-800 shadow-lg mb-5 rounded-lg min-h-96 scale-90 hover:scale-100 transition-all duration-300">
        <h1 className="text-2xl font-bold mb-4 text-center py-3">Medium</h1>
          <img src="sun2.png" alt="Slide 1" className="rounded-lg w-40 justify-center mx-auto" />
          <p className=' text-xl font-bold px-5 text-center '>3-5</p>
          <p className='px-5 text-justify'>Gunakan kacamata hitam dan sunscreen. Kulit bisa terbakar setelah beberapa jam.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-item bg-white dark:text-white dark:bg-gray-800 shadow-lg mb-5 rounded-lg min-h-96 scale-90 hover:scale-100 transition-all duration-300">
        <h1 className="text-2xl font-bold mb-4 text-center py-3">High</h1>
          <img src="sun3.png" alt="Slide 1" className="rounded-lg w-40 justify-center mx-auto" />
          <p className=' text-xl font-bold px-5 text-center '>6-7</p>
          <p className='px-5 text-justify'>Disarankan memakai topi, sunscreen, dan kacamata hitam. Kulit bisa terbakar lebih cepat. </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-item bg-white dark:text-white dark:bg-gray-800 shadow-lg mb-5 rounded-lg min-h-96 scale-90 hover:scale-100 transition-all duration-300">
        <h1 className="text-2xl font-bold mb-4 text-center py-3">Very High</h1>
          <img src="sun4.png" alt="Slide 1" className="rounded-lg w-40 justify-center mx-auto" />
          <p className=' text-xl font-bold px-5 text-center '>8-10</p>
          <p className='px-5 text-justify'>Hindari matahari di tengah hari. Wajib sunscreen dan pelindung mata.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="carousel-item bg-white dark:text-white dark:bg-gray-800 shadow-lg mb-5 rounded-lg min-h-96 scale-90 hover:scale-100 transition-all duration-300">
        <h1 className="text-2xl font-bold mb-4 text-center py-3">Extremely High</h1>
          <img src="sun5.png" alt="Slide 1" className="rounded-lg w-40 justify-center mx-auto" />
          <p className=' text-xl font-bold px-5 text-center '>11+</p>
          <p className='px-5 text-justify'>Matahari sangat berbahaya. Wajib pelindung lengkap, dan hindari keluar jika memungkinkan.</p>
        </div>
      </SwiperSlide>
    </Swiper>
    </div>
    );
};

export default Carousel;
