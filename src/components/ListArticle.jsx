import React, { useState, useEffect } from 'react';
import { supabase } from "../SupabaseConfig";
import { truncateContent } from '../hooks/useTruncates';
import { useArticleManagement } from '../hooks/useArticleManagement';
import {  Link } from 'react-router-dom';
const ArticleListCard = (props) => {
    const { articles, loading, fetchArticles } = useArticleManagement();
    useEffect(() => {
        fetchArticles();
    }, []);
    
    if(loading){
        return(
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#263a30]"></div>
            </div>
        )
    }
    return (
        <div className='bg-white dark:bg-[#121212] max-w-[76rem] mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <div key={article.id} className="bg-white dark:bg-[#344E41] rounded-lg shadow-2xl overflow-hidden transition-all duration-300" >
                    {article.image_url ? (
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="h-48 w-full object-cover"
                        />
                    ):(
                        <img
                            src="no-image.jpg"
                            alt={article.title}
                            className="h-48 w-full object-contain bg-slate-50"
                        />
                    )}
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-[#263a30] dark:text-white mb-2 min-h-14">
                            {article.title}
                        </h3>
                        <div className="text-[#263a30] dark:text-white mb-4">
                            {truncateContent(article.content, 100)}
                        </div>
                        <Link
                            to={`/page/${article.id}`}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#A3B18A] dark:bg-[#263a30] dark:hover:bg-[#A3B18A] hover:bg-[#588157] transition-all duration-300"
                        >
                            Selengkapnya
                        </Link>
                    </div>

                
                </div>
            ))}
            
        </div>
        {props.locate === 'home' && (
                <div className="flex justify-end w-full mt-8 " >
                    <Link
                        to="/article"                               
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#A3B18A] dark:bg-[#263a30] dark:hover:bg-[#A3B18A] hover:bg-[#588157] transition-all duration-300"
                    >
                        Lihat Lebih Banyak 
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ArticleListCard;
