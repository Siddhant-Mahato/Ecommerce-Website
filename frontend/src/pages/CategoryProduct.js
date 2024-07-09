import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  
  const [data, setData] = useState([]);

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });


  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");


  const fetchData = async() => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        // category: params.category,
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();

    setData(dataResponse?.data || []);

    console.log(dataResponse);

  }


  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList, fetchData, navigate]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));

    // console.log("selectCategory", arrayOfCategory);
  }, [selectCategory, navigate]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);
  


  // console.log("category ",params).categoryName;
  // params?.categoryName;
  return (
    <div className="container mx-auto p-4">
      {/* Desktop Way */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Left Side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scroll-none">
          {/* Sort By */}
          <div className=" ">
            <h3 className="text-base border-b pb-1 border-slate-300 uppercase font-medium text-slate-500">
              Sort By :
            </h3>

            {/* Making Product as based on price low to high and high to low */}

            <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                  <label>Price - Low to High</label>
                </div>

                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                  <label>Price - High to Low</label>
                </div>
            </form>
          </div>

          {/* Filter By */}
          <div className=" ">
            <h3 className="text-base border-b pb-1 border-slate-300 uppercase font-medium text-slate-500">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2 ">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3 ">
                    <input
                      type="checkbox"
                      name="category"
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                      value={categoryName?.value}
                      checked={selectCategory[categoryName?.value]}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* Right Side Display Product */}

        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scroll-none">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct
