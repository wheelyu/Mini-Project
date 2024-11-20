import React from "react";
import Navbar from "../../components/Template/navbar";
import Footer from "../../components/Template/Footer";
import ViewArticle from "../../components/ArticlePage/ViewArticle";
export default function Page() {
    return (
        <div>
            <Navbar active="page" />
            <div className=" justify-center items-start px-5 md:px-48 py-40 bg-[efefef] dark:bg-[#121212]  duration-300 transition-all ">
            <ViewArticle />
            </div>
            <div className="w-full bg-white dark:bg-[#121212]">
                <Footer />
            </div>

        </div>
    );
}