import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatWIBTime } from "../helper/FormatTime";
import { supabase } from "../SupabaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ViewArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [visitorCount, setVisitorCount] = useState(0);
    const [createdAt, setCreatedAt] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);
    const { id } = useParams();
    
    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            // Fetch article data first
            const { data, error } = await supabase
                .from('article')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;

            if (data) {
                setTitle(data.title);
                setContent(data.content);
                setCurrentImageUrl(data.image_url);
                setCreatedAt(data.created_at);
                setVisitorCount(data.visitor_count || 0);

                // Then update visitor count
                const newVisitorCount = (data.visitor_count || 0) + 1;
                const { error: updateError } = await supabase
                    .from('article')
                    .update({
                        visitor_count: newVisitorCount
                    })
                    .eq('id', id);

                if (!updateError) {
                    setVisitorCount(newVisitorCount);
                }
            }
        } catch (error) {
            console.error('Error fetching article:', error.message);
            alert('Error fetching article details');
        } finally {
            setInitialLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-[#1b263b] rounded-lg shadow-lg overflow-hidden">
                {currentImageUrl && (
                    <div className="w-full h-64 relative overflow-hidden">
                        <img
                            src={currentImageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = "/api/placeholder/800/400";
                                e.target.alt = "Placeholder image";
                            }}
                        />
                    </div>
                )}
                
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {title}
                        </h1>
                        <div className="flex items-center gap-4">
                            {createdAt && (
                                <p className="text-sm text-gray-500 dark:text-gray-300">
                                    Published on: {formatWIBTime(createdAt)}
                                </p>
                            )}
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300">
                                <FontAwesomeIcon icon={faEye}  />
                                <span>{visitorCount} views</span>
                            </div>
                        </div>
                    </div>
                    
                    <div 
                        className="space-y-4 prose dark:prose-invert max-w-none dark:text-white" 
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewArticle;