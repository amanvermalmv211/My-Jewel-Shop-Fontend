import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase.config';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import AOS from 'aos';
import "aos/dist/aos.css";

const UserSignuppage = (props) => {

    const [uName, setUName] = useState('');
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [spinSingUpLoading, setSpinSingUpLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "User Sign up - MJS";
        AOS.init();
        AOS.refresh();
    }, [])


    const handleUNameChange = (e) => {
        setUName(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setUseremail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!uName) {
            toast.warn('Please Enter User Name', {
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

        else if (password.length < 8) {
            toast.warn('Password should be of 8 characters', {
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

        else if (!confirmPassword) {
            toast.warn('Please fill the confirm password section', {
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

        else if (password !== confirmPassword) {
            toast.warn('Confirm Password do not match !', {
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

        setSpinSingUpLoading(true);

        try {
            props.setProgressBar(30);
            const response = await fetch(`https://myjewelshopserv.onrender.com/user/userauth/checkuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: useremail })
            });

            const json = await response.json();
            props.setProgressBar(60);

            if (!json.success) {
                toast.error(`User with this email address was already exists.`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setSpinSingUpLoading(false);
                props.setProgressBar(100);

                return;
            }

            sendSignInLinkToEmail(auth, useremail, {
                url: "http://localhost:3000/userdetails",
                handleCodeInApp: true,
            }).then(async () => {
                const response = await fetch(`https://myjewelshopserv.onrender.com/user/userauth/createuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: uName, email: useremail, password: password })
                });

                const json = await response.json();
                props.setProgressBar(80);
                if (json.success) {
                    localStorage.setItem('myjewelacctoken', json.authtoken);
                    props.setUser(true);

                    toast.success(`Your email address got verified successfully`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    navigate("/userdetails");
                    props.setProgressBar(100);
                }
                else {
                    toast.error(`Internal server error occured\nTry after sometime..!`, {
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

                setSpinSingUpLoading(false);
            }).catch((err) => {
                console.log(err.message);
                toast.error(`Server error occured\nPlease try after sometime..!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setSpinSingUpLoading(false);
                props.setProgressBar(100);
            })
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

    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className={`max-w-md w-full space-y-8 shadow-lg ${props.mode === "light" ? "shadow-gray-700" : "shadow-black"} rounded-xl p-4 pb-8`}>
                <div className='space-y-2' data-aos="zoom-in" data-aos-duration="500">
                    <div className="flex justify-center mt-2">
                        <div className="w-16 h-16 overflow-hidden rounded-full shadow-lg shadow-black">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <h2 className={`text-center text-3xl font-extrabold ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"}`}>Sign up for an account</h2>
                    <p className={`text-center ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>Or <Link to="/userlogin" className='text-blue-500'>Login</Link></p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()} data-aos="zoom-in" data-aos-duration="500">
                    <div className={`rounded-md shadow-sm space-y-2 ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>

                        <div>
                            <label htmlFor="uName" className="block ml-1">
                                Name
                            </label>
                            <input
                                id="uName"
                                name="uName"
                                type="text"
                                autoComplete="uName"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Your Name"
                                value={uName}
                                onChange={handleUNameChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="phone" className="block ml-1">Email</label>
                            <div className='flex'>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email address"
                                    className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    value={useremail}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div className='relative'>
                            <label htmlFor="password" className="block ml-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 top-6 right-5 flex items-center focus:outline-none z-10 text-black"
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

                        <div>
                            <label htmlFor="confirmPassword" className="block ml-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter password again"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 space-x-2`}
                            onClick={handleLogin}
                        >
                            {spinSingUpLoading && <i className="fa fa-spinner animate-spin" aria-hidden="true"></i>}
                            <span>Verify & Create Account</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserSignuppage;