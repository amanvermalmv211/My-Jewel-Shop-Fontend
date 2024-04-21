import React, { useEffect } from 'react'
import myLogo from './faviconfulllogo.png';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";

const Footer = () => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <>

            <footer className={`footer flex flex-col items-center justify-center pt-5 text-[#d4af37] bg-black`}>
                <img data-aos="fade-down" data-aos-duration="500" className="flex w-36 h-24 mb-4" alt='My Jewel Shop' src={myLogo} />
                <section className="twoCont flex flex-col items-center justify-around w-[100%]">
                    <section className="socialContact flex flex-col lg:flex-row flex-wrap items-center justify-center p-2" data-aos="zoom-in" data-aos-duration="500">
                        <div>
                            <h1 className='font-bold text-xl'>Get In Touch :</h1>
                        </div>

                        <div className="flex m-2 space-x-4">
                            <Link to="https://wa.me/919795544677" className="rounded p-1 px-2 hover:scale-125 bg-green-500 hover:bg-black text-white hover:text-green-500 m-1 "> <i className="fa fa-whatsapp fa-lg" aria-hidden="true"></i> </Link>

                            <Link to="https://www.facebook.com/profile.php?id=100011377276805" className="rounded p-1 px-2 hover:scale-125 bg-blue-500 hover:bg-black text-white hover:text-blue-500 m-1 "> <i className="fa fa-facebook-official fa-lg" aria-hidden="true"></i> </Link>

                            <Link to="https://www.instagram.com/invites/contact/?i=1ele9i6x7lf2r&utm_content=40gsjzh" className="rounded p-1 px-2 hover:scale-125 bg-pink-500 hover:bg-black text-white hover:text-pink-400 m-1 "> <i className="fa fa-instagram fa-lg" aria-hidden="true"></i> </Link>

                            <Link to="mailto:amanvermalmv211@gmail.com" className="rounded p-1 px-2 hover:scale-125 bg-yellow-500 hover:bg-black text-white hover:text-yellow-500 m-1 "> <i className="fa fa-envelope fa-lg" aria-hidden="true"></i> </Link>

                            <Link to="tel:6306805527" className="rounded p-1 px-[0.6rem] hover:scale-125 bg-gray-500 hover:bg-black text-white hover:text-gray-400 m-1 "> <i className="fa fa-volume-control-phone" aria-hidden="true"></i> </Link>

                        </div>

                    </section>

                    <section className="quickLinks flex flex-wrap items-center justify-center my-2 px-2 lg:w-[58rem] xl:w-auto">
                        <div>
                            <h1 className='font-bold text-xl'>Quick Links :</h1>
                        </div>

                        <ul className='flex justify-center items-center flex-wrap'>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/"}>Home</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/necklace"}>Necklace</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/rings"}>Rings</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/earrings"}>Ear Rings</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/noserings"}>Nose Rings</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/bangles"}>Bangles</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/chain"}>Chains</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/goldlockets"}>Gold Lockets</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/giftitem"}>Gift Items</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/payal"}>Payal</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/bracelet"}>Bracelet</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/rakhi"}>Rakhi</HashLink></li>
                            <li className='my-2 mx-4 text-gray-300 hover:text-blue-500 hover:scale-110'><HashLink to={"/silverlocket"}>Silver Locket</HashLink></li>
                        </ul>
                    </section>
                </section>

                <div className="text-gray-300 font-medium mt-4 text-xs p-2 text-center"> Copyright 2023. All rights reserved by <HashLink to="/" className="text-blue-600">My Jewl Shop</HashLink> </div>
            </footer>

        </>
    )
}

export default Footer;