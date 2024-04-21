import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userContext from '../context/user/userContext.js';
import Swal from 'sweetalert2';
import { HashLink } from 'react-router-hash-link';
import AOS from 'aos';
import "aos/dist/aos.css";
import AddrSpinner from './Orders/AddrSpinner.js';

const UserAccount = (props) => {

    const context = useContext(userContext);
    const { userdet, getUser, user, isdetail, getUserdetail, updateUseraddress, isOrder, userOrders, getUserorders, getOrdersForAdmin, metalPrice, getMetalPrice, updateMetalPrice, updateOrderAdmin, deleteOrderAdmin, deleteOrderUser, loading } = context;
    const navigate = useNavigate(null);

    const shouldDo = useRef(true);

    useEffect(() => {

        AOS.init();
        AOS.refresh();

        window.scrollTo(0, 0);
        try {
            if (localStorage.getItem("myjewelacctoken")) {
                getUserdetail();
                getUser();
                getUserorders();
                document.title = "User Account - MJS";
            }
            else if (localStorage.getItem("myjeweladmintoken")) {
                getOrdersForAdmin();
                getMetalPrice();
                document.title = "Admin Account - MJS";
            }
            else {
                navigate("/userlogin");
            }
        }
        catch (err) {
            if (shouldDo.current) {
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
                shouldDo.current = false;
            }
            navigate("/");
        }

        // eslint-disable-next-line
    }, []);

    const [isEditingAddress, setEditingAddress] = useState(false);
    const [isUpdatingPrice, setUpdatingPrice] = useState(false);

    const [useraddress, setUseraddress] = useState({ id: "", localAddress: "", city: "", pinCode: "", state: "", phoneno: "" });

    const [ismetalPrice, setMetalprice] = useState({ goldPrice: "", silverPrice: "" });

    const onChangeSet = (event) => {
        setUseraddress({ ...useraddress, [event.target.name]: event.target.value });
    }

    const onChangeMetalPrice = (event) => {
        setMetalprice({ ...ismetalPrice, [event.target.name]: event.target.value });
    }

    const handleLogin = () => {
        if (useraddress.phoneno.length !== 10) {
            toast.warn('Please enter the 10-digit phone number', {
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

        else if (useraddress.localAddress === "") {
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

        else if (useraddress.city === "") {
            toast.warn('Please enter your city name', {
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

        else if (useraddress.pinCode === "") {
            toast.warn('Please enter the city PIN Code', {
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

        else if (useraddress.state === "") {
            toast.warn('Please enter state name', {
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
            updateUseraddress(userdet._id, useraddress.localAddress, useraddress.city, useraddress.pinCode, useraddress.state, useraddress.phoneno);
            getUserdetail();
            toggleEditAddress();
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
        }

    };

    // Function to toggle address editing mode
    const toggleEditAddress = () => {
        if (isdetail) {
            setUseraddress({ id: userdet._id, localAddress: userdet.locaddress, city: userdet.city, pinCode: userdet.pin, state: userdet.state, phoneno: userdet.phoneno });
        }
        else {
            navigate("/userdetails");
        }
        setEditingAddress(!isEditingAddress);
    };

    // Function to toggle update metal price mode
    const toggleUpdate = () => {
        try {
            setMetalprice({ goldPrice: metalPrice.goldprice, silverPrice: metalPrice.silverprice })
            setUpdatingPrice(!isUpdatingPrice);
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
        }
    };

    // Updating Metal Pice
    const handleMetalPriceUpdate = () => {
        if (ismetalPrice.goldPrice === "") {
            toast.warn('Please enter the Gold price', {
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

        else if (ismetalPrice.silverPrice === "") {
            toast.warn('Please enter the Silver price', {
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
            updateMetalPrice(metalPrice._id, ismetalPrice.goldPrice, ismetalPrice.silverPrice);
            getMetalPrice();
            toggleUpdate();
            toast('😇 Metal Price updated successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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
        }

    };

    const getLogout = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                if (localStorage.getItem("myjewelacctoken")) {
                    localStorage.removeItem("myjewelacctoken");
                    props.setUser(false);
                    navigate("/userlogin");
                    toast.warn(`User Logout successfully`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    localStorage.removeItem("myjeweladmintoken");
                    navigate("/userlogin");
                    toast.warn(`Admin Logout successfully`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        })

    };

    const handleDelivered = (id) => {
        if (localStorage.getItem("myjeweladmintoken")) {
            Swal.fire({
                title: 'Is this order delivered?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I delivered it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    updateOrderAdmin(id, "1");
                }
            })
        }

    }

    const handleDeleteOrder = (id) => {
        if (localStorage.getItem("myjeweladmintoken")) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to delete this order",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        deleteOrderAdmin(id);
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
                    }
                }
            })
        }

    }

    const handleDeleteOrderUser = (id) => {
        if (localStorage.getItem("myjewelacctoken")) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to discard this item",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    try {
                        deleteOrderUser(id);
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
                    }
                }
            })
        }

    }


    return (
        <div className={`min-h-screen container mx-auto px-4 py-6 ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"}`}>
            <div className="max-w-lg mx-auto rounded-lg">
                <div data-aos="zoom-in" data-aos-duration="500" className="py-2">
                    <div className="flex flex-col py-6 items-center space-y-4 mb-8">
                        <div className='flex flex-col p-5 items-center space-y-2'>
                            <div className="w-16 h-16 overflow-hidden rounded-full shadow-lg shadow-black">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-3xl text-center font-extrabold mb-4 textsh">User Account</h2>
                        </div>
                        <div className={`flex flex-col items-center justify-center py-3 px-5 shadow-lg ${props.mode === "light" ? "shadow-gray-700" : "shadow-black"} rounded-xl`}>
                            <p className={`font-bold ${props.mode === "light" ? "text-gray-700" : "text-white"} text-2xl`}>Hello ! 👋 {user.name}</p>

                            <HashLink to="/#homesecitems" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} text-center`}>Explore to get more and make your fashion look more charming..!</HashLink>

                            <button
                                className="bg-blue-700 hover:bg-blue-800 rounded-md border text-white px-2 py-1 mt-4"
                                onClick={getLogout}
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                    {
                        (!localStorage.getItem("myjeweladmintoken") && localStorage.getItem("myjewelacctoken")) && <div className="mb-6">
                            {loading ? <AddrSpinner/> :
                                <div>
                                    <h3 className="text-3xl font-bold text-center">Address</h3>
                                    {isEditingAddress ? (
                                        <div className="mt-8 space-y-6">
                                            <div className="rounded-md shadow-sm space-y-2">

                                                <div>
                                                    <label htmlFor="localAddress" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} block ml-1`}>
                                                        Local Address
                                                    </label>
                                                    <input
                                                        id="localAddress"
                                                        name="localAddress"
                                                        type="text"
                                                        required
                                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Enter your Local Address"
                                                        value={useraddress.localAddress}
                                                        onChange={onChangeSet}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="city" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} block ml-1`}>
                                                        City
                                                    </label>
                                                    <input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        required
                                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Enter you city"
                                                        value={useraddress.city}
                                                        onChange={onChangeSet}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="pinCode" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} block ml-1`}>
                                                        Pin Code
                                                    </label>
                                                    <input
                                                        id="pinCode"
                                                        name="pinCode"
                                                        type="text"
                                                        required
                                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Enter the Pin Code"
                                                        value={useraddress.pinCode}
                                                        onChange={onChangeSet}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="state" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} block ml-1`}>
                                                        State
                                                    </label>
                                                    <input
                                                        id="state"
                                                        name="state"
                                                        type="text"
                                                        required
                                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Enter State"
                                                        value={useraddress.state}
                                                        onChange={onChangeSet}
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="phoneno" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} block ml-1`}>
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        id="phoneno"
                                                        name="phoneno"
                                                        type="text"
                                                        required
                                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                        placeholder="Enter your phone number"
                                                        value={useraddress.phoneno}
                                                        onChange={onChangeSet}
                                                    />
                                                </div>

                                            </div>

                                            <div>
                                                <button
                                                    type="button"
                                                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                    onClick={handleLogin}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col items-center'>
                                            {isdetail ? <div className='flex flex-col items-center'>
                                                <p className={`text-gray-600 ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>Street: {userdet.locaddress}</p>
                                                <p className={`text-gray-600 ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>City: {userdet.city}, {userdet.state} {userdet.pin}</p>
                                                <p className={`text-gray-600 ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>Contact Number: {userdet.phoneno}</p>
                                            </div> : <div className={`${props.mode === "light" ? "text-gray-700" : "text-white"}`}>Please add your address</div>
                                            }

                                            <button
                                                className="bg-blue-700 hover:bg-blue-800 rounded-md border text-white px-2 py-1 mt-4"
                                                onClick={toggleEditAddress}
                                            >
                                                {isdetail ? "Change Address" : "Add Address"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    }


                </div>
            </div>
            {
                (isOrder && localStorage.getItem("myjewelacctoken")) && <div>
                    <h3 className="text-3xl font-bold text-center my-6">Your Orders</h3>
                    <div className={`${props.mode === "light" ? "text-gray-700" : "text-white"} flex items-center justify-center flex-wrap gap-8`}>
                        {
                            userOrders.map((allorders) => {
                                return <div key={allorders._id} className='flex flex-col lg:flex-row w-4/6 md:w-2/6 lg:w-2/6 lg:h-44 overflow-hidden rounded-xl'>
                                    <div className='lg:w-2/3 w-full h-44 lg:h-auto flex items-center justify-center'>
                                        <img className='h-full w-full object-cover object-center' src={allorders.imglink} alt="product" />
                                    </div>
                                    <div className='flex items-center justify-center flex-col w-full p-2 bg-gray-200 text-black relative'>

                                        {allorders.isdelivered === "0" && <div onClick={() => { handleDeleteOrderUser(allorders._id) }} className='absolute top-1 right-3 cursor-pointer text-red-500'><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></div>}

                                        {allorders.isdelivered === "1" ? <div className='absolute top-1 left-3 text-green-500 flex items-center justify-center space-x-1'><span>Delivered..</span><i class="fa fa-thumbs-o-up fa-lg" aria-hidden="true"></i></div> : <div className='absolute top-1 left-3 text-orange-600'>Coming Soon! <i class="fa fa-truck fa-lg" aria-hidden="true"></i></div>}

                                        <div className='text-center font-bold mt-5 md:mt-2'>{allorders.name}</div>
                                        <div className='flex justify-between w-full'>
                                            <div>Weight(g)</div>
                                            <div>{allorders.weight}</div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div>Making charge</div>
                                            <div>₹{allorders.makingcharge}</div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div>Price</div>
                                            <div>₹{allorders.price}</div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }

            {
                localStorage.getItem("myjeweladmintoken") && <div className="mb-6">
                    <h3 className="text-3xl font-bold text-center">Some Daily Updates</h3>
                    {isUpdatingPrice ? (
                        <div className="flex flex-col items-center justify-center mt-8 space-y-6">
                            <div className="space-y-2">

                                <div>
                                    <label htmlFor="localAddress" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} block ml-1`}>
                                        Gold Price
                                    </label>
                                    <input
                                        id="goldPrice"
                                        name="goldPrice"
                                        type="text"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter Gold Price"
                                        value={ismetalPrice.goldPrice}
                                        onChange={onChangeMetalPrice}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="city" className={`${props.mode === "light" ? "text-gray-700" : "text-white"} block ml-1`}>
                                        Silver Price
                                    </label>
                                    <input
                                        id="silverPrice"
                                        name="silverPrice"
                                        type="text"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter Silver Price"
                                        value={ismetalPrice.silverPrice}
                                        onChange={onChangeMetalPrice}
                                    />
                                </div>

                            </div>

                            <div>
                                <button
                                    type="button"
                                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    onClick={handleMetalPriceUpdate}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center'>
                            <div className={`${props.mode === "light" ? "text-gray-700" : "text-white"} flex flex-col items-center`}>
                                <div>Gold Price: ₹{metalPrice.goldprice}</div>
                                <div>Silver Price: ₹{metalPrice.silverprice}</div>
                            </div>
                            <button
                                className="bg-blue-700 hover:bg-blue-800 rounded-md border text-white px-2 py-1 mt-4"
                                onClick={toggleUpdate}
                            >Update
                            </button>
                        </div>
                    )}
                </div>
            }

            {
                (isOrder && localStorage.getItem("myjeweladmintoken")) && <div>
                    <h3 className="text-3xl font-bold text-center my-6">Orders By All Users</h3>
                    <div className={`${props.mode === "light" ? "text-gray-700" : "text-white"} flex items-center justify-center flex-wrap-reverse gap-8`}>
                        {
                            userOrders.map((allorders) => {
                                return <div key={allorders._id} className='flex flex-col lg:flex-row w-4/6 md:w-2/6 lg:w-2/6 lg:h-56 overflow-hidden rounded-xl'>
                                    <div className='lg:w-2/3 w-full h-44 lg:h-auto flex items-center justify-center'>
                                        <img className='h-full w-full object-cover object-center' src={allorders.imglink} alt="product" />
                                    </div>
                                    <div className='flex items-center justify-center flex-col w-full p-2 bg-gray-200 text-black lg:text-xs relative'>

                                        <div onClick={() => { handleDeleteOrder(allorders._id) }} className='absolute top-1 right-3 cursor-pointer text-red-500'><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></div>

                                        {allorders.isdelivered === "1" ? <div className='absolute top-1 left-3 cursor-pointer text-green-500'><i class="fa fa-thumbs-o-up fa-xl" aria-hidden="true"></i></div> : <div onClick={() => { handleDelivered(allorders._id) }} className='absolute top-1 left-3 cursor-pointer text-orange-600'><i class="fa fa-truck fa-lg" aria-hidden="true"></i></div>}

                                        <div className='text-center text-sm font-semibold mt-4 lg:mt-0'>{allorders.name}</div>
                                        <div className='text-center text-[0.8rem]'>({allorders._id})</div>
                                        <div className='flex justify-between w-full'>
                                            <div>Weight(g)</div>
                                            <div>{allorders.weight}</div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div>Making charge</div>
                                            <div>₹{allorders.makingcharge}</div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div>Price</div>
                                            <div>₹{allorders.price}</div>
                                        </div>
                                        <div className='flex flex-col text-center w-full'>
                                            <div className='text-sm font-semibold'>Address</div>
                                            <div>{allorders.locaddress}, {allorders.city}, {allorders.pin}, {allorders.state}</div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div>User Name</div>
                                            <div>{allorders.username}</div>
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <div>Phone No:</div>
                                            <div>{allorders.phoneno}</div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default UserAccount;