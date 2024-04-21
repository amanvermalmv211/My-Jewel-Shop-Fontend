import { useRef, useState } from 'react';
import UserContext from './userContext';
import { toast } from 'react-toastify';

const UserState = (props) => {

    const host = 'https://myjewelshopserv.onrender.com';
    const [loading, setLoading] = useState(false);

    const shouldDo = useRef(true);

    const [userdet, setUserdet] = useState({
        "_id": "",
        "user": "",
        "locaddress": "",
        "city": "",
        "pin": "",
        "state": "",
        "phoneno": "",
        "__v": 0
    });
    const [isdetail, setIsdetail] = useState(false);

    //Get user details
    const getUserdetail = async () => {

        //API Call
        try {
            props.setProgressBar(30);
            setLoading(true);
            const response = await fetch(`${host}/user/userauth/userdetails`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjewelacctoken')
                }
            });
            props.setProgressBar(60);
            const json = await response.json();
            props.setProgressBar(100);
            if (json.length === 0) {
                setUserdet({
                    "_id": "",
                    "user": "",
                    "locaddress": "",
                    "city": "",
                    "pin": "",
                    "state": "",
                    "phoneno": "",
                    "__v": 0
                })
            }
            else {
                setUserdet(json[0]);
                setIsdetail(true);
                setLoading(false);
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
                props.setProgressBar(100);
            }
        }

    }

    //Edit user address
    const updateUseraddress = async (id, locaddress, city, pin, state, phoneno) => {
        //API Call
        try {
            const response = await fetch(`${host}/user/userauth/updateuserdetail/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjewelacctoken')
                },
                body: JSON.stringify({ locaddress, city, pin, state, phoneno })
            });
            await response.json();

            let newUpdatedNote = userdet;
            newUpdatedNote.locaddress = locaddress;
            newUpdatedNote.city = city;
            newUpdatedNote.pin = pin;
            newUpdatedNote.state = state;
            newUpdatedNote.phoneno = phoneno;

            setUserdet(newUpdatedNote);
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
                props.setProgressBar(100);
            }
        }
    }

    const [user, setUser] = useState({});
    //Get user
    const getUser = async () => {
        //API Call
        try {
            const response = await fetch(`${host}/user/userauth/getuser`, {
                method: 'POST',
                headers: {
                    'auth-token': localStorage.getItem('myjewelacctoken')
                },
            });

            const json = await response.json();
            setUser(json);
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
                props.setProgressBar(100);
            }
        }

    }

    const [product, setproduct] = useState([]);
    //Get product
    const getProduct = async (prodName) => {

        try {
            props.setProgressBar(30);
            setLoading(true);
            //API Call
            const response = await fetch(`${host}/admin/allproducts/getProducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: prodName })
            });

            props.setProgressBar(60);
            const json = await response.json();
            props.setProgressBar(100);
            setproduct(json);
            setLoading(false);
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
                props.setProgressBar(100);
            }
        }

    }

    //Add product by admin.
    const addProduct = async (proddetials) => {

        //API Call
        try {
            const response = await fetch(`${host}/admin/allproducts/addproducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                },
                body: JSON.stringify({ name: proddetials.name, imglink: proddetials.imglink, weight: proddetials.weight, ktgold: proddetials.ktgold, makingcharge: proddetials.makingcharge, finalmakingcharge: proddetials.finalmakingcharge, gst: proddetials.gst, quantity: proddetials.quantity })
            });

            await response.json();

            getProduct(proddetials.name);
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
                props.setProgressBar(100);
            }
        }


    }

    //Delete product by admin.
    const deleteProduct = async (proddetials) => {

        //API Call
        try {
            const response = await fetch(`${host}/admin/allproducts/deleteproducts/${proddetials._id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                }
            });

            await response.json();

            getProduct(proddetials.name);
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
                props.setProgressBar(100);
            }
        }


    }

    //Update product by admin.
    const updateProduct = async (id, producttochange) => {

        //API Call
        try {
            const response = await fetch(`${host}/admin/allproducts/updateproducts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                },
                body: JSON.stringify({ name: producttochange.name, imglink: producttochange.imglink, weight: producttochange.weight, ktgold: producttochange.ktgold, makingcharge: producttochange.makingcharge, finalmakingcharge: producttochange.finalmakingcharge, gst: producttochange.gst, quantity: producttochange.quantity })
            });

            await response.json();

            getProduct(producttochange.name);
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
                props.setProgressBar(100);
            }
        }


    }

    const [metalPrice, setMetalprice] = useState({
        "_id": "",
        "goldprice": "",
        "silverprice": "",
        "__v": 0
    });
    //Get MetalPrice
    const getMetalPrice = async () => {
        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/getmetalprice`, {
                method: 'GET'
            });

            const json = await response.json();
            if (json.length === 0) {
                setMetalprice({
                    "_id": "",
                    "goldprice": "",
                    "silverprice": "",
                    "__v": 0
                })
            }
            else {
                setMetalprice(json[0]);
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
                props.setProgressBar(100);
            }
        }


    }
    //Update MetalPrice
    const updateMetalPrice = async (id, goldprice, silverprice) => {
        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/updatemetalprice/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                },
                body: JSON.stringify({ goldprice, silverprice })
            });

            await response.json();

            let newMetalPrice = metalPrice;
            newMetalPrice.goldprice = goldprice;
            newMetalPrice.silverprice = silverprice;
            setMetalprice(newMetalPrice);
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
                props.setProgressBar(100);
            }
        }


    }

    const [getPinCode, setPinCode] = useState([]);
    //Get product
    const getPINCode = async () => {
        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/getpin`, {
                method: 'GET'
            });

            const json = await response.json();
            setPinCode(json);
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
                props.setProgressBar(100);
            }
        }
    }

    const deletePINCode = async (id) => {
        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/deletepin/${id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                }
            });

            await response.json();
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
                props.setProgressBar(100);
            }
        }
    }

    const addPINCode = async (pinCode) => {
        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/addpin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                },
                body: JSON.stringify({ pincode: pinCode })
            });

            await response.json();
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
                props.setProgressBar(100);
            }
        }
    }

    const [isOrder, setIsOr] = useState(false);
    const [userOrders, setUserOrders] = useState(false);

    //Get all orders for admin
    const getOrdersForAdmin = async () => {

        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/getorderdetails`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                }
            });

            const json = await response.json();
            if (!(json.length === 0)) {
                setIsOr(true);
                setUserOrders(json);
            }
            else {
                setIsOr(false);
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
                props.setProgressBar(100);
            }
        }

    }

    //Get user orders
    const getUserorders = async () => {

        //API Call
        try {
            const response = await fetch(`${host}/user/userauth/getorderdetails`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('myjewelacctoken')
                }
            });

            const json = await response.json();
            if (!(json.length === 0)) {
                setIsOr(true);
                setUserOrders(json);
            }
            else {
                setIsOr(false);
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
                props.setProgressBar(100);
            }
        }

    }

    //Order place by user
    const placeOrder = async (buyProd, finalMkCharge, userTotalCost, userdet, username) => {

        //API Call
        try {
            const response = await fetch(`${host}/user/userauth/addorderdetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjewelacctoken')
                },
                body: JSON.stringify({ name: buyProd.name, prodid: buyProd._id, imglink: buyProd.imglink, weight: buyProd.weight, makingcharge: finalMkCharge, price: userTotalCost, locaddress: userdet.locaddress, city: userdet.city, pin: userdet.pin, state: userdet.state, phoneno: userdet.phoneno, username: username, isdelivered: "0" })
            });

            await response.json();
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
                props.setProgressBar(100);
            }
        }

    }

    const saveCartOrder = (newCart) => {
        localStorage.setItem("mycartorder", JSON.stringify(newCart));
    }

    const [cartOrder, setCartOrder] = useState({});

    //Set user order to cart
    const setOrdersToCart = async (productdetials) => {

        let newCart = cartOrder;
        if (!(productdetials._id in cartOrder)) {
            newCart[productdetials._id] = productdetials;
        }

        setCartOrder(newCart);
        saveCartOrder(newCart);
        props.setCart(Object.keys(cartOrder).length);
    }

    //Get user order to cart
    const getOrdersToCart = () => { setCartOrder(cartOrder); }

    //Remove Cart Item
    const removeCartItem = async (id) => {

        let newCartItems = JSON.parse(JSON.stringify(cartOrder));
        if (id in cartOrder) {
            delete newCartItems[id];
        }

        setCartOrder(newCartItems);
        saveCartOrder(newCartItems);
        props.setCart(0);
    }

    //Clear Cart
    const clearCart = async () => {
        setCartOrder({});
        saveCartOrder({});
        props.setCart(0);
    }

    //Update Order place by user
    const updateOrderAdmin = async (id, isdelivered) => {

        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/updateorder/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                },
                body: JSON.stringify({ isdelivered: isdelivered })
            });

            await response.json();
            getOrdersForAdmin();
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
                props.setProgressBar(100);
            }
        }
    }

    //Delete Order place by user by Admin
    const deleteOrderAdmin = async (id) => {

        //API Call
        try {
            const response = await fetch(`${host}/admin/adminauth/deleteorder/${id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('myjeweladmintoken')
                }
            });

            await response.json();
            getOrdersForAdmin();
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
                props.setProgressBar(100);
            }
        }
    }

    //Delete Order place by user by Admin
    const deleteOrderUser = async (id) => {

        //API Call
        try {
            const response = await fetch(`${host}/user/userauth/deleteorder/${id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('myjewelacctoken')
                }
            });

            await response.json();
            getUserorders();
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
                props.setProgressBar(100);
            }
        }
    }

    return (
        <UserContext.Provider value={{ userdet, isdetail, user, getUser, getUserdetail, updateUseraddress, product, getProduct, addProduct, deleteProduct, updateProduct, metalPrice, getMetalPrice, updateMetalPrice, getPinCode, getPINCode, deletePINCode, addPINCode, isOrder, userOrders, getUserorders, placeOrder, setOrdersToCart, removeCartItem, clearCart, cartOrder, setCartOrder, getOrdersToCart, getOrdersForAdmin, updateOrderAdmin, deleteOrderAdmin, deleteOrderUser, loading }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;