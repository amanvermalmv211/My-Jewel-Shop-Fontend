import React, { useContext, useEffect, useRef, useState } from 'react'
import userContext from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import AOS from 'aos';
import "aos/dist/aos.css";

const SilverProdlistdiff = (props) => {

  const { proddetials } = props;
  const context = useContext(userContext);
  const { metalPrice, getMetalPrice, setOrdersToCart, deleteProduct, updateProduct } = context;

  const ktGold = proddetials.ktgold;
  const prodWeight = proddetials.weight;
  const mkCharge = proddetials.makingcharge * prodWeight;
  const finalMkCharge = proddetials.finalmakingcharge * prodWeight;
  const gst = proddetials.gst;
  const metalSilverPrice = metalPrice.silverprice;

  const prodGoldPrice = (((metalSilverPrice / 100) * ktGold) / 1000) * prodWeight;

  const gstCost = (prodGoldPrice + finalMkCharge) * (gst / 100);

  const userTotalCost = prodGoldPrice + finalMkCharge + gstCost;

  const forDiscount = (prodGoldPrice + mkCharge) * (gst / 100);
  const virtualCost = prodGoldPrice + mkCharge + forDiscount;

  const discount = ((virtualCost - userTotalCost) / virtualCost) * 100;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const editOpenModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editCloseModal = () => {
    setEditModalOpen(false);
  };

  useEffect(() => {
    // Add or remove a CSS class to the body when the modal opens or closes
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isEditModalOpen]);

  const shouldDo = useRef(true);

  useEffect(() => {

    AOS.init();
    AOS.refresh();

    try {
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
        shouldDo.current = false;
      }
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate(null);

  const handleBuyNow = () => {
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

    if (proddetials.quantity <= 0) {
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
      navigate("/buyprod", { state: proddetials });
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

  const handleAddtoCart = () => {
    if (proddetials.quantity <= 0) {
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

    setOrdersToCart(proddetials);

    toast(`😇 It's now in your cart!`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    closeModal();
  }

  const deleteProductItem = () => {
    if (localStorage.getItem("myjeweladmintoken")) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            toast.success('This item has been deleted successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            deleteProduct(proddetials);
            closeModal();
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

  const editProductItem = () => {
    if (localStorage.getItem("myjeweladmintoken")) {
      closeModal();
      editOpenModal();
    }
  }

  const handleProductUpdate = () => {
    if (localStorage.getItem("myjeweladmintoken")) {
      editCloseModal();
      try {
        updateProduct(proddetials._id, producttochange);
        toast.success('This item has been updated successfully', {
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

  const [producttochange, setProductToChange] = useState({ name: proddetials.name, imglink: proddetials.imglink, weight: proddetials.weight, ktgold: proddetials.ktgold, makingcharge: proddetials.makingcharge, finalmakingcharge: proddetials.finalmakingcharge, gst: proddetials.gst, quantity: proddetials.quantity });

  const handleproducttochangeChange = (e) => {
    setProductToChange({ ...producttochange, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <div data-aos="zoom-in-down" data-aos-duration="500" onClick={openModal} className="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
          <img src={proddetials.imglink} loading="lazy" alt="Rings" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 cursor-pointer" />

          {(mkCharge > 0 && proddetials.quantity > 0) && <span className="absolute left-0 top-3 rounded-r-lg bg-green-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-{discount.toFixed(1)}%</span>}

          {proddetials.quantity <= 0 && <span className="absolute left-0 top-3 rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold tracking-wider text-white">Out of Stock</span>}

          <div className="relative flex justify-between items-start w-full rounded-lg bg-white p-3 text-center">
            <div className="flex flex-col">
              <div className="font-bold text-gray-700 transition duration-100 hover:text-gray-600 lg:text-lg">{prodWeight}(g)</div>

              {localStorage.getItem("myjeweladmintoken") && <span className="text-sm text-gray-500 lg:text-base">{ktGold}% fine</span>}


            </div>

            <div className="flex flex-row-reverse items-center">
              <span className="font-bold text-gray-600 lg:text-lg ml-3">₹ {userTotalCost.toFixed(2)}</span>
              {mkCharge > 0 && <span className="text-sm text-red-500 line-through">₹ {virtualCost.toFixed(2)}</span>}

            </div>
          </div>
        </div>

        <div>
          {isModalOpen && (
            <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
              <div className="bg-blue-200 text-black px-4 py-2 rounded-lg relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"> <i className="fa fa-window-close-o fa-2xl" aria-hidden="true"></i>
                </button>
                <div className='flex items-center'>
                  <h2 className="text-xl font-semibold mb-1 mr-2">Details</h2>
                  <div className='flex items-center text-sm text-gray-700  hover:text-black'>
                    <div className='text-[0.7rem] xl:text-[0.85rem] mr-1'>Prod. ID : </div>
                    <div className='flex items-end justify-end text-[0.58rem] xl:text-[0.67rem]'>{proddetials._id}</div>
                  </div>
                </div>
                <div>
                  <div className='flex flex-col items-center justify-center text-sm'>
                    <div className='w-72 xl:w-80 h-[22rem] xl:h-96 mb-1'>
                      <img className='w-full h-full object-cover overflow-hidden rounded-md' src={proddetials.imglink} alt="" />
                    </div>
                    <div className='flex justify-between w-full'>
                      <div>Weight(g)</div>
                      <div>{prodWeight}</div>
                    </div>
                    <div className='flex justify-between w-full'>
                      <div>Silver Price</div>
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
                      <div>{gstCost.toFixed(2)}</div>
                    </div>
                    <div className='flex justify-between w-full rounded-sm border-t-2 border-b-2 mb-1 border-black'>
                      <div>Total Price</div>
                      <div>
                        <div>₹ {userTotalCost.toFixed(2)}</div>
                      </div>
                    </div>

                    {localStorage.getItem("myjeweladmintoken") ? <div className='text-gray-700 flex justify-around w-full space-x-5 font-bold text-lg ml-4'>
                      <div className='cursor-pointer' onClick={editProductItem}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></div>
                      <div className='cursor-pointer' onClick={deleteProductItem}><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></div>
                    </div> :
                      <div className='flex justify-around w-full mt-1'>
                        {proddetials.quantity <= 0 ? <div className='text-white bg-red-500 px-2 py-1 rounded-full'>
                          Opps! Currently out of stock
                        </div> :
                          <div className='flex justify-around w-full mt-1'>
                            <button className="text-white bg-blue-700 p-2 hover:bg-blue-800 rounded-lg text-xs" onClick={handleBuyNow}>Buy Now</button>

                            <button className="text-white bg-blue-700 p-2 hover:bg-blue-800 rounded-lg text-xs" onClick={handleAddtoCart}>Add to Cart</button>
                          </div>
                        }
                      </div>
                    }


                  </div>

                </div>
              </div>
            </div>
          )}

          {(isEditModalOpen && localStorage.getItem("myjeweladmintoken")) && (
            <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
              <div className="bg-blue-200 text-black px-4 py-2 rounded-lg relative">
                <button onClick={editCloseModal} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"> <i className="fa fa-window-close-o fa-2xl" aria-hidden="true"></i>
                </button>
                <div className='flex items-center'>
                  <h2 className="text-xl font-semibold mb-1 mr-2">Details</h2>
                  <div className='flex items-center text-sm text-gray-700  hover:text-black'>
                    <div className='text-[0.7rem] xl:text-[0.85rem] mr-1'>Prod. ID : </div>
                    <div className='flex items-end justify-end text-[0.65rem] xl:text-[0.7rem]'>{proddetials._id}</div>
                  </div>
                </div>
                <div>
                  <div className='flex flex-col items-center justify-center text-sm'>
                    <div className='w-20 h-28'>
                      <img className='w-full h-full object-cover aspect-[3/2] rounded-md' src={proddetials.imglink} alt="" />
                    </div>
                    <form className="space-y-3 w-72 md:w-80" onSubmit={(e) => e.preventDefault()}>
                      <div className={`rounded-md shadow-sm space-y-1`}>
                        <div>
                          <label htmlFor="quantity" className="block ml-1 text-sm">
                            Quantity
                          </label>
                          <input
                            id="quantity"
                            name="quantity"
                            type="text"
                            autoComplete="quantity"
                            required
                            className="appearance-none rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter the quantity of the producttochange"
                            value={producttochange.quantity}
                            onChange={handleproducttochangeChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="makingcharge" className="block ml-1 text-sm">
                            Making Charge per gram for discount
                          </label>
                          <input
                            id="makingcharge"
                            name="makingcharge"
                            type="text"
                            autoComplete="makingcharge"
                            required
                            className="appearance-none rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Making Charge / gram for discount if any"
                            value={producttochange.makingcharge}
                            onChange={handleproducttochangeChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="finalmakingcharge" className="block ml-1 text-sm">
                            Final Making Charge per gram
                          </label>
                          <input
                            id="finalmakingcharge"
                            name="finalmakingcharge"
                            type="text"
                            autoComplete="finalmakingcharge"
                            required
                            className="appearance-none rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter Final Making Charge/gram"
                            value={producttochange.finalmakingcharge}
                            onChange={handleproducttochangeChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="gst" className="block ml-1 text-sm">
                            GST %
                          </label>
                          <input
                            id="gst"
                            name="gst"
                            type="text"
                            autoComplete="gst"
                            required
                            className="appearance-none rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="GST in percent %"
                            value={producttochange.gst}
                            onChange={handleproducttochangeChange}
                          />
                        </div>

                        <div className='relative'>
                          <label htmlFor="weight" className="block ml-1 text-sm">
                            Weight (g)
                          </label>
                          <input
                            id="weight"
                            name="weight"
                            type='text'
                            autoComplete="weight"
                            required
                            className="appearance-none rounded-md relative block w-full px-2 py-1.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter the weight of the product in grams"
                            value={producttochange.weight}
                            onChange={handleproducttochangeChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="ktgold" className="block ml-1 text-sm">
                            Fine
                          </label>
                          <input
                            id="ktgold"
                            name="ktgold"
                            type="text"
                            autoComplete="ktgold"
                            required
                            className="appearance-none rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter the silver quality in %"
                            value={producttochange.ktgold}
                            onChange={handleproducttochangeChange}
                          />
                        </div>

                      </div>

                      <div className='flex justify-center'>
                        <button
                          type="submit"
                          className={`w-24 py-1 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2`}
                          onClick={handleProductUpdate}
                        >
                          Update
                        </button>
                      </div>
                    </form>

                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </>
  )
}

export default SilverProdlistdiff;