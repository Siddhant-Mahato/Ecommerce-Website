// import { Outlet } from 'react-router-dom';
// import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import { ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from 'react';
// import SummaryApi from './common';
// import Context from './context/index';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from './store/userSlice';

// function App() {

//   const dispatch = useDispatch()

//   const fetchUserDetails = async() => {
//     const dataResponse = await fetch(SummaryApi.current_user.url, {
//       method: SummaryApi.current_user.method,
//       credentials:'include'
//     });

//     const dataApi = await dataResponse.json();

//     if (dataApi.success)
//     {
//       dispatch(setUserDetails(dataApi.data));
//     }

//     console.log("data-user-details", dataResponse);
//   }

//   useEffect(() => {
//     // user-Details

//     fetchUserDetails();


//   },[])

//   return (
//     <>
//       <Context.Provider
//         value={{
//           fetchUserDetails,
//         }}
//       >
//         <ToastContainer />

//         <Header />

//         <main className="min-h-[calc(100vh-120px)]">
//           <Outlet />
//         </main>

//         <Footer />
//       </Context.Provider>
//     </>
//   );
// }

// export default App;


import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {

  //! For redux purposes

  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0);


  //! Below Function is to see who is the current user and pass it's info as Context to all the components

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    } else {
      console.error("Failed to fetch user details");
    }
  };


  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      setCartProductCount(dataApi.data.count);
    } else {
      console.error("Failed to fetch cart product count");
    }
  };


  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails,cartProductCount,fetchUserAddToCart }}>
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
