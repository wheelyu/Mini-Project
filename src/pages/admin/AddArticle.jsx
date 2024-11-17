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
    const [errors, setErrors] = useState({
        title: "",
        content: "",
        image: ""
    });
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        const value = e.target.value;
        // Membatasi input menjadi 50 karakter
        if (value.length <= 50) {
            setTitle(value);
            setErrors({
                ...errors,
                title: ""
            });
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Title validation
        if (!title.trim()) {
            tempErrors.title = "Judul artikel wajib diisi";
            isValid = false;
        } else if (title.length > 50) {
            tempErrors.title = "Judul tidak boleh lebih dari 50 karakter";
            isValid = false;
        }

        // Content validation
        if (!content.trim()) {
            tempErrors.content = "Konten artikel wajib diisi";
            isValid = false;
        }

        // Image validation
        if (image) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!allowedTypes.includes(image.type)) {
                tempErrors.image = "Format gambar harus JPG, PNG, GIF, atau WEBP";
                isValid = false;
            } else if (image.size > maxSize) {
                tempErrors.image = "Ukuran gambar tidak boleh lebih dari 5MB";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

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

        if (!validateForm()) {
            Swal.fire({
                icon: 'error',
                title: 'Validasi Gagal',
                text: 'Mohon periksa kembali form anda',
            });
            return;
        }

        setLoading(true);

        try {
            let imageUrl = null;

            if (image) {
                imageUrl = await handleImageUpload(image);
            }

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
            });
            navigate('/admin/article');
        } catch (error) {
            console.error('Error saving article:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: 'Gagal menyimpan artikel. Silakan coba lagi.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className={`flex-col flex-grow transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Header />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Tambah Artikel</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Judul Artikel</label>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                maxLength={50}
                                className={`w-full px-4 py-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                                {`${title.length}/50 karakter`}
                            </p>
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
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-gray-700">Unggah Gambar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className={`w-full px-4 py-2 border rounded ${errors.image ? 'border-red-500' : ''}`}
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                                Format yang didukung: JPG, PNG, GIF, WEBP (Max: 5MB)
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
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