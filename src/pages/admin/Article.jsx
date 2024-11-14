import React, { useState, useEffect } from "react";
import Sidebar from '../../components/Admin/SideBarAdmin';
import Header from '../../components/Admin/Header';
import { Link, useNavigate } from 'react-router-dom';
import { database } from "../../FirebaseConfig"; // Pastikan path benar
import { ref, onValue, remove } from "firebase/database";

function Article() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Mengambil data artikel dari Realtime Database
    const articlesRef = ref(database, "articles");
    onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Konversi objek data menjadi array
        const articlesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setArticles(articlesArray);
      }
    });
  }, []);

  const editArticle = (id) => {
      navigate(`/admin/edit-article/${id}`);
  };

  const deleteArticle = (id) => {
    const articleRef = ref(database, `articles/${id}`);
    remove(articleRef)
      .then(() => {
        alert("Artikel berhasil dihapus!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus artikel:", error);
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 w-3/4 justify-start mx-auto">Daftar Artikel</h1>
          <div className="w-3/4 justify-start mx-auto">
          <Link
            to="/admin/add-article"
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4 hover:bg-blue-600"
          >
            Tambah Artikel
          </Link>
          </div>
          <div className="overflow-x-auto py-10 ">
            <table className="table-auto w-3/4 border  mx-auto justify-center">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2 border">Judul</th>
                  <th className="px-20 py-2 border">Isi Artikel</th>
                  <th className="px-2 py-2 border">Tanggal Pembuatan</th>
                  <th className="px-4 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-4 py-2 border">{article.title}</td>
                    <td className="px-4 py-2 border">{article.content}</td>
                    <td className="px-4 py-2 border">{article.createdAt}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => editArticle(article.id)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
