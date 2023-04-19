import React from "react";
import Services from "../components/OurServices/Services";
import CleaningServices from "../components/CleaningServices/CleaningServices";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import People from "../components/People/People";
import Bookings from "../components/Bookings/Bookings";
import Aboutus from "../components/Aboutus/Aboutus";
import css from "../styles/App.module.scss";
import Head from "next/head";
const App = () => {
  //don't forget to add font link in index.html
  return (
    <>
      <Head>
        <title>Grace Business Services</title>
        <link rel="canonical" href="Grace Business Services" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0 width=device-width" />
        <meta
          property="og:title"
          content="At Grace Business Services, we specialize in providing top-notch cleaning and healthcare services to our clients. With a 
          focus on delivering exceptional quality and customer satisfaction, we are dedicated to creating a clean, safe, and healthy 
          environment for our clients. We understand the importance of maintaining a clean and hygienic environment, especially in
           healthcare settings where patient safety is paramount. That's why we use only the latest techniques and equipment, 
           combined with our team's expertise, to ensure that we provide the best possible services to our clients. We take pride in 
           our commitment to excellence and strive to exceed expectations in every aspect of our business. From our experienced and 
           well-trained employees to our comprehensive range of services, we are confident that we can provide the best solutions to meet our 
           clients' needs."
        />
        <meta
          property="og:description"
          content="At Grace Business Services, we specialize in providing top-notch cleaning and healthcare services to our clients. 
          With a focus on delivering exceptional quality and customer satisfaction, we are dedicated to creating a clean, safe, and healthy 
          environment for our clients. We understand the importance of maintaining a clean and hygienic environment, especially in healthcare 
          settings where patient safety is paramount. That's why we use only the latest techniques and equipment, combined with our team's 
          expertise, to ensure that we provide the best possible services to our clients. We take pride in our commitment to excellence and 
          strive to exceed expectations in every aspect of our business. From our experienced and well-trained employees to our comprehensive 
          range of services, we are confident that we can provide the best solutions to meet our clients' needs."
        />
        <meta
          property="og:site_name"
          content="Our mission is to provide high-quality cleaning and healthcare services that promote a clean, safe, 
          and healthy environment for our clients. We are committed to using the latest techniques and equipment to ensure that our 
          services exceed expectations, and to providing our employees with a safe and rewarding work environment. Our vision is to be 
          the premier provider of cleaning and healthcare services in the industry, recognized for our exceptional quality, customer 
          service, and commitment to the well-being of our clients and employees. 
          We strive to innovate and evolve with the changing needs of our customers, while maintaining our unwavering dedication to excellence."
        />
      </Head>
      <div className={`bg-primary ${css.container}`}>
        <Header />
        <Hero />
        <Services />
        <CleaningServices />
        <Aboutus />
        <Bookings />
        <People />
        <Footer />
      </div>
    </>
  );
};

export default App;
