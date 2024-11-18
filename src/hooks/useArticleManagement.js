import { useState } from 'react';
import { supabase } from '../SupabaseConfig';
import Swal from 'sweetalert2';

export const useArticleManagement = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

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
        Swal.fire({
            title: 'Error!',
            text: 'Gagal mengambil artikel',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        } finally {
        setLoading(false);
        }
    };

    const handleDelete = async (id, imageUrl) => {
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

            // Delete image from storage if exists
            if (imageUrl) {
            const filePath = imageUrl.split('/').pop();
            await supabase.storage
                .from('article-images')
                .remove([filePath]);
            }

            // Delete article from database
            const { error } = await supabase
            .from('article')
            .delete()
            .eq('id', id);

            if (error) throw error;

            // Refresh data
            await fetchArticles();
            
            await Swal.fire({
            title: 'Berhasil!',
            text: 'Artikel telah berhasil dihapus',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
            });

        } catch (error) {
            console.error('Error deleting article:', error.message);
            
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

    return { 
        articles, 
        loading, 
        fetchArticles, 
        handleDelete 
    };
};