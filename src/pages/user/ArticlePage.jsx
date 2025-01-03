import React from "react";
import Navbar from "../../components/Template/navbar";
import Footer from "../../components/Template/Footer";
import ListArticle from "../../components/ArticlePage/ListArticle";
export default function ArticlePage() {
    return (
        <div>
        <Navbar active="article" />
            
            <div className=" justify-center items-start px-5 md:px-48 py-40 bg-white dark:bg-[#121212] duration-300 transition-all h-fit">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white py-10 max-w-[76rem] mx-auto">Artikel terkait uv index</h1>
            <ListArticle   />
            </div>
            <div className="w-full bg-white dark:bg-[#121212]">
                <Footer />
            </div>

        </div>
    );
}
