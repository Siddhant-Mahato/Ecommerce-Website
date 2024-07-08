import React, { useEffect, useState } from 'react';
import UploadProducts from '../components/UploadProducts';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async() => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json();

    setAllProducts(dataResponse?.data || []);
  }

  useEffect(() => {
    fetchAllProducts();
  },[]);

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border-2 py-1 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all'
           onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Upload Products Component */}
      {
          openUploadProduct && (
            <UploadProducts onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
          )
      }

      {/* Now what ever be the product will show it over here (7:32:00) ||  */}
      
      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-200px)] overflow-y-scroll'>

        {
          

            allProducts.map((product,index)=>{
              return (
                <AdminProductCard
                  data={product}
                  key={index + "allProducts"}
                  fetchdata={fetchAllProducts}
                />
              );
            })
          
          // If no products found show a message here (7:32:00) ||
        }

      </div>
        
    </div>
  );
};

export default AllProducts;
