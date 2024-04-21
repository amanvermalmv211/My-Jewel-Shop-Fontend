import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";

const HomeItem = (props) => {

    useEffect(()=>{
        AOS.init();
        AOS.refresh();
    }, []);

    let allLinks = [
        { name: "Necklace", link: "/necklace", desc: "Explore our stunning selection of necklaces and find the perfect piece that complements your personality and style.", imgLink: "https://media.istockphoto.com/id/611997004/photo/indian-traditional-gold-necklace.jpg?s=612x612&w=0&k=20&c=pKD2qzNYriUmQVh425jA9Kaa4n2lFQmIuHVAOMSvqgs=" },

        { name: "Rings", link: "/rings", desc: "Discover the world of rings and find the perfect piece to adorn your fingers with style and grace.", imgLink: "https://c4.wallpaperflare.com/wallpaper/145/561/92/blue-stone-ring-diamonds-wallpaper-preview.jpg" },

        { name: "Ear Rings", link: "/earrings", desc: "Explore our customization options to design unique earrings that reflect your individuality.", imgLink: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdvbGQlMjBlYXJyaW5nc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" },

        { name: "Nose Rings", link: "/noserings", desc: "All our nose rings are made from premium materials, ensuring both beauty and durability.", imgLink: "https://media.istockphoto.com/id/600683536/photo/nose-ring.jpg?s=612x612&w=0&k=20&c=a7p8rUGC3WJZAkWrp_40iJ0ZYQ-iUUbXf39i35q0T8Y=" },

        { name: "Bangles", link: "/bangles", desc: "Get collection of bangles that add a touch of elegance and charm to your ensemble.", imgLink: "https://media.istockphoto.com/id/851790898/photo/fancy-gold-looking-imitation-bangles-bracelets-for-woman-fashion.jpg?s=170667a&w=0&k=20&c=bQV11MET5EBm3JB8HBcpXiR_733CjRJtozr0AQcCaQw=" },

        { name: "Chains", link: "/chain", desc: "Explore our range of chain categories, from delicate and dainty to bold and robust.", imgLink: "https://www.alligatorjesus.com/cdn/shop/products/IMG_0820_1445x.jpg?v=1646954339" },

        { name: "Gold Lockets", link: "/goldlockets", desc: "Elegance meets sentimentality with our exquisite Gold Locket. Crafted with love and attention to detail.", imgLink: "https://img.freepik.com/free-photo/shiny-gold-jewelry-symbol-wealth-generated-by-ai_188544-10733.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697414400&semt=ais" },

        { name: "Gift Items", link: "/giftitem", desc: "Celebrate the love that lasts a lifetime with our selection of silver gifts items.", imgLink: "https://pngadgilandsons.com/wp-content/uploads/2015/12/Kelicha-pan-.-panchpathra-.-pali-kamal.jpg" },

        { name: "Payal", link: "/payal", desc: "Choose from a range of Payal categories, from traditional jingling bells to contemporary anklet designs.", imgLink: "https://5.imimg.com/data5/FN/FZ/XA/SELLER-2122207/img-20190904-wa0008.jpg" },

        { name: "Silver Locket", link: "/silverlocket", desc: "Unrivalled Craftsmanship: Our master artisans delicately engrave each piece to perfection.", imgLink: "https://i.etsystatic.com/5448650/r/il/aa8db9/660851299/il_570xN.660851299_eiz5.jpg" },

        { name: "Bracelet", link: "/bracelet", desc: "Crafted with Precision and Care: Every bead is carefully selected, and every thread meticulously woven to perfection.", imgLink: "https://di2ponv0v5otw.cloudfront.net/posts/2022/01/03/61d3cb7e800f643adaae61ea/m_61d3cb913bad6dc8847ba581.jpg" },

        { name: "Rakhi", link: "/rakhi", desc: "Silver Rakhis that reflects the constellation of your memories, shining bright in the night sky of your life.", imgLink: "https://www.taraash.com/cdn/shop/products/taraash-925-sterling-silver-pure-om-rakhi-436079_1024x1024.jpg?v=1689106845" }

    ];

    return (
        <>
            <section id='homesecitems' className={`${props.mode === "light" ? "text-gray-700" : "text-white"} body-font scroll-mt-12`}>
                <div className="container px-5 py-6 mx-auto">
                    <div className="flex flex-col">
                        <div className={`${props.mode === "light" ? "bg-blue-700" : "bg-white"} h-1 rounded overflow-hidden`}></div>
                        <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                            <h1 className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} sm:w-2/5 font-medium title-font text-3xl mb-2 sm:mb-0`}>Browse Our Jewelry Categories :</h1>
                            <p data-aos="fade-up" data-aos-duration="500" className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Start your journey into the world of elegance, sophistication, and self-expression. Every piece in our collection is a testament to the artistry and dedication of our craftsmen. Find the jewelry that resonates with your heart and celebrates life's precious moments.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                        {
                            allLinks.map((items) => {
                                return <Link to={items.link} key={items.name} className="p-4 md:w-1/3 sm:mb-0 mb-6 cursor-default" data-aos="flip-left" data-aos-duration="500">
                                    <div className="rounded-lg h-64 overflow-hidden cursor-pointer">
                                        <img alt="content" className="object-cover object-center h-full w-full" src={items.imgLink} />
                                    </div>
                                    <h2 className={`text-xl font-medium title-font ${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} mt-5 cursor-pointer`}>{items.name}</h2>
                                    <p className="text-base leading-relaxed mt-2">{items.desc}</p>
                                    <div className="bg-blue-700 hover:bg-blue-800 rounded-md border text-white px-2 py-1 mt-4 inline-flex items-center cursor-pointer">Get More
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
                </div>
            </section>

            <section className="text-gray-600 body-font py-6">
                <div className={`${props.mode === "light" ? "text-gray-700" : "text-white"} container px-5 mx-auto`}>
                    <div className={`${props.mode === "light" ? "bg-blue-700" : "bg-white"} h-1 rounded overflow-hidden`}></div>

                    <div className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} my-4 text-3xl font-medium text-center`}>About Us</div>

                    <div data-aos="fade-up" data-aos-duration="500" className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-blue-300 sm:flex-row flex-col">
                        <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                        </div>
                        <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} text-lg title-font font-medium mb-2`}>Our Story</h2>
                            <p className="leading-relaxed text-base">Our passion for creating exquisite jewelry drove us to establish "My Jewel Shop", a platform where you can explore, imagine, and design the jewelry of your dreams.</p>
                            <p>Note: This website has been created solely for educational purposes and as a part of learning journey.</p>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="500" className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-blue-300 sm:flex-row flex-col">
                        <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} text-lg title-font font-medium mb-2`}>What We Offer</h2>
                            <p className="leading-relaxed text-base">Our extensive collection features an array of jewelry items, from classic to contemporary, designed to suit various occasions, tastes, and budgets. Our custom jewelry service allows you to bring your unique vision to life.</p>
                        </div>
                        <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="500" className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col border-b pb-10 mb-6 border-blue-300">
                        <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                            <h2 className={`${props.mode === "light" ? "text-gray-700" : "text-[#d4af37]"} text-lg title-font font-medium mb-2`}>Why Choose Us</h2>
                            <p className="leading-relaxed text-base">Every piece of jewelry is created with precision and passion. Whether you choose from our collection or opt for custom design, your jewelry will be a reflection of your individuality.</p>
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default HomeItem;