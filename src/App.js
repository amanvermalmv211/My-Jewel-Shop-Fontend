import './App.css';
import Navbar from './allcomponents/Navbar';
import Home from './allcomponents/Home';
import Footer from './allcomponents/Footer';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import UserAccount from './allcomponents/UserAccount';
import AdminLogin from './allcomponents/AdminLogin';
import ToastAnim from './allcomponents/ToastAnim';
import UserLogin from './allcomponents/UserLogin';
import UserDetails from './allcomponents/UserDetails';
import UserSignuppage from './allcomponents/UserSignuppage';
import UserState from './context/user/UserState';
import Necklace from './allcomponents/Products/Necklace';
import BuyProduct from './allcomponents/Orders/BuyProduct';
import Rings from './allcomponents/Products/Rings';
import EarRings from './allcomponents/Products/EarRings';
import NoseRings from './allcomponents/Products/NoseRings';
import Bangles from './allcomponents/Products/Bangles';
import GoldLockets from './allcomponents/Products/GoldLockets';
import Chains from './allcomponents/Products/Chains';
import GiftItems from './allcomponents/Silverproducts/GiftItems';
import Payal from './allcomponents/Silverproducts/Payal';
import SilverLocket from './allcomponents/Silverproducts/SilverLocket';
import Bracelet from './allcomponents/Silverproducts/Bracelet';
import Rakhi from './allcomponents/Silverproducts/Rakhi';
import LoadingBar from "react-top-loading-bar";

function App() {

  if (!localStorage.getItem("jewelshopmode")) {
    localStorage.setItem("jewelshopmode", "light");
  }

  const [mode, setMode] = useState(localStorage.getItem("jewelshopmode"));
  if (localStorage.getItem("jewelshopmode") === "light") {
    document.body.style.background = "#FCE7F3";
  }
  else {
    document.body.style.background = '#042743';
  }

  const toggleMode = () => {
    if (mode === 'light') {
      localStorage.setItem("jewelshopmode", "dark");
      setMode("dark");
      document.body.style.background = '#042743';
    }
    else {
      localStorage.setItem("jewelshopmode", "light");
      setMode("light");
      document.body.style.background = "#FCE7F3";
    }
  }

  const [isUser, setUser] = useState(false);
  const [isCart, setCart] = useState(0);

  const [isprogress, setProgress] = useState(0);
  const setProgressBar = (progress) => {
    setProgress(progress);
  }

  return (
    <>
      <UserState setCart={setCart} setProgressBar={setProgressBar}>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} isUser={isUser} isCart={isCart} />
          <LoadingBar
            color='#f11946'
            progress={isprogress}
          />

          <ToastAnim />

          <Routes>
            <Route exact path="/" element={<Home mode={mode} />}></Route>
            <Route exact path="/useraccount" element={<UserAccount mode={mode} setUser={setUser} />}></Route>
            <Route exact path="/adminlogin" element={<AdminLogin mode={mode} setProgressBar={setProgressBar} />}></Route>
            <Route exact path='/usersignup' element={<UserSignuppage mode={mode} setUser={setUser}  setProgressBar={setProgressBar} />}></Route>
            <Route exact path="/userlogin" element={<UserLogin mode={mode} setUser={setUser} setProgressBar={setProgressBar} />}></Route>
            <Route exact path="/userdetails" element={<UserDetails mode={mode} setProgressBar={setProgressBar} />}></Route>
            <Route exact path="/necklace" element={<Necklace mode={mode} />}></Route>
            <Route exact path="/rings" element={<Rings mode={mode} />}></Route>
            <Route exact path="/goldlockets" element={<GoldLockets mode={mode} />}></Route>
            <Route exact path="/earrings" element={<EarRings mode={mode} />}></Route>
            <Route exact path="/noserings" element={<NoseRings mode={mode} />}></Route>
            <Route exact path="/bangles" element={<Bangles mode={mode} />}></Route>
            <Route exact path="/chain" element={<Chains mode={mode} />}></Route>
            <Route exact path="/giftitem" element={<GiftItems mode={mode} />}></Route>
            <Route exact path="/payal" element={<Payal mode={mode} />}></Route>
            <Route exact path="/silverlocket" element={<SilverLocket mode={mode} />}></Route>
            <Route exact path="/bracelet" element={<Bracelet mode={mode} />}></Route>
            <Route exact path="/rakhi" element={<Rakhi mode={mode} />}></Route>
            <Route exact path="/buyprod" element={<BuyProduct mode={mode} />}></Route>
          </Routes>

          <Footer mode={mode} />

        </Router>
      </UserState>

    </>
  );
}

export default App;