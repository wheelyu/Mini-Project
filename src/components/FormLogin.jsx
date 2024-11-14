import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
function FormLogin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
  
    const users = [
      { username: "admin", password: "password123" },
      { username: "user", password: "password123" },
    ]
    useEffect(() => {
      if (localStorage.getItem("status") == "true") {
        navigate('/admin/dashboard')
      }
    })
    function handleSubmit(e) {
      e.preventDefault();
      console.log("username = ", username);
      console.log("password = ", password);
      if (username == users[0].username && password == users[0].password) {
        // akan di arahkan ke halaman admin
        // simpan status login pada local storage
        localStorage.setItem("status", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", "ey....");
        alert("selamat datang " + users[0].username);
        navigate('/dashboard')
      } else if (username == users[1].username && password == users[1].password) {
        // akan di arahkan ke halaman user
        localStorage.setItem("status", "true");
        localStorage.setItem("role", "user");
        localStorage.setItem("token", "ey....");
        alert("selamat datang " + users[1].username);
        navigate('/dashboard')
        
      }else{
        alert("login gagal");
      }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}> 
          <div>
            <label className="block text-sm font-medium text-gray-600">username</label>
            <input
              type="text"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
