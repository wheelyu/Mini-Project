import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function FormLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const users = [
        { email: "harun.abdulkarim17@gmail.com", username: "Harun", password: "password123" },
        { email: "admin@example.com", username: "Admin", password: "password123" },
    ];

    useEffect(() => {
        if (localStorage.getItem("status") === "true") {
            navigate('/admin/dashboard');
        }
    }, []);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Email validation
        if (!email) {
            tempErrors.email = "Email harus diisi";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "Format email tidak valid";
            isValid = false;
        }

        // Password validation
        if (!password) {
            tempErrors.password = "Password harus diisi";
            isValid = false;
        } 

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    localStorage.setItem("status", "true");
                    localStorage.setItem("role", email === users[0].email ? "admin" : "user");
                    
                    
                    await Swal.fire({
                        icon: 'success',
                        title: `Selamat datang ${user.username}`,
                        timer: 1500
                    });
                    
                    navigate('/admin/dashboard');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Gagal',
                        text: 'Email atau password salah',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Login error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: 'Silakan coba lagi nanti',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <Link to="/" className="text-xl font-semibold leading-none uppercase hover:underline">
                            <FontAwesomeIcon icon={faHome} size='sm'/> Kembali
                        </Link>
                        <h1 className="text-2xl font-bold leading-tight mt-4">Login</h1>
                    </div>
                    
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                                <div className="mb-4">
                                    <input
                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                                            errors.email ? 'border-red-500' : 'border-gray-200'
                                        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) {
                                                setErrors({...errors, email: ""});
                                            }
                                        }}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <input
                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
                                            errors.password ? 'border-red-500' : 'border-gray-200'
                                        } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) {
                                                setErrors({...errors, password: ""});
                                            }
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`mt-5 tracking-wide font-semibold bg-[#415A77] text-white w-full py-4 rounded-lg hover:bg-[#1b263b] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <span>Loading...</span>
                                    ) : (
                                        <span>Sign In</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div
                    className="flex-1 bg-gray-900 text-center hidden lg:flex rounded-lg bg-cover bg-blend-multiply bg-no-repeat"
                    style={{
                        backgroundImage: 'url("bg.jpg")',
                    }}
                >
                    <div className="h-full flex flex-col items-center justify-center text-4xl w-full text-white font-black">
                        Welcome Back
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;