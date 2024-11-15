// components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {

    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen bg-white dark:bg-gray-900 py-20 px-40 ">
            {/* Bagian Kanan - Teks dan Tombol */}
        <div className="flex-1  p-8 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4" data-aos="fade-right">
            Selamat Datang ke LacakUV
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6" data-aos="fade-right" data-aos-delay="200">
            Tetap vibes di luar tanpa khawatir UV dengan LacakUV! Kami punya panduan UV harian yang simpel dan tips untuk menjaga bumi kita. Semua yang kamu perlu tahu untuk tetap aman dan keren di bawah matahari.
            </p>

            {/* Tombol Navigasi */}
            <div className="flex flex-col lg:flex-row gap-4 justify-center lg:justify-start" data-aos="fade-right" data-aos-delay="400">
            <Link
                to="/check"
                className="inline-block px-6 py-3 rounded-lg bg-[#FFE500] dark:bg-[#CBC333] hover:bg-[#fff533] dark:hover:bg-[#FFE500] text-black font-semibold shadow-md  focus:bg-cyan-700 focus:outline-none duration-300 transition-all"
            >
                Check UV kamu!
            </Link>
            <a
                href="#get-started"
                className="inline-block px-6 py-3 rounded-lg bg-white text-gray-800 font-semibold shadow-md hover:bg-gray-300 focus:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-500 duration-300 transition-all"
            >
                UV Index
            </a>
            </div>
        </div>
        {/* Bagian Kiri - Gambar */}
        <div className="flex-1 flex justify-center items-center" data-aos="fade-up-left">
            <img
            src="sun.png" // Ganti dengan URL gambar yang diinginkan
            alt="Example Image"
            className=" min-w-[500px] h-[500px]"
            />
        </div>

        
        </section>
    );
};

export default LandingPage;
