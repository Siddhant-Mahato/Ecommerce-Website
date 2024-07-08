import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategroyWiseProductDisplay from '../components/CategroyWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import UserContext from '../context';


const ProductDetail = () => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams()

  const [loading, setLoading] = useState(true);

  const productImageListLoading = new Array(4).fill(null);

  const [activeImage, setActiveImage] = useState("");
  
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const { fetchUserAddToCart } = useContext(UserContext);

  const navigate = useNavigate()

  const [zoomImage, setZoomImage] = useState(false);


  console.log("ProductDetail_ID",params);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ productId: params?.id })
    })
    setLoading(false);


    const dataResponse = await response.json();

    setData(dataResponse.data);
    setActiveImage(dataResponse.data.productImage[0]);
  }

  console.log("data",data);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  }
  
  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  
  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply "
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* Product Zoom */}

            {zoomImage && (
              <div className="hidden lg:block  absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full min-h-[400px] min-w-[500px] overflow-hidden h-full  mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none scroll-none h-full">
                {productImageListLoading.map((e1, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage" + index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none scroll-none h-full">
                {data?.productImage?.map((imageURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imageURL}
                    >
                      <img
                        src={imageURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imageURL)}
                        onClick={() => handleMouseEnterProduct(imageURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className=" grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block  "></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 rounded-full bg-slate-200 animate-pulse w-full lg:h-8"></h2>
            <p className="capitalize  text-slate-400  bg-slate-200 min-w-[100px] animate-pulse h-6 rounded-full w-full lg:h-8"></p>

            <div className="text-red-600 flex items-center gap-1 bg-slate-200 animate-pulse h-6 rounded-full w-full lg:h-8"></div>

            <div className="flex items-center gap-2 text-2xl font-medium lg:h-8 my-2 lg:text-3xl h-6 animate-pulse w-full bg-slate-200 rounded-full">
              <p className="text-red-600 w-full"></p>
              <p className="text-slate-400 w-full line-through h-6 animate-pulse bg-slate-200 rounded-full"></p>
            </div>

            <div className="flex items-center w-full gap-3 my-2">
              <button className="h-6 lg:h-8 bg-slate-200 w-full rounded-full animate-pulse"></button>

              <button className="h-6 lg:h-8 bg-slate-200 w-full rounded-full animate-pulse"></button>
            </div>

            <div className="w-full">
              <p className=" text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full"></p>
              <p className="h-10  bg-slate-200 rounded-full lg:h-12 animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex gap-1 flex-col">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium ">
              {data?.productName}
            </h2>
            <p className="capitalize  text-slate-400">{data?.category}</p>

            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl font-medium  my-2 lg:text-3xl">
              <p className="text-red-600">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:text-white hover:bg-red-600"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>

              <button
                className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-500 hover:bg-white hover:text-red-600"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add to Cart
              </button>
            </div>

            <div>
              <p className=" text-slate-600 font-medium my-1  ">
                Description :{" "}
              </p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategroyWiseProductDisplay
          category={data?.category}
          heading={"Recommended Product's"}
        />
      )}
    </div>
  );
}

export default ProductDetail