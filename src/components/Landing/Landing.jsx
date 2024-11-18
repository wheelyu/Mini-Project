import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen bg-white dark:bg-[#263a30] py-28 px-4 md:py-12 md:px-8 lg:py-20 lg:px-16 xl:px-40">
            {/* Bagian Kanan - Teks dan Tombol */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4" >
                    Selamat Datang ke LacakUV
                </h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6"  >
                    Tetap vibes di luar tanpa khawatir UV dengan LacakUV! Kami punya panduan UV harian yang simpel dan tips untuk menjaga bumi kita. Semua yang kamu perlu tahu untuk tetap aman dan keren di bawah matahari.
                </p>

                {/* Tombol Navigasi */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" >
                    <Link
                        to="/check"
                        className="inline-block px-4 md:px-6 py-3 rounded-lg bg-[#A3B18A] dark:bg-[#588157] hover:bg-[#588157] dark:hover:bg-[#A3B18A] text-white font-semibold shadow-md focus:bg-cyan-700 focus:outline-none duration-300 transition-all text-sm md:text-base"
                    >
                        Check UV kamu!
                    </Link>
                    <a
                        href="#uv-index"
                        className="inline-block px-4 md:px-6 py-3 rounded-lg bg-white text-gray-800 font-semibold shadow-md hover:bg-gray-300 focus:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-500 duration-300 transition-all text-sm md:text-base"
                    >
                        UV Index
                    </a>
                </div>
            </div>

            {/* Bagian Kiri - Gambar */}
            <div className="flex-1 flex justify-center items-center mb-8 lg:mb-0" >
                <img
                    src="logo.png"
                    alt="Example Image"
                    className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] h-auto object-contain"
                />
            </div>
        </section>
    );
};

export default LandingPage;