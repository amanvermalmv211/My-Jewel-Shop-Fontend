import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderCall = (props) => {

    const context = useContext(userContext);
    const { getPinCode, getPINCode, isdetail, userdet, getUserdetail } = context;
    const [isShow, setShow] = useState(false);
    const navigate = useNavigate(null);

    const shouldDo = useRef(true);

    useEffect(() => {
        try {
            getPINCode();
            getUserdetail();
        }
        catch (err) {
            if(shouldDo.current){
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

        if (localStorage.getItem("myjewelacctoken")) {
            if (isdetail) {
                for (let i = 0; i < getPinCode.length; i++) {
                    const ele = getPinCode[i];
                    if (ele.pin === userdet.pin) {
                        setShow(true);
                    }
                }
            }
        }

        // eslint-disable-next-line
    }, []);

    const handleOrderCall = () => {
        if (localStorage.getItem("myjewelacctoken")) {
            if (isdetail) {
                window.location.href = `tel:9795544677`;
            }
        }
    }

    return (
        <>
            <section className={`${props.mode === "light" ? "text-gray-700" : "text-white"} body-font ${!isShow && "hidden"}`}>
                <div className="container px-5 py-12 mx-auto">
                    <div className={`${props.mode === "light" ? "bg-blue-700" : "bg-white"} h-1 rounded overflow-hidden mb-6`}></div>
                    <div className="text-center mb-20">
                        <h1 className={`sm:text-3xl text-3xl font-medium title-font mb-4 ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"}`}>Can't Find Your Perfect {props.jewel}? Create it !</h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">If you can't find the {(props.jewel).toLowerCase()} of your dreams within our existing {props.jewel} catalog, we invite you to explore the world of custom jewelry. We're ready to create something as unique as you are.</p>
                        <div className="flex mt-6 justify-center">
                            <div className={`w-32 h-1 rounded-full ${props.mode === "light" ? "bg-blue-700" : "bg-white"} inline-flex`}></div>
                        </div>
                        <div className={`flex mt-6 justify-center text-2xl font-medium`}>
                            <div>Why Choose Custom Jewelry from Us :</div>
                        </div>

                    </div>
                    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-24 h-24 inline-flex items-center justify-center rounded-full mb-5 flex-shrink-0">
                                <img src="https://st3.depositphotos.com/1177973/15212/i/450/depositphotos_152129678-stock-photo-jewelry-accessories-in-box.jpg" alt="" className='h-full w-full rounded-full' />
                            </div>
                            <div className="flex-grow">
                                <h2 className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} text-lg title-font font-medium mb-3`}>One-of-a-Kind Designs</h2>
                                <p className="leading-relaxed text-base">Your custom piece will be a true original, made to your exact specifications and hope.</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-24 h-24 inline-flex items-center justify-center rounded-full mb-5 flex-shrink-0">
                                <img src="https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?cs=srgb&dl=pexels-pixabay-248077.jpg&fm=jpg" alt="" className='w-full h-full rounded-full' />
                            </div>
                            <div className="flex-grow">
                                <h2 className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} text-lg title-font font-medium mb-3`}>Quality Craftsmanship</h2>
                                <p className="leading-relaxed text-base">Our artisans are experts in their craft, ensuring the highest level of quality and purity.</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
                            <div className="w-24 h-24 inline-flex items-center justify-center rounded-full mb-5 flex-shrink-0">
                                <img src="https://img.freepik.com/premium-photo/money-making-crafts-home-how-make-money-crafting-small-local-business-two-female-jewelry-artists-making-jewelry-two-business-owner-women-designing-jewelry-workshop-studio_945447-5287.jpg" alt="" className='w-full h-full rounded-full' />
                            </div>
                            <div className="flex-grow">
                                <h2 className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} text-lg title-font font-medium mb-3`}>Personal Consultation</h2>
                                <p className="leading-relaxed text-base">Discuss your ideas, budget, and preferences with us to get the same as you want.</p>
                            </div>
                        </div>

                    </div>

                    <div className='flex items-center justify-center mt-16 text-center'>If you're ready to embark on the journey of creating your dream jewelry piece, simply give us a call.</div>

                    <button className='flex items-center justify-center mt-3 text-white border-0 bg-blue-700 p-2 focus:outline-none hover:bg-blue-800 rounded-lg text-sm mx-auto w-32' onClick={handleOrderCall}> <span className='mx-1'>Contact Us</span> <i className="fa fa-volume-control-phone mx-1" aria-hidden="true"></i></button>
                </div>
            </section>
        </>
    )
}

export default OrderCall;