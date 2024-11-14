import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem('status') == 'true'; 
    return isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}