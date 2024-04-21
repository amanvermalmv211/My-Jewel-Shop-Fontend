import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = (props) => {

    const host = 'https://myjewelshopserv.onrender.com';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    useEffect(()=>{
        document.title = "Admin Login - MJS";
        window.scrollTo(0, 0);
    })

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!email) {
            toast.warn('Please enter the email address', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        else if (!password) {
            toast.warn('Please enter the password', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        try {
            props.setProgressBar(30);
            const response = await fetch(`${host}/admin/adminauth/loginadmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            });
            props.setProgressBar(60);
            const json = await response.json();
            props.setProgressBar(70);
            if (json.success) {
                localStorage.setItem('myjeweladmintoken', json.authtoken);
                toast.success('Admin logged in successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/");
                props.setProgressBar(100);
            }
            else {
                toast.warn('Invalid details', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                props.setProgressBar(100);
            }
        }
        catch (err) {
            toast.error('Internal Server Error Occured.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/");
            props.setProgressBar(100);
        }

    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-[35rem] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className={`shadow-lg ${props.mode === "light" ? "shadow-gray-700" : "shadow-black"} max-w-md w-full space-y-8 p-4 pb-8 rounded-xl`}>
                <div className='space-y-2'>
                    <div className="flex justify-center mt-2">
                        <div className="w-16 h-16 overflow-hidden rounded-full shadow-lg shadow-black">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <h2 className={`mt-6 text-center text-3xl font-extrabold ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"}`}>
                        Admin Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                autoComplete='password'
                                required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 top-1 right-5 flex items-center focus:outline-none z-10 text-black"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2 12s5.5-10 12-10 12 10 12 10-5.5 10-12 10-12-10-12-10z"
                                        />
                                    </svg>
                                ) : (<i className="fa fa-eye-slash" aria-hidden="true"></i>)
                                }
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;