import React, { useEffect } from "react";
import Sidebar from "../../components/Admin/SideBarAdmin";
import useStore from '../../store/sideBarStore';
import Header from "../../components/Admin/Header";
import { useNavigate } from "react-router-dom";
import { formatWIBTime } from "../../hooks/useFormatTime";
import { truncateContent } from "../../hooks/useTruncates";
import { useArticleManagement } from '../../hooks/useArticleManagement'; // Import the new hook

function ArticleList() {
    const { isOpen: sidebarOpen } = useStore();
    const { articles, loading, fetchArticles, handleDelete } = useArticleManagement();
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles();
    }, []);
    
    if(loading) 
        return(
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#263a30]">
            </div>
        </div>
        );

    return (
        <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className={`flex-col flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
            <Header />
            <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Daftar Artikel</h2>
                <button
                onClick={() => navigate('/admin/add-article')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                Tambah Artikel
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Judul
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Konten
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gambar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pengunjung
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 text-center">
                        Loading...
                        </td>
                    </tr>
                    ) : articles.length === 0 ? (
                    <tr>
                        <td colSpan="6" className="px-6 py-4 text-center">
                        Tidak ada artikel
                        </td>
                    </tr>
                    ) : (
                    articles.map((article, index) => (
                        <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                        </td>
                        <td className="px-6 py-4">
                            {article.title}
                        </td>
                        <td className="px-6 py-4">
                            {truncateContent(article.content, 50)}
                        </td>
                        <td className="px-6 py-4">
                            {article.image_url && (
                            <img
                                src={article.image_url}
                                alt={article.title}
                                className="h-16 w-40 object-cover rounded"
                            />
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {formatWIBTime(article.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {article.visitor_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                            <button
                                onClick={() => navigate(`/admin/edit-article/${article.id}`)}
                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(article.id, article.image_url)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                            </div>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    );
}

export default ArticleList;