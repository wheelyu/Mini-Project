import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database } from "../FirebaseConfig"; // Pastikan path benar
import { ref, onValue } from "firebase/database";

const ArticleListCard = () => {
    const [articles, setArticles] = useState([]);
    const [count, setCount] = useState(0);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="h-48 w-full object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-4">{article.content}</p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArticleListCard;