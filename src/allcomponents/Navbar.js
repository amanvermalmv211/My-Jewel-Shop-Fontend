import React, { useContext, useEffect, useState } from 'react';
import myLogo from './favicon-310x310.png';
import { Link } from 'react-router-dom';
import ShopCart from './ShopCart';
import userContext from '../context/user/userContext';

const Navbar = (props) => {

    const context = useContext(userContext);
    const { cartOrder, setCartOrder } = context;

    useEffect(() => {
        try {
            if (localStorage.getItem("mycartorder")) {
                setCartOrder(JSON.parse(localStorage.getItem("mycartorder")));
            }
        }
        catch (err) {
            localStorage.removeItem("mycartorder");
        }

        // eslint-disable-next-line
    }, []);

    const [isCartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!isCartOpen);
        if (open) {
            setOpen(false);
        }
    };

    const [open, setOpen] = useState(false);

    const getClose = () => {
        if (open) {
            setOpen(false);
        }
        if (isCartOpen) {
            setCartOpen(false);
        }
    }

    let allLinks = [
        { name: "Necklace", link: "/necklace" },
        { name: "Rings", link: "/rings" },
        { name: "Ear Rings", link: "/earrings" },
        { name: "Nose Rings", link: "/noserings" },
        { name: "Gift Items", link: "/giftitem" }
    ];

    return (
        <>
            <header className={`navBar body-font w-full sticky top-0 left-0 z-20 ${props.mode === "light" ? "bg-blue-700" : "bg-black"}`}>

                <div className={`${props.mode === "light" ? "bg-blue-700" : "bg-black"} container text-white lg:flex items-center p-5 lg:py-3 lg:px-3`}>
                    <Link to="/" className="hidden mr-4 lg:flex title-font font-medium items-center justify-center text-white md:mb-0">
                        <img src={myLogo} alt="" className="w-14 h-10" />
                        <div className="relative lg:cursor-pointer ml-3 text-xl overflow-hidden group"><span className="invisible">My Jewel Shop</span><span className="absolute top-0 left-0 group-hover:-translate-y-full transition-transform ease-in-out duration-500 hover:duration-300">My Jewel Shop</span><span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 hover:duration-300">My Jewel Shop</span></div>
                    </Link>

                    <Link to="/" className="myIcon text-white flex justify-center items-center lg:hidden absolute left-2 top-1 font-bold cursor-default" onClick={getClose}>
                        <img src={myLogo} alt="" className="w-12 h-8 mr-1" />
                        <span className='text-lg' id="spanHeading">My Jewel Shop</span>
                    </Link>

                    <nav className={`${props.mode === "light" ? "bg-blue-700" : "bg-black"} lg:flex grid grid-cols-3 text-center w-full lg:w-auto lg:pb-0 pt-3 pb-3 lg:pt-0 absolute lg:static lg:z-auto -z-50 left-0 transition-all lg:transition-none duration-500 ease-out ${open ? 'top-10' : 'top-[-1000px]'} lg:border-l-2 lg:border-[#d4af37] border-t-2 border-[#d4af37] md:border-t-0`}>

                        {
                            allLinks.map((myLink) => (
                                <li key={myLink.name} className='lg:ml-4 xl:ml-7 lg:my-0 my-3 list-none relative after:absolute after:bg-[#d4af37] after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 lg:hover:after:origin-bottom-left lg:hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 lg:cursor-pointer'>
                                    <Link onClick={getClose} to={myLink.link}>{myLink.name}</Link>
                                </li>
                            ))
                        }

                        <div className="group relative flex items-center justify-center lg:ml-4 xl:ml-7 lg:my-0 my-3 lg:cursor-pointer">
                            <div>Silver Items</div>
                            <div className="absolute top-6 hidden group-hover:block py-2 text-start w-24 bg-blue-200 text-black font-semibold rounded-lg shadow-lg">
                                <Link to="/payal" onClick={getClose} className="block p-2 hover:scale-105">Payal</Link>
                                <Link to="/silverlocket" onClick={getClose} className="block p-2 hover:scale-105">Locket</Link>
                                <Link to="/bracelet" onClick={getClose} className="block p-2 hover:scale-105">Bracelet</Link>
                                <Link to="/rakhi" onClick={getClose} className="block p-2 hover:scale-105">Rakhi</Link>
                            </div>
                        </div>

                    </nav>

                    <div onClick={toggleCart} className="lg:relative absolute top-2 lg:top-0 right-12 lg:-right-[14rem] xl:-right-[36rem] lg:items-center lg:cursor-pointer text-[#d4af37]">
                        {!localStorage.getItem("myjeweladmintoken") ? <i className={`setMode fa fa-cart-plus fa-lg`} aria-hidden="true"></i> : <i className="fa fa-map-marker fa-lg" aria-hidden="true"></i>}
                        {
                            (Object.keys(cartOrder).length !== 0 && !localStorage.getItem("myjeweladmintoken")) && <div className='absolute bg-red-500 text-white -top-1.5 lg:-top-3 -right-2.5 rounded-full w-2 h-2 flex items-center justify-center p-2 lg:p-2.5 text-xs'>{Object.keys(cartOrder).length}</div>
                        }

                    </div>

                    <div className="lg:relative absolute top-2 lg:top-0 right-[5.3rem] lg:-right-[8.5rem] xl:-right-[29rem] lg:items-center lg:cursor-pointer text-[#d4af37]" onClick={getClose}>
                        <Link to="/useraccount"><i className={`setMode fa fa-user-circle fa-lg`} aria-hidden="true" ></i></Link>
                    </div>

                    <div className="lg:relative absolute top-2.5 lg:top-0 right-[7.5rem] lg:-right-[2.5rem] xl:-right-[22rem] lg:items-center lg:cursor-pointer text-[#d4af37]" onClick={props.toggleMode}>
                        {props.mode === "light" ? <img src="https://cdn-icons-png.flaticon.com/512/4892/4892988.png" className='w-5 h-5' alt="Night Mode" onClick={getClose} /> : <img src="https://static.vecteezy.com/system/resources/thumbnails/019/922/854/small/illustration-of-3d-sun-icon-png.png" className='w-5 h-5' alt="Night Mode" onClick={getClose} />}

                    </div>

                    <div onClick={() => { setOpen(!open) }} className='lg:hidden absolute right-3 top-2 text-[#d4af37]'>
                        <i className={`setCross fa ${open ? 'fa-times' : 'fa-bars'} fa-bars fa-xl`} aria-hidden="true"></i>
                    </div>

                </div>

            </header>

            <ShopCart isOpen={isCartOpen} onClose={toggleCart} isUser={props.isUser} />

        </>
    )
}

export default Navbar;