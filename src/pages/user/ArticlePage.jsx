import React from "react";
import Navbar from "../../components/navbar/navbar";
import StickyCtaButton from "../../components/ctaButton";
import Footer from "../../components/Footer";
import ListArticle from "../../components/ListArticle";
export default function ArticlePage() {
    return (
        <div>
        <Navbar active="article" />
            
            <div className=" justify-center items-start px-5 md:px-48 py-40 bg-white dark:bg-[#263a30] duration-300 transition-all h-fit">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white py-10">Artikel terkait uv index</h1>
            <ListArticle locate="article"/>
            </div>
            <div className="w-full   ">
                <Footer />
            </div>
        <StickyCtaButton />
        </div>
    );
}
