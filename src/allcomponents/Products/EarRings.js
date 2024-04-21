import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../../context/user/userContext';
import OrderCall from '../Orders/OrderCall';
import ProdList from './ProdList';
import { toast } from 'react-toastify';
import Spinner from '../Orders/Spinner';
import { useNavigate } from 'react-router-dom';

const EarRings = (props) => {

    const context = useContext(userContext);
    const { product, getProduct, addProduct, loading } = context;
    const navigate = useNavigate(null);

    const shouldDo = useRef(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Ear Rings - MJS";

        try {
            getProduct("Ear Ring");
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

        // eslint-disable-next-line
    }, []);

    const [spinSingUpLoading, setSpinSingUpLoading] = useState(false);
    const [isEditingAddress, setEditingAddress] = useState(false);
    const [earring, setEarring] = useState({ name: "Ear Ring", imglink: "", weight: "", ktgold: "", makingcharge: "0", finalmakingcharge: "", gst: "3", quantity: "" });

    const handleearringChange = (e) => {
        setEarring({ ...earring, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (localStorage.getItem("myjeweladmintoken")) {
            if (!earring.name) {
                toast.warn('Please Enter the product name.', {
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

            else if (!earring.imglink) {
                toast.warn('Please enter the image link', {
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

            else if (!earring.weight) {
                toast.warn('Please enter the weight of the product.', {
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

            else if (!earring.ktgold) {
                toast.warn('Please enter the quality of the gold', {
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

            else if (!earring.makingcharge) {
                toast.warn('Please enter the making charge for discount if any.', {
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

            else if (!earring.finalmakingcharge) {
                toast.warn('Please enter the final making charge', {
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

            else if (!earring.gst) {
                toast.warn('Please enter the gst in %', {
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

            else if (!earring.quantity) {
                toast.warn('Please enter quantity', {
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
                addProduct(earring);
                toast.success('Item added successfully..!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setEditingAddress(false);
                setSpinSingUpLoading(false);
                setEarring({ name: "Ear Ring", imglink: "", weight: "", ktgold: "", makingcharge: "0", finalmakingcharge: "", gst: "3", quantity: "" });
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

    return (
        <>
            <div className={`py-6 sm:py-8 lg:py-12 ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="mb-10 md:mb-16">
                        <h2 className={`mb-4 text-center text-2xl font-bold ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} md:mb-6 lg:text-3xl`}>Ear Rings</h2>

                        {localStorage.getItem("myjeweladmintoken") ? <div className='flex items-center justify-center p-4'>
                            {isEditingAddress ? <form className="space-y-6 w-96" onSubmit={(e) => e.preventDefault()}>
                                <div className={`rounded-md shadow-sm space-y-2 ${props.mode === "light" ? "text-gray-700" : "text-white"}`}>

                                    <div className="flex flex-col">
                                        <label htmlFor="imglink" className="block ml-1">Image Link</label>
                                        <div className='flex'>
                                            <input
                                                type="text"
                                                id="imglink"
                                                name="imglink"
                                                autoComplete="imglink"
                                                required
                                                placeholder="Enter the edited image link"
                                                className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                                value={earring.imglink}
                                                onChange={handleearringChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='relative'>
                                        <label htmlFor="weight" className="block ml-1">
                                            Weight (g)
                                        </label>
                                        <input
                                            id="weight"
                                            name="weight"
                                            type='text'
                                            autoComplete="weight"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter the weight of the product in grams"
                                            value={earring.weight}
                                            onChange={handleearringChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="ktgold" className="block ml-1">
                                            kt Gold
                                        </label>
                                        <input
                                            id="ktgold"
                                            name="ktgold"
                                            type="text"
                                            autoComplete="ktgold"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter the gold quality in Karat"
                                            value={earring.ktgold}
                                            onChange={handleearringChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="makingcharge" className="block ml-1">
                                            Making Charge per gram for discount
                                        </label>
                                        <input
                                            id="makingcharge"
                                            name="makingcharge"
                                            type="text"
                                            autoComplete="makingcharge"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Making Charge / gram for discount if any"
                                            value={earring.makingcharge}
                                            onChange={handleearringChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="finalmakingcharge" className="block ml-1">
                                            Final Making Charge per gram
                                        </label>
                                        <input
                                            id="finalmakingcharge"
                                            name="finalmakingcharge"
                                            type="text"
                                            autoComplete="finalmakingcharge"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter Final Making Charge/gram"
                                            value={earring.finalmakingcharge}
                                            onChange={handleearringChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="gst" className="block ml-1">
                                            GST %
                                        </label>
                                        <input
                                            id="gst"
                                            name="gst"
                                            type="text"
                                            autoComplete="gst"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="GST in percent %"
                                            value={earring.gst}
                                            onChange={handleearringChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="quantity" className="block ml-1">
                                            Quantity
                                        </label>
                                        <input
                                            id="quantity"
                                            name="quantity"
                                            type="text"
                                            autoComplete="quantity"
                                            required
                                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter the quantity of the Ear Ring"
                                            value={earring.quantity}
                                            onChange={handleearringChange}
                                        />
                                    </div>

                                </div>

                                <div>
                                    <div className='flex justify-center my-4'>
                                        <button className='bg-blue-700 hover:bg-blue-800 rounded-md text-white py-2 px-4 w-full' onClick={() => { setEditingAddress(false) }}>Close</button>
                                    </div>
                                    <button
                                        type="submit"
                                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2`}
                                        onClick={handleLogin}
                                    >
                                        {spinSingUpLoading && <i className="fa fa-spinner animate-spin" aria-hidden="true"></i>}
                                        <span>Add Item</span>
                                    </button>
                                </div>
                            </form> : <div>
                                <button
                                    className="bg-blue-700 hover:bg-blue-800 rounded-md border text-white px-2 py-1"
                                    onClick={() => { setEditingAddress(true) }}
                                >
                                    Add New Ear Ring
                                </button>
                            </div>}

                        </div> :
                            <p className={`mx-auto max-w-screen-md text-center md:text-lg`}>Adorn your ears with our stunning collection of Earrings. Find the perfect pair to complement your style. Explore our handpicked selection and find your perfect match.</p>}

                    </div>

                    {loading ? <Spinner mode={props.mode} /> :
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {
                                product.map((proddetials) => {
                                    return <ProdList key={proddetials._id} mode={props.mode} proddetials={proddetials} />
                                })
                            }

                        </div>
                    }

                </div>
            </div>

            {
                localStorage.getItem("myjewelacctoken") && <OrderCall mode={props.mode} jewel={"Ear Rings"} />
            }

        </>
    )
}

export default EarRings;