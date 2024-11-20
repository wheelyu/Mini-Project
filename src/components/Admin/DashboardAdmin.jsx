import React, { useState, useEffect } from 'react';
import Sidebar from './SideBarAdmin';
import Header from './Header';
import useStore from '../../store/sideBarStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/SupabaseConfig';

const Dashboard = () => {
  const { isOpen: sidebarOpen } = useStore();
  const [totalArticles, setTotalArticles] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Mengambil total artikel
      const { count: articleCount, error: articleError } = await supabase
        .from('article')
        .select('*', { count: 'exact' });

      if (articleError) throw articleError;

      // Mengambil total visitor dari semua artikel
      const { data: articles, error: visitorError } = await supabase
        .from('article')
        .select('visitor_count');

      if (visitorError) throw visitorError;

      const totalVisitorCount = articles.reduce((sum, article) => {
        return sum + (article.visitor_count || 0);
      }, 0);

      setTotalArticles(articleCount);
      setTotalVisitors(totalVisitorCount);

    } catch (error) {
      console.error('Error fetching stats:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Articles',
      value: loading ? 'Loading...' : totalArticles,
      icon: faNewspaper,
      link: '/admin/article',
      color: 'bg-blue-500'
    },
    {
      title: 'Total Visitors',
      value: loading ? 'Loading...' : totalVisitors,
      icon: faEye,
      link: '#',
      color: 'bg-green-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header />

        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statsCards.map((card, index) => (
              
              <div key={index} className="rounded-lg bg-white p-6 shadow-md hover:bg-gray-50">
                <Link to={card.link} >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <h3 className="mt-2 text-2xl font-bold">{card.value}</h3>
                  </div>
                  
                  <div className={`rounded-full p-4 ${card.color}`}>
                    <FontAwesomeIcon 
                      icon={card.icon} 
                      className="text-2xl text-white"
                    />
                  </div>
                </div>
                </Link>
              </div>
              
            ))}
          </div>  
        </main>
      </div>
    </div>
  );
};

export default Dashboard;