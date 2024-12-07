import React, { useContext, useEffect, useRef, useState } from 'react';
import userContext from '../../context/user/userContext';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddrSpinner from './AddrSpinner';

const BuyProduct = (props) => {

    const { state } = useLocation();

    const navigate = useNavigate(null);
    const shouldDo = useRef(true);
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     if (!localStorage.getItem("myjewelacctoken")) {
    //         if (shouldDo.current) {
    //             toast.warn('To access this feature, please logged in first', {
    //                 position: "top-center",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //                 shouldDo.current = false;
    //             }
    //         navigate("/userlogin");
    //             return;
    //         }

    //         if (state.weight === undefined) {
    //             navigate("/");
    //             return;
    //         }
    //         // eslint-disable-next-line
    //     }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!localStorage.getItem("myjewelacctoken")) {
            if (shouldDo.current) {
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
                shouldDo.current = false;
            }
            navigate("/userlogin");
            return;
        }
        if (state.weight === undefined) {
            navigate("/");
            return;
        }
        // eslint-disable-next-line
    })

    useEffect(() => {
        document.title = "Buy Product - MJS";

        try {
            getPINCode();
            getUserdetail();
            getUser();
            getMetalPrice();
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
                navigate("/");
                shouldDo.current = false;
            }
        }

        // eslint-disable-next-line
    }, []);

    const context = useContext(userContext);
    const { metalPrice, getPinCode, getPINCode, isdetail, userdet, user, getUser, getUserdetail, placeOrder, getMetalPrice, loading } = context;

    const ktGold = state.ktgold;
    const prodWeight = state.weight;
    const mkCharge = state.makingcharge * prodWeight;
    const finalMkCharge = state.finalmakingcharge * prodWeight;
    const gst = state.gst;
    const metalGoldPrice = metalPrice.goldprice;
    const metalSilverPrice = metalPrice.silverprice;

    let prodGoldPrice;

    if (state.name === "Bracelet" || state.name === "Gift Item" || state.name === "Payal" || state.name === "Rakhi" || state.name === "Silver Locket") {
        prodGoldPrice = (((metalSilverPrice / 100) * ktGold) / 1000) * prodWeight;
    }
    else {
        prodGoldPrice = (((metalGoldPrice / 24) * ktGold) / 10) * prodWeight;
    }


    const gstCost = (prodGoldPrice + finalMkCharge) * (gst / 100);

    const userTotalCost = prodGoldPrice + finalMkCharge + gstCost;

    const forDiscount = (prodGoldPrice + mkCharge) * (gst / 100);
    const virtualCost = prodGoldPrice + mkCharge + forDiscount;

    const discount = ((virtualCost - userTotalCost) / virtualCost) * 100;

    const [isDeliver, setDeliver] = useState(null);

    const checkOut = () => {

        console.log("Before checking for the pin");

        for (let i = 0; i < getPinCode.length; i++) {
            console.log("Inside for loop");

            const ele = getPinCode[i];
            if (ele.pin === userdet.pin) {
                console.log("Inside if condition");

                setDeliver(true);
                toast.success('Yes! Your address is serviceable.', {
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

        console.log("After checking for the pin");
        setDeliver(false);
        toast('🙄 Sorry, we do not yet deliver to your address.', {
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


    const [spinSingUpLoading, setSpinSingUpLoading] = useState();

    const handleUNameChange = () => {
        setSpinSingUpLoading(null);
    };

    const handlePlaceOrder = async () => {
        if (localStorage.getItem("myjewelacctoken")) {
            toast('This website has been created solely for educational purposes and as a part of learning journey.\nThis feature do not work..!', {
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
            placeOrder(state, finalMkCharge.toFixed(2), userTotalCost.toFixed(2), userdet, user.name);
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

        setSpinSingUpLoading(true);
        toast(`😇 Your Order has been placed successfully`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <>
            <div className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} text-3xl font-bold text-center mt-12`}>GET IT NOW</div>
            <div className="py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8 flex items-center justify-center">
                    {loading ? <AddrSpinner /> :
                        <div className="flex flex-col overflow-hidden rounded-xl bg-gray-200 lg:flex-row lg:h-96 lg:w-[70%]">

                            <div className="order-first h-96 w-full bg-gray-300 sm:order-none lg:h-auto lg:w-2/5">
                                <img src={state.imglink} loading="lazy" alt="Goto home page" className="h-full w-full object-cover object-center" />
                            </div>

                            <div className="flex w-full flex-col p-4 lg:px-8 lg:w-3/5">
                                <div className='flex items-center space-x-2'>
                                    <h2 className="mb-1 text-xl font-bold text-gray-700 md:text-2xl lg:text-3xl">Product Details</h2>
                                    <div>({state.name})</div>
                                </div>

                                <div className='flex flex-col items-center justify-center text-sm'>
                                    {
                                        mkCharge > 0 && <div className='flex justify-between w-full'>
                                            <div>Discount</div>
                                            <div>{discount.toFixed(1)}%</div>
                                        </div>
                                    }

                                    <div className='flex justify-between w-full'>
                                        <div>Weight(g)</div>
                                        <div>{prodWeight}</div>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <div>Metal Price</div>
                                        <div>₹ {prodGoldPrice.toFixed(2)}</div>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <div>Making Charge</div>
                                        <div className='flex items-end flex-row-reverse'>
                                            <div className='ml-4'>₹ {finalMkCharge.toFixed(2)}</div>
                                            {mkCharge > 0 && <div className='text-xs text-end line-through text-red-500'>₹ {mkCharge.toFixed(2)}</div>}

                                        </div>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <div>GST({gst}%)</div>
                                        <div>₹ {gstCost.toFixed(2)}</div>
                                    </div>
                                    <div className='flex justify-between w-full rounded-sm border-t-2 border-b-2 mb-1 border-black'>
                                        <div>Total Price</div>
                                        <div>
                                            <div>₹ {userTotalCost.toFixed(2)}</div>
                                        </div>
                                    </div>

                                </div>

                                {isdetail ? <div className='flex flex-col text-gray-900 my-1'>
                                    <p>Street: {userdet.locaddress}</p>
                                    <p>City: {userdet.city}, {userdet.state} {userdet.pin}</p>
                                    <p>Contact Number: {userdet.phoneno}</p>
                                </div> : <Link className={`text-blue-500`} to="/useraccount">Please add your address</Link>
                                }

                                {isdetail && <div className="mt-3 md:mt-auto">
                                    <p>Check if the product can be delivered to your address.</p>
                                    <button className='mt-1 text-white bg-blue-700 p-2 focus:outline-none hover:bg-blue-800 rounded-lg text-sm mx-auto'><i className="fa fa-map-marker mr-1 text-red-500" aria-hidden="true"></i><span className='mx-1' onClick={checkOut}>Checkout</span></button>
                                    {
                                        isDeliver && <div className='mt-1'>Yes! Your address is serviceable.</div>
                                    }

                                    {
                                        (!isDeliver && isDeliver != null) && <div>
                                            <div className='mt-1'>Sorry, we do not yet deliver to your address.</div>
                                        </div>
                                    }

                                </div>}
                            </div>
                        </div>
                    }

                </div>
            </div>

            {isDeliver && <section className="text-gray-600 body-font">
                <div className={`text-center text-3xl font-extrabold ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"}`}>Delivery Steps</div>
                <div className="container px-5 py-2 mx-auto flex flex-wrap">
                    <div className="flex flex-wrap w-full">
                        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className={`h-full w-1 ${props.mode === "light" ? "bg-gray-500" : "bg-gray-200"} pointer-events-none`}></div>
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-700 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className={`font-medium ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} mb-1 tracking-wider`}>STEP 1</h2>
                                    <p className={`leading-relaxed ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>Please check all your details carefully, and if you need to change something, go to your account section and make the necessary adjustments.</p>
                                </div>
                            </div>
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                    <div className={`h-full w-1 ${props.mode === "light" ? "bg-gray-500" : "bg-gray-200"} pointer-events-none`}></div>
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-700 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className={`font-medium ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} mb-1 tracking-wider`}>STEP 2</h2>
                                    <p className={`leading-relaxed ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>We will contact you soon to confirm your order, and please note that the payment method is 'Cash on delivery' only.</p>
                                </div>
                            </div>
                            <div className="flex relative pb-12">
                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-700 inline-flex items-center justify-center text-white relative z-10">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <circle cx="12" cy="5" r="3"></circle>
                                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                                    </svg>
                                </div>
                                <div className="flex-grow pl-4">
                                    <h2 className={`font-medium ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} mb-1 tracking-wider`}>STEP 3</h2>
                                    <p className={`leading-relaxed ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>Within 2-3 working days, your order will be delivered to your doorstep along with the invoice, ensuring a hassle-free and prompt shopping experience.</p>
                                </div>
                            </div>
                        </div>
                        <img className="md:w-1/2 md:h-2/3 object-cover object-center rounded-lg my-8 md:mt-14" src="https://img.freepik.com/premium-vector/detailed-delivery-plan-deliver-your-package-vector-illustration_327176-296.jpg?w=2000" alt="step" />
                    </div>

                    <div className='w-full'>
                        <form action="https://formspree.io/f/mpzgqqkz" method="post" className="flex items-center justify-center flex-col">
                            <div className={`rounded-md shadow-sm space-y-2 ${props.mode === "light" ? "text-gray-700" : "text-white"} hidden`}>

                                <div>
                                    <label htmlFor="uName" className="block ml-1">
                                        Name
                                    </label>
                                    <input
                                        id="uName"
                                        name="localaddress"
                                        type="text"
                                        autoComplete="uName"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter Your Name"
                                        value={userdet.locaddress}
                                        onChange={handleUNameChange}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="block ml-1">Email</label>
                                    <div className='flex'>
                                        <input
                                            type="text"
                                            id="email"
                                            name="city"
                                            autoComplete="email"
                                            required
                                            placeholder="Enter your email address"
                                            className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                            value={userdet.city}
                                            onChange={handleUNameChange}
                                        />
                                    </div>
                                </div>

                                <div className='relative'>
                                    <label htmlFor="password" className="block ml-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="pincode"
                                        type="text"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter Password"
                                        value={userdet.pin}
                                        onChange={handleUNameChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block ml-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="state"
                                        type="text"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter password again"
                                        value={userdet.state}
                                        onChange={handleUNameChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block ml-1">
                                        Phone Number
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="phoneno"
                                        type="text"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter password again"
                                        value={userdet.phoneno}
                                        onChange={handleUNameChange}
                                    />
                                </div>

                                {/* <div>
                                    <label htmlFor="confirmPassword" className="block ml-1">
                                        Product ID
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="product"
                                        type="text"
                                        autoComplete="new-password"
                                        required
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter password again"
                                        value={(buyProd.name + buyProd._id)}
                                        onChange={handleUNameChange}
                                    />
                                </div> */}

                            </div>

                            <div>
                                <button className='flex items-center justify-center mb-10 text-white border-0 bg-blue-700 p-2 focus:outline-none hover:bg-blue-800 rounded-lg text-sm mx-auto' type='button' id='submit' onClick={handlePlaceOrder}>
                                    {!spinSingUpLoading && <i className="fa fa-shopping-bag mx-1" aria-hidden="true"></i>}
                                    {spinSingUpLoading && <i className="fa fa-spinner animate-spin" aria-hidden="true"></i>}
                                    <span className='mx-1'>Place order</span></button>
                            </div>

                        </form>
                    </div>

                </div>

            </section>}



        </>
    )
}

export default BuyProduct;