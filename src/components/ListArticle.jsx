import React, { useState, useEffect } from 'react';
import { supabase } from "../SupabaseConfig";
import { useNavigate, Link } from 'react-router-dom';
const ArticleListCard = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchArticles();
    }, []);
    const fetchArticles = async () => {
        try {
            if (props.locate === 'home') {
                const { data, error } = await supabase
                    .from('article')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(3);
                if (error) throw error;
                setArticles(data || []);
            }else{
                const { data, error } = await supabase
                .from('article')
                .select('*')
                .order('created_at', { ascending: false })
            if (error) throw error;
            setArticles(data || []);
            }
        } catch (error) {
            console.error('Error fetching articles:', error.message);
            alert('Error fetching articles');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <div key={article.id} className="bg-white dark:bg-[#1b263b] rounded-lg shadow-2xl overflow-hidden transition-all duration-300" data-aos="fade-up">
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
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {article.title}
                        </h3>
                        <div className="text-gray-600 dark:text-white mb-4">
                            {article.content.length > 100 ? (
                                <div
                                    dangerouslySetInnerHTML={{ // menggunakan dangerouslySetInnerHTML untuk menampilkan konten artikel 
                                        __html: `${article.content.slice(0, 100)}...`,
                                    }}
                                ></div>
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                ></div>
                            )}
                        </div>
                        <Link
                            to={`/page/${article.id}`}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Lihat Lebih Banyak 
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ArticleListCard;
