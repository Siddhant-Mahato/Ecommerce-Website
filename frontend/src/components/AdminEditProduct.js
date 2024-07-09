import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from "../helpers/uploadImage";
import DisplayImageFull from "./DisplayImageFull";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose,productData,fetchdata }) => {
  // This below state is for having the details of the product uploaded

  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || "",
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  // This below state is for having the full screen image of the uploaded product and the current uploaded image set to show in the full screen view.

  const [fullScreenImageSet, setFullScreenImageSet] = useState("");

  const handleOnChange = (index) => {
    // console.log("index: ", index);
    const { name, value } = index.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // The below state is for uploading the product's Image to cloudinary

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    try {
      const uploadImageCloudinary = await uploadImage(file);

      setData((prev) => {
        return {
          ...prev,
          productImage: [...prev.productImage, uploadImageCloudinary.url],
        };
      });

      console.log("uploadImageCloudinary - ", uploadImageCloudinary.url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // This function is going te delete the image from the bunch of image that we are taking to upload

  const handleDeleteProductImage = async (index) => {
    console.log("index", index);

    try {
      const newProductImage = [...data.productImage];
      newProductImage.splice(index, 1);
      setData((prev) => {
        return {
          ...prev,
          productImage: [...newProductImage],
        };
      });
    } catch (error) {
      console.log(error);
    }
  };


  // Upload Product

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();  // this is so that the updated list be visible 
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0  flex justify-center items-center bg-slate-200 bg-opacity-35">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg ">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-20"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name : </label>
          <input
            type="text"
            id="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            name="productName"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="enter product name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            name="brandName"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
            name="category"
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option key={el.value + index} value={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>

          {/* For File Upload */}
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex items-center justify-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl ">
                  <IoMdCloudUpload />
                </span>
                <p className="text-sm ">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  onChange={handleUploadProduct}
                ></input>
              </div>
            </div>
          </label>

          {/* ye div hai aisa ki upr jo image upload hoga wo isme show hoga :) || 6:38:00 ||   */}
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((e1, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={e1}
                        alt="e1"
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImageSet(e1);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs ">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="productName">Price : </label>
          <input
            type="number"
            id="price"
            placeholder="enter product price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            name="price"
            required
          />

          <label htmlFor="sellingPrice">Selling Price : </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="enter product selling price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            name="sellingPrice"
            required
          />

          <label htmlFor="description">Description : </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-red-600 text-white mb-7 hover:bg-red-700 rounded">
            Update Product
          </button>
        </form>
      </div>

      {/* Display image full screen */}

      {openFullScreenImage && (
        <DisplayImageFull
          imageUrl={fullScreenImageSet}
          onClose={setOpenFullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
