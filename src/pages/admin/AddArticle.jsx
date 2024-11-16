import React, { useState } from "react";
import Sidebar from "../../components/Admin/SideBarAdmin";
import Header from "../../components/Admin/Header";
import useStore from '../../store/sideBarStore';
import { supabase } from "../../SupabaseConfig";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";

function AddArticle() {
    const { isOpen: sidebarOpen } = useStore();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fungsi untuk mengunggah gambar ke Supabase Storage
    const handleImageUpload = async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
                .from('article-images')
                .upload(filePath, file);

            if (error) {
                throw error;
            }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = null;

            // Upload gambar jika ada
            if (image) {
                imageUrl = await handleImageUpload(image);
            }

            // Simpan data artikel ke database
            const { data, error } = await supabase
                .from('article')
                .insert([
                    {
                        title,
                        content,
                        image_url: imageUrl,
                        created_at: new Date().toISOString(),
                    }
                ]);

            if (error) {
                throw error;
            }

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Artikel berhasil ditambahkan',
            })
            navigate('/admin/article'); // Arahkan ke halaman daftar artikel
        } catch (error) {
            console.error('Error saving article:', error.message);
            alert('Gagal menyimpan artikel. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className={` flex-col flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Header />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Tambah Artikel</h2>
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
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setContent(data);
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Unggah Gambar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddArticle;