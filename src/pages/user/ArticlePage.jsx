import React from "react";
import Navbar from "../../components/navbar/navbar";
import StickyCtaButton from "../../components/ctaButton";
import Footer from "../../components/footer";
import ListArticle from "../../components/ListArticle";
export default function ArticlePage() {
    return (
        <div>
        <Navbar active="article" />
            
            <div className=" justify-center items-start px-48 py-40 bg-[efefef] dark:bg-gray-900 duration-300 transition-all h-screen">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white py-10">Artikel terkait uv index</h1>
            <ListArticle />
            </div>
            <div className="w-full  pt-32 ">
                <Footer />
            </div>
        <StickyCtaButton />
        </div>
    );
}
