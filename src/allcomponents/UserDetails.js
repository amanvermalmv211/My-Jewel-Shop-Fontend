import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AOS from 'aos';
import "aos/dist/aos.css";

const UserDetails = (props) => {
    const navigate = useNavigate(null);

    const shouldDo = useRef(true);

    useEffect(() => {
        document.title = "User Details - MJS";
        AOS.init();
        AOS.refresh();

        if (localStorage.getItem('myjewelacctoken')) {
            if(shouldDo.current){
                toast.success(`Fill all the details carefully..!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                shouldDo.current = false;
            }
        }
        else {
            navigate("/userlogin");
            if(shouldDo.current){
                toast.error(`Get login first`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                shouldDo.current = false;
            }
        }
        // eslint-disable-next-line
    }, []);


    const [localAddress, setLocalAddress] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [state, setState] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleLocalAddressChange = (e) => {
        setLocalAddress(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handlePinCodeChange = (e) => {
        setPinCode(e.target.value);
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
    };

    const handlePhoneChange = (e) => {
        const inputPhoneNumber = e.target.value;
        setPhoneno(inputPhoneNumber);

        setIsValid(/^\d{10}$/.test(inputPhoneNumber));
    };

    const handleLogin = async () => {
        if (!localAddress) {
            toast.warn('Please enter the local address', {
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

        else if (!city) {
            toast.warn('Please enter the name of city', {
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

        else if (!pinCode) {
            toast.warn('Please enter the PIN code of city', {
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

        else if (!state) {
            toast.warn('Please enter the State', {
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

        else if (!isValid) {
            toast.warn('Please enter 10-digit phone number', {
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
            const response = await fetch(`https://myjewelshopserv.onrender.com/user/userauth/getuserdetail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjewelacctoken')
                },
                body: JSON.stringify({ locaddress: localAddress, city: city, pin: pinCode, state: state, phoneno: phoneno })
            });

            props.setProgressBar(60);
            await response.json();
            
            toast.success(`All details has been saved successfully`, {
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
        catch (err) {
            toast.error(`Internal server error occured`, {
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

    };


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
                    <h2 className={`text-center text-3xl font-extrabold ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"}`}>User Details</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()} data-aos="zoom-in" data-aos-duration="500">
                    <div className={`${props.mode === "light" ? "text-gray-700" : "text-white"} rounded-md shadow-sm space-y-2`}>

                        <div>
                            <label htmlFor="localAddress" className="block ml-1">
                                Local Address
                            </label>
                            <input
                                id="localAddress"
                                name="localAddress"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your local address"
                                value={localAddress}
                                onChange={handleLocalAddressChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block ml-1">
                                City
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your city name"
                                value={city}
                                onChange={handleCityChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="pinCode" className="block ml-1">
                                Pin Code
                            </label>
                            <input
                                id="pinCode"
                                name="pinCode"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your city PIN Code"
                                value={pinCode}
                                onChange={handlePinCodeChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="state" className="block ml-1">
                                State
                            </label>
                            <input
                                id="state"
                                name="state"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter State"
                                value={state}
                                onChange={handleStateChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneno" className="block ml-1">
                                Phone Number
                            </label>
                            <input
                                id="phoneno"
                                name="phoneno"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your active phone number"
                                value={phoneno}
                                onChange={handlePhoneChange}
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            onClick={handleLogin}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserDetails;