import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/SideBarAdmin";
import useStore from '../../store/sideBarStore';
import Header from "../../components/Admin/Header";
import { supabase } from "../../SupabaseConfig";
import { useNavigate } from "react-router-dom";
import { formatWIBTime } from "../../helper/FormatTime";
import Swal from 'sweetalert2';
function ArticleList() {
  const { isOpen: sidebarOpen } = useStore();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const { data, error } = await supabase
                .from('article')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setArticles(data || []);
        } catch (error) {
            console.error('Error fetching articles:', error.message);
            alert('Error fetching articles');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, imageUrl) => {
      // Konfirmasi penghapusan dengan SweetAlert2
      const result = await Swal.fire({
          title: 'Apakah Anda yakin?',
          text: "Artikel yang dihapus tidak dapat dikembalikan!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal'
      });
  
      if (result.isConfirmed) {
          try {
              setLoading(true);
  
              // Hapus gambar dari storage jika ada
              if (imageUrl) {
                  const filePath = imageUrl.split('/').pop();
                  await supabase.storage
                      .from('article-images')
                      .remove([filePath]);
              }
  
              // Hapus artikel dari database
              const { error } = await supabase
                  .from('article')
                  .delete()
                  .eq('id', id);
  
              if (error) throw error;
  
              // Refresh data
              fetchArticles();
              
              // Tampilkan pesan sukses dengan SweetAlert2
              await Swal.fire({
                  title: 'Berhasil!',
                  text: 'Artikel telah berhasil dihapus',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false
              });
  
          } catch (error) {
              console.error('Error deleting article:', error.message);
              
              // Tampilkan pesan error dengan SweetAlert2
              await Swal.fire({
                  title: 'Error!',
                  text: 'Gagal menghapus artikel',
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
          } finally {
              setLoading(false);
          }
      }
  };

    // Fungsi untuk memotong teks content
    const truncateContent = (content, maxLength) => {
        // Hapus tag HTML
        const strippedContent = content.replace(/<[^>]+>/g, '');
        if (strippedContent.length <= maxLength) return strippedContent;
        return strippedContent.substring(0, maxLength) + '...';
    };



    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className={` flex-col flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
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
                                        Tanggal Dibuat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Visitor
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
                                                        className="h-16 w-16 object-cover rounded"
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