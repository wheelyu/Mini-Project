import React from "react";
import Navbar from "../../components/navbar/navbar";
import StickyCtaButton from "../../components/ctaButton";
import Footer from "../../components/Footer";
import ViewArticle from "../../components/ViewArticle";
export default function Page() {
    return (
        <div>
            <Navbar active="page" />
            <div className=" justify-center items-start px-5 md:px-48 py-40 bg-[efefef] dark:bg-[#263a30] dark:bg-opacity-95 duration-300 transition-all ">
            <ViewArticle />
            </div>
            <div className="w-full   ">
                <Footer />
            </div>
            <StickyCtaButton />
        </div>
    );
}