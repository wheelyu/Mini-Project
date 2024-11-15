import React, { useState } from "react";
import Sidebar from '../../components/Admin/SideBarAdmin';
import Header from '../../components/Admin/Header';
import { database } from "../../FirebaseConfig";
import { ref as dbRef, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { formatWIBTime } from "../../helper/FormatTime";
function AddArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simpan data artikel di Realtime Database
            const articlesRef = dbRef(database, "articles");
            const newArticleRef = push(articlesRef);
            const currentDate = new Date().toISOString();
            const formattedDate = formatWIBTime(currentDate);
            await set(newArticleRef, {
                id: newArticleRef.key,
                title,
                content,
                createdAt: formattedDate
            });

            alert("Artikel berhasil disimpan!");
            navigate('/admin/article');
        } catch (error) {
            console.error("Error saving article: ", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-grow pl-64">
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
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddArticle;