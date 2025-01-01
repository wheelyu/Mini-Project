import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen bg-white dark:bg-[#121212] py-28 px-4 md:py-12 md:px-8 lg:py-20 lg:px-16 xl:px-40">
            {/* Bagian Kanan - Teks dan Tombol */}
            <div className="flex-1 p-4 md:p-6 lg:p-8 text-center ">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4" >
                    Welcome to LacakUV
                </h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6"  >
                Keep the good vibes going outdoors without the UV worries with LacakUV! Our daily UV tips are easy to follow, and we'll show you how to be kind to the planet too. Stay sun-safe and look great while you're at it!
                </p>

                {/* Tombol Navigasi */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center " >
                    <Link
                        to="/check"
                        className="inline-block px-4 md:px-6 py-3 rounded-lg bg-green-900 dark:bg-[#588157] hover:bg-[#588157] dark:hover:bg-[#A3B18A] text-white font-semibold shadow-md focus:bg-cyan-700 focus:outline-none text-sm md:text-base"
                    >
                        Check Yours
                    </Link>
                    <a
                        href="#uv-index"
                        className="inline-block px-4 md:px-6 py-3 rounded-lg bg-white text-gray-800 font-semibold shadow-md hover:bg-gray-300 focus:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-500 text-sm md:text-base"
                    >
                        UV Index
                    </a>
                </div>
            </div>

            {/* Bagian Kiri - Gambar */}
            
        </section>
    );
};

export default LandingPage;