import React, { useState } from 'react'
import LoginIcon from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false); // this is to make password as text or dotted string

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // To take values of email and password

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: "",
    });
  
  
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUploadPic = async(e) => { 
        const file = e.target.files[0];

        const imagePic = await imageToBase64(file)

        // console.log("imagePic: " + imagePic);

        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic,
            }
        });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (data.password === data.confirmPassword) {
        try {
          
          const response = await fetch(SummaryApi.signUP.url, {
            method: SummaryApi.signUP.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          // Check if the response is ok (status is in the range 200-299)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const dataApi = await response.json();

          if (dataApi.success)
          {
            toast.success(dataApi.message);
            navigate("/login");
          }

          if (dataApi.error)
          {
            toast.error(dataApi.message)
          }

        }
        catch (error)
        {
            console.error("Error:", error);
        }
      }
      else
      {
        console.log("Please Check your Password and confirm Password");
      }


    };


  return (
    <section id="signup">
      <div className="mx-auto container p-4 ">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic ||  LoginIcon} alt="Login Icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full ">
                  Upload Photo
                </div>
                <input type="file" className='hidden ' onChange={handleUploadPic}></input>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid ">
              <label>Name : </label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-full outline-none bg-transparent "
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
            <div className="grid ">
              <label>Email : </label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-full outline-none bg-transparent "
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"} // iska matlab false hua to text and else dotted format
                  placeholder="Enter your password"
                  className="w-full h-full outline-none  bg-transparent "
                  onChange={handleOnChange}
                  name="password"
                  value={data.password}
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"} // iska matlab false hua to text and else dotted format
                  placeholder="Enter confirm password"
                  className="w-full h-full outline-none  bg-transparent "
                  onChange={handleOnChange}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6  ">
              Sign Up
            </button>
          </form>

          <p className="my-5 ">
            Already Have Account ?{" "}
            <Link
              to={"/login"}
              className="hover:text-red-700 text-red-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp
