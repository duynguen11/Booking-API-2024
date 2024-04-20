import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLayout from "@/components/HomeLayout/HomeLayout";
import HomeContent from "@/components/HomeLayout/HomeContent";
import HomeFooter from "@/components/HomeLayout/HomeFooter";
import HomeIcon from "@/components/HomeLayout/HomeIcon";
import HomeDiscount from "@/components/HomeLayout/HomeDiscount";
import HomeArea from "@/components/HomeLayout/HomeArea";
import ScrollToTop from "@/components/HomeLayout/ScrollToTop";

const Home = () => {
  return (
    <div>
      <HomeLayout/>
      <HomeContent/>
      <HomeIcon/>
      <HomeDiscount/>
      <HomeArea/>
      <ScrollToTop/>
      <HomeFooter/>
    </div>
  );
};

export default Home;
