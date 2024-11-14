import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/Home";
import Check from "./pages/user/Check";
import Login from "./pages/user/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from './ProtectedRoute';
import Article from "./pages/admin/Article";
import AddArticle from "./pages/admin/AddArticle";
import ArticlePage from "./pages/user/ArticlePage";
import EditArticle from "./pages/admin/EditArticle";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/check" element={<Check />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/article" element={<Article />} />
          <Route path="/admin/add-article" element={<AddArticle />} />
          <Route path="/admin/edit-article/:id" element={<EditArticle />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
