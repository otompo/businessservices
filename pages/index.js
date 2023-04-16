import React from "react";
import Services from "../components/OurServices/Services";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import People from "../components/People/People";
import Portfolio from "../components/Portfolio/Portfolio";
import Aboutus from "../components/Aboutus/Aboutus";
import css from "../styles/App.module.scss";
import Head from "next/head";
const App = () => {
  //don't forget to add font link in index.html
  return (
    <>
      <div className={`bg-primary ${css.container}`}>
        <Header />
        <Hero />
        <Services />
        <Aboutus />
        <Portfolio />
        <People />
        <Footer />
      </div>
    </>
  );
};

export default App;
