import React, { useEffect } from 'react'
import HomeItem from './HomeItem';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";

const Home = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "My Jewel Shop - (MJS)";
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <>
        <div className={`flex justify-center py-8`}>
            <div className="flex flex-col items-center justify-center">

                <div className="flex flex-col  max-w-7xl justify-center items-center space-y-3 w-full ">
                    <div className="flex flex-col md:items-start items-center justify-center  space-y-3 px-8 text-center ">
                        <div className={`text-3xl md:text-7xl font-bold ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"}`}>Make Your Fashion Look More Charming</div>
                    </div>
                    <div className="flex flex-col lg:flex-row space-x-2 space-y-3 md:space-x-6   w-full items-center justify-center" data-aos="fade-up" data-aos-duration="500">

                        <Link to={"/rings"} data-aos="fade-up" data-aos-duration="500" className="lg:w-40 w-64 h-40  overflow-hidden rounded-xl group relative">
                            <img src="https://i.etsystatic.com/19340255/r/il/43a197/1863983896/il_fullxfull.1863983896_9sih.jpg" alt="" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                        </Link>
                        <div className="flex flex-row lg:flex-col space-x-3 space-y-6 items-center justify-center">
                            <Link to={"/bangles"} data-aos="fade-up" data-aos-duration="500" className="w-32 lg:w-40 h-32  overflow-hidden rounded-xl group relative">
                                <img src="https://5.imimg.com/data5/SELLER/Default/2021/6/PM/BU/PZ/5386779/40gm-gold-bangles.jpg" alt="" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </Link>
                            <Link to={"/earrings"} data-aos="fade-up" data-aos-duration="500" className="w-32 lg:w-40 lg:h-48  overflow-hidden rounded-xl group relative">
                                <img src="https://img.ltwebstatic.com/images3_spmp/2023/05/08/16835121189a8b183cf91b87721048d255e5c402fe_thumbnail_720x.webp" alt="" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </Link>
                        </div>
                        <Link to={"/necklace"} data-aos="fade-up" data-aos-duration="500" className="lg:w-60 w-64 h-96  overflow-hidden rounded-xl group relative">
                            <img src="https://i.pinimg.com/474x/47/c7/b4/47c7b477f61c568621d10a65a2ae2983.jpg" alt="" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                        </Link>
                        <div className="flex flex-row lg:flex-col space-x-3 space-y-6 items-center justify-center ">
                            <Link to={"/payal"} data-aos="fade-up" data-aos-duration="500" className="w-32 lg:w-40 lg:h-48  overflow-hidden rounded-xl group relative">
                                <img src="https://cdn.shopify.com/s/files/1/0985/9548/products/Silver_Payal_Online_AN034_2_1000x1000.jpg" alt="" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </Link>
                            <Link to={"/chain"} data-aos="fade-up" data-aos-duration="500" className="w-32 lg:w-40 h-32  overflow-hidden rounded-xl group relative">
                                <img src="http://www.styleswardrobe.com/wp-content/uploads/2016/08/Gold-Chains-6.jpg" alt="" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </Link>
                        </div>
                        <Link to={"/giftitem"} data-aos="fade-up" data-aos-duration="500" className="lg:w-40 w-64 h-40  overflow-hidden rounded-xl group relative">
                            <img src="https://pngadgilandsons.com/wp-content/uploads/2014/10/224-672x4361.jpg" alt="" className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                        </Link>


                    </div>

                </div>
            </div>
        </div>

        <HomeItem mode={props.mode} />        
        </>
    )
}

export default Home;