// import React, { useContext, useState } from 'react'
// import LoginIcon from "../assest/signin.gif"
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import SummaryApi from '../common';
// import { toast } from "react-toastify";
// import UserContext from '../context/index'; // import your context


// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false); // this is to make password as text or dotted string

//   // To take values of email and password

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const { fetchUserDetails } = useContext(UserContext); // use context
//   // const generalContext = useContext();
//   // console.log(generalContext);
//   // const { fetchUserDetails, fetchUserAddToCart } = useContext();

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const dataResponse = await fetch(SummaryApi.signIn.url, {
//         method: SummaryApi.signIn.method,
//         credentials: "include", // Include credentials (cookies)
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const dataApi = await dataResponse.json();

//       if (dataApi.success) {
//         toast.success(dataApi.message);
//         navigate("/");
//         // generalContext.
//         // fetchUserDetails()
//         // fetchUserAddToCart()
//       } else {
//         toast.error(dataApi.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Something went wrong");
//     }
//   };

//   console.log("Data Login : ", data);

//   return (
//     <section id="login">
//       <div className="mx-auto container p-4 ">
//         <div className="bg-white p-4 w-full max-w-sm mx-auto rounded py-5">
//           <div className="w-20 h-20 mx-auto ">
//             <img src={LoginIcon} alt="Login Icon" />
//           </div>

//           <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
//             <div className="grid ">
//               <label>Email : </label>
//               <div className="bg-slate-100 p-2 ">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full h-full outline-none bg-transparent "
//                   name="email"
//                   value={data.email}
//                   onChange={handleOnChange}
//                 />
//               </div>
//             </div>

//             <div>
//               <label>Password : </label>
//               <div className="bg-slate-100 p-2 flex">
//                 <input
//                   type={showPassword ? "text" : "password"} // iska matlab false hua to text and else dotted format
//                   placeholder="Enter your password"
//                   className="w-full h-full outline-none  bg-transparent "
//                   onChange={handleOnChange}
//                   name="password"
//                   value={data.password}
//                 />
//                 <div
//                   className="cursor-pointer text-xl"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
//                 </div>
//               </div>

//               {/* Over Below in forgot-password have done as /forgot-password as need to goto main page 1st and then to forgot-password page */}

//               <Link
//                 to={"/forgot-password"}
//                 className="block w-fit ml-auto hover:underline hover:text-red-600"
//               >
//                 Forgot Password
//               </Link>
//             </div>

//             <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6  ">
//               Login
//             </button>
//           </form>

//           <p className="my-5 ">
//             Don't Have Account ?{" "}
//             <Link
//               to={"/sign-up"}
//               className="hover:text-red-700 text-red-600 hover:underline"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login


import React, { useContext, useState } from "react";
import LoginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import UserContext from "../context/index"; // import your context

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // this is to make password as text or dotted string
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(UserContext); // use context

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails(); // Fetch user details after login
        fetchUserAddToCart(); // Fetch user cart items after login
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto rounded py-5">
          <div className="w-20 h-20 mx-auto ">
            <img src={LoginIcon} alt="Login Icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid ">
              <label>Email: </label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-full outline-none bg-transparent "
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <label>Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-full outline-none bg-transparent "
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password
              </Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="my-5 ">
            Don't Have Account?{" "}
            <Link
              to={"/sign-up"}
              className="hover:text-red-700 text-red-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
