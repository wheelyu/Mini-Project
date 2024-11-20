import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Admin/SideBarAdmin";
import Header from "../../components/Admin/Header";
import useStore from "../../store/sideBarStore";
import { supabase } from "../../services/SupabaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Swal from 'sweetalert2';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function EditArticle() {
    const { id } = useParams(); // Mendapatkan ID artikel dari URL
    const navigate = useNavigate();
    const { isOpen: sidebarOpen } = useStore();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    // Fetch article data when component mounts
    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
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
            }
        } catch (error) {
            console.error('Error fetching article:', error.message);
            alert('Error fetching article details');
        } finally {
            setInitialLoading(false);
        }
    };

    // Fungsi untuk mengunggah gambar baru ke Supabase Storage
    const handleImageUpload = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
                .from('article-images')
                .upload(filePath, file);

            if (error) throw error;

            // Dapatkan URL publik dari gambar yang diunggah
            const { data: { publicUrl } } = supabase.storage
                .from('article-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Error uploading image:', error.message);
            throw error;
        }
    };

    // Fungsi untuk menghapus gambar lama dari storage
    const deleteOldImage = async (imageUrl) => {
        try {
            if (!imageUrl) return;
            
            // Ekstrak path file dari URL
            const filePath = imageUrl.split('/').pop();
            
            const { error } = await supabase.storage
                .from('article-images')
                .remove([filePath]);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting old image:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = currentImageUrl;

            // Upload gambar baru jika ada
            if (image) {
                // Hapus gambar lama jika ada
                await deleteOldImage(currentImageUrl);
                
                // Upload gambar baru
                imageUrl = await handleImageUpload(image);
            }

            // Update data artikel
            const {  error } = await supabase
                .from('article')
                .update({
                    title,
                    content,
                    image_url: imageUrl,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', id);

            if (error) throw error;

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Artikel berhasil diperbarui!',
                
            })
            navigate('/admin/article'); // Arahkan ke halaman daftar artikel
        } catch (error) {
            console.error('Error updating article:', error.message);
            alert('Gagal memperbarui artikel. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex flex-col flex-grow pl-64">
                    <Header />
                    <div className="p-4">
                        <div className="flex items-center justify-center h-full">
                            Loading...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className={` flex-col flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Header />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Edit Artikel</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Judul Artikel</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Isi Artikel</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content}
                                onChange={(event,editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Gambar Artikel</label>
                            {currentImageUrl && (
                                <div className="mb-2">
                                    <img 
                                        src={currentImageUrl} 
                                        alt="Current article" 
                                        className="max-w-xs h-auto"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full px-4 py-2 border rounded"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Biarkan kosong jika tidak ingin mengubah gambar
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin/article')}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditArticle;