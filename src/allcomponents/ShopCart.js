import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';
import { toast } from 'react-toastify';
import { HashLink } from 'react-router-hash-link';

const ShopCart = ({ isOpen, onClose, isUser }) => {

    const context = useContext(userContext);
    const { cartOrder, clearCart, getPinCode, getPINCode, deletePINCode, addPINCode, removeCartItem } = context;

    const navigate = useNavigate(null);

    const handleBuyNow = (prodDetails) => {
        if (!localStorage.getItem("myjewelacctoken")) {
            toast.warn('To access this feature, please logged in first', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/userlogin");
            return;
        }

        if (prodDetails.quantity <= 0) {
            toast.warn('Oops! Currently, this item is out of stock.', {
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
            navigate("/buyprod", { state: prodDetails });
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

    const deltePinCodebyAdmin = (id) => {
        if (localStorage.getItem("myjeweladmintoken")) {
            try {
                deletePINCode(id);
                toast.warn('Pin Code has been deleted.', {
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
        }

    }

    const [isAdd, setAdd] = useState(false);
    const handleAddPin = () => {
        if (localStorage.getItem("myjeweladmintoken")) {
            setpinCodeChange("");
            setAdd(true);
        }

    }

    const [pinCodeChange, setpinCodeChange] = useState("");
    const handlePinCodeChange = (e) => {
        if (localStorage.getItem("myjeweladmintoken")) {
            setpinCodeChange(e.target.value);
        }

    }

    const handleAddPinCode = (e) => {
        if (localStorage.getItem("myjeweladmintoken")) {
            if (pinCodeChange === "") { setAdd(false); return; }
            for (let i = 0; i < getPinCode.length; i++) {
                const ele = getPinCode[i];
                if (ele.pin === pinCodeChange) {
                    setAdd(false);
                    toast.success('This PIN Code is already in list.', {
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
            }

            try {
                addPINCode(pinCodeChange);
                toast.success('Pin Code has been added.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setAdd(false)
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

    }

    const removeFromCart = (id, name) => {

        removeCartItem(id);

        toast.success(`${name} has been removed!`, {
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

    const shouldDo = useRef(true);
    useEffect(() => {
        try {
            getPINCode();
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

    useEffect(() => {
        // Add or remove a CSS class to the body when the modal opens or closes
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [isOpen]);

    return (
        <div
            className={`fixed top-0 right-0 rounded-lg w-72 md:w-96 h-full bg-blue-200 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out overflow-y-auto z-20`}
        >
            <div className='sticky top-0 right-0 bg-blue-200 z-20 p-4'>
                <div className="px-2 pt-2">
                    {!localStorage.getItem("myjeweladmintoken") ? <h2 className="text-2xl font-semibold w-52 md:w-80 text-center">My Jewel Shopping Cart</h2> : <h2 className="text-2xl font-semibold w-52 md:w-72 text-center">All Serviceable PIN Codes</h2>}
                </div>
                <button className="absolute top-3 right-3 text-gray-700 hover:text-red-500" onClick={onClose}>
                    <i className="fa fa-window-close-o fa-2xl" aria-hidden="true"></i>
                </button>
            </div>

            {((Object.keys(cartOrder).length > 0 && !localStorage.getItem("myjeweladmintoken")) || isUser || localStorage.getItem("myjewelacctoken")) ? <div className='p-3 md:p-10'>
                <ol className='space-y-2'>
                    {Object.keys(cartOrder).length === 0 && <div className='font-semibold mb-5'>
                        Your cart is Empty!
                    </div>}
                    {
                        Object.keys(cartOrder).map((itemsDet, index) => {
                            return <li key={itemsDet}> <div className='flex items-center text-gray-700 mb-4 relative'>
                                <div className='font-semibold w-7'>{index + 1}.</div>

                                <div className='absolute -top-2 right-[4.5rem] md:right-[4rem] flex items-center justify-center rounded-full cursor-pointer bg-white text-red-500' onClick={() => { removeFromCart(cartOrder[itemsDet]._id, cartOrder[itemsDet].name) }}><i className="fa fa-minus-circle" aria-hidden="true"></i></div>

                                <div className='flex flex-row w-40 md:w-4/6 h-16 overflow-hidden rounded-md border border-black mr-2'>

                                    <div className='lg:w-2/3 w-full h-full lg:h-auto flex items-center justify-center'>
                                        <img className='h-full w-full object-cover object-center' src={cartOrder[itemsDet].imglink} alt="product" />
                                    </div>
                                    <div className='flex items-center justify-center flex-col border w-full p-2 bg-gray-200'>
                                        <div className='text-center font-bold text-sm'>{cartOrder[itemsDet].name}</div>
                                        <div className='text-[0.44rem] text-black'>({cartOrder[itemsDet]._id})</div>
                                        <div className='flex justify-between w-full text-[0.75rem]'>
                                            <div>Weight(g)</div>
                                            <div>{cartOrder[itemsDet].weight}</div>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-white bg-blue-700 p-1 px-3 hover:bg-blue-800 rounded-md text-xs" onClick={() => {
                                    handleBuyNow(cartOrder[itemsDet])
                                    onClose()
                                }}>Get It</button>
                            </div>
                            </li>
                        })
                    }
                </ol>

                <div onClick={() => { navigate("/"); onClose() }} className={`text-blue-700 hover:text-gray-900 mt-10 cursor-pointer`}>
                    <HashLink to={"/#homesecitems"}>Click here and Explore to get more.</HashLink>
                </div>

                <button className='flex items-center justify-center mt-16 text-white border-0 bg-blue-700 p-2 focus:outline-none hover:bg-blue-800 rounded-lg text-sm mx-auto' onClick={() => { clearCart() }}><i className="fa fa-trash-o mx-1" aria-hidden="true"></i> <span className='mx-1'>Clear Cart</span></button>
            </div> :
                <div>
                    {!localStorage.getItem("myjeweladmintoken") && <div className='p-8 md:p-12'>
                        <div>Please log in or sign up to continue shopping and keep your favorite items safe in your cart. Logging in or creating an account will help you keep track of your selections and complete your purchase with ease. Unlock a world of shopping delights! <p>🌟 Log in or sign up now to explore our exquisite collection. Experience seamless shopping and exclusive offers.</p> <p>Join us on this fashion journey today!</p> </div>

                        <div className='flex justify-center space-x-6 mt-12'>
                            <Link className="text-white bg-blue-700 py-2 px-4 hover:bg-blue-800 rounded-lg text-sm" to="/userlogin" onClick={onClose}>Log in</Link>
                            <Link className="text-white bg-blue-700 py-2 px-4 hover:bg-blue-800 rounded-lg text-sm" to="/usersignup" onClick={onClose}>Sign up</Link>

                        </div>
                    </div>}
                </div>
            }

            {(localStorage.getItem("myjeweladmintoken")) && <div className='p-6 md:p-12'>
                <ol className='space-y-2'>
                    {
                        getPinCode.map((allPin, index) => {
                            return <li key={allPin._id}> <div className={`flex items-center justify-between text-gray-700 p-0.5 px-3 rounded-md ${index % 2 === 0 ? "bg-orange-200" : "bg-green-200"}`}>
                                <div className='flex flex-row'>
                                    <div className='font-semibold mr-3'>{index + 1}.</div>
                                    <div className='font-semibold'>{allPin.pin}</div>
                                </div>
                                <button onClick={() => { deltePinCodebyAdmin(allPin._id) }}><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></button>
                            </div>
                            </li>
                        })
                    }
                </ol>

                {isAdd ? <div className='mt-8'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                PIN Code
                            </label>
                            <input
                                type="text"
                                id="pinCode"
                                name="pinCode"
                                required
                                placeholder="Add PIN Code here"
                                className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                                value={pinCodeChange}
                                onChange={handlePinCodeChange}
                            />
                        </div>

                        <div>
                            <button
                                type="button"
                                className="w-full my-6 px-4 py-2 font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:bg-blue-600"
                                onClick={handleAddPinCode}
                            >
                                <i className="fa fa-map-marker mr-1 text-red-500" aria-hidden="true"></i><span className='mx-1'>Add PIN Code</span>
                            </button>
                        </div>

                    </form>
                </div> : <button className='flex items-center justify-center mt-16 text-white border-0 bg-blue-700 p-2 focus:outline-none hover:bg-blue-800 rounded-lg text-sm mx-auto' onClick={() => { handleAddPin() }}><i className="fa fa-map-marker mr-1 text-red-500" aria-hidden="true"></i><span className='mx-1'>Add PIN Code</span></button>}


            </div>
            }

        </div>
    )
}

export default ShopCart;