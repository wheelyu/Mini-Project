import React from "react";
import Navbar from "../../components/navbar/navbar";
import StickyCtaButton from "../../components/ctaButton";
import Footer from "../../components/footer";
import ViewArticle from "../../components/ViewArticle";
export default function Page() {
    return (
        <div>
            <Navbar active="page" />
            <div className=" justify-center items-start px-48 py-40 bg-[efefef] dark:bg-gray-900 duration-300 transition-all ">
            <ViewArticle />
            </div>
            <div cl assName="w-full   ">
                <Footer />
            </div>
            <StickyCtaButton />
        </div>
    );
}