import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCartProduct from '../components/HorizontalCartProduct'
import VerticalCartProduct from '../components/VerticalCartProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      

      <HorizontalCartProduct category={"airpodes"} heading={"Top's Airpodes"} />
      
      
      <HorizontalCartProduct category={"watches"} heading={"Popular Watches"} />

      <VerticalCartProduct category={"mobiles"} heading={"Mobile's"} />
      
      <VerticalCartProduct category={"Mouse"} heading={"Mouse's"} />
      

      <VerticalCartProduct category={"televisions"} heading={"Television's"} />
      
      <VerticalCartProduct category={"camera"} heading={"Camera & Photography"} />
      
      <VerticalCartProduct category={"earphones"} heading={"Wired Earphone's"} />

      <VerticalCartProduct category={"speakers"} heading={"Bluetooth Speaker's"} />

      <VerticalCartProduct category={"refrigerator"} heading={"Refrigerator's"} />
      
      <VerticalCartProduct category={"trimmers"} heading={"Trimmer's"} />

    </div>
  )
}

export default Home
