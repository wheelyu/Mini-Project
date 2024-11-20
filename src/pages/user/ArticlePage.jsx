import React from "react";
import Navbar from "../../components/navbar/navbar";
import StickyCtaButton from "../../components/ctaButton";
import Footer from "../../components/footer";
import ListArticle from "../../components/ListArticle";
export default function ArticlePage() {
    return (
        <div>
        <Navbar active="article" />
            
            <div className="w-full bg-white dark:bg-[#121212]">
                <Footer />
            </div>
        <StickyCtaButton />
        </div>
    );
}
