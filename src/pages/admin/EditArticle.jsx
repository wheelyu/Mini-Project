import React, { useState, useEffect } from "react";
import Sidebar from '../../components/Admin/SideBarAdmin';
import Header from '../../components/Admin/Header';
import { useNavigate, useParams } from "react-router-dom";
import { database} from "../../FirebaseConfig";
import { ref, onValue, update } from "firebase/database";
function EditArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the article data from the Realtime Database
    const articleRef = ref(database, `articles/${id}`);
    onValue(articleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the article in the Realtime Database
      const articleRef = ref(database, `articles/${id}`);
      await update(articleRef, {
        title,
        content,
      });

      alert("Artikel berhasil diperbarui!");
      navigate('/admin/article');
    } catch (error) {
      console.error("Error updating article: ", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-grow">
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
              Perbarui
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditArticle;