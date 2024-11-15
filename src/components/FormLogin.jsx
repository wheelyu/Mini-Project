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
        navigate('/admin/dashboard')
      } else if (username == users[1].username && password == users[1].password) {
        // akan di arahkan ke halaman user
        localStorage.setItem("status", "true");
        localStorage.setItem("role", "user");
        localStorage.setItem("token", "ey....");
        alert("selamat datang " + users[1].username);
        navigate('/admin/dashboard')
        
      }else{
        alert("login gagal");
      }
    }
  return (
    <>
      {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <h1 className="text-2xl font-bold leading-tight">Login</h1>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSubmit}>
                    
                    <span className="ml-">Sign In</span>
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")',
              }}
            ></div>
          </div>
        </div>
      </div>
    </>

  );
}

export default FormLogin;
