import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
function FormLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
  
    const users = [
      { email: "harun.abdulkarim17@gmail.com",username: "Harun", password: "password123" },
      { email: "admin@example.com", username: "Admin", password: "password123" },
    ]
    useEffect(() => {
      if (localStorage.getItem("status") == "true") {
        navigate('/admin/dashboard')
      }
    })
    function handleSubmit(e) {
      e.preventDefault();

      if (email == users[0].email && password == users[0].password) {
        // akan di arahkan ke halaman admin
        // simpan status login pada local storage
        localStorage.setItem("status", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", "ey....");
        Swal.fire({
          icon: 'success',
          title: 'Selamat datang '+users[0].username,
        })
        navigate('/admin/dashboard')
      } else if (email == users[1].username && password == users[1].password) {
        // akan di arahkan ke halaman user
        localStorage.setItem("status", "true");
        localStorage.setItem("role", "user");
        localStorage.setItem("token", "ey....");
        Swal.fire({
          icon: 'success',
          title: 'Selamat datang '+users[1].username,
        })
        navigate('/admin/dashboard')
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  return (
    <>
      {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center rounded-lg">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <Link to="/" className="text-xl font-semibold leading-none uppercase hover:underline"><FontAwesomeIcon icon={faHome} size='sm'/> Kembali</Link>
              <h1 className="text-2xl font-bold leading-tight">Login</h1>
             
            </div>
            
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-[#415A77]  text-white w-full py-4 rounded-lg hover:bg-[#1b263b] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={handleSubmit}
                    >
                    
                    <span className="ml-">Sign In</span>
                  </button>
                  
                  
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-900 text-center hidden lg:flex rounded-lg bg-cover bg-blend-multiply bg-no-repeat"style={{
                backgroundImage:
                  'url("bg.jpg")',
              }}>
            <div
              className="h-full flex flex-col items-center justify-center text-4xl w-full text-white font-black"
              
            >Welcome Back</div>
          </div>
        </div>
      </div>
    </>

  );
}

export default FormLogin;
