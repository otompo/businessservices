import css from "../styles/App.module.scss";
import Head from "next/head";
import absoluteUrl from "next-absolute-url";
import dynamic from "next/dynamic";
import Testimonials from "../components/Testimonials/Testimonials";
import CalltoAction from "../components/CalltoAction/CalltoAction";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import HealthServices from "../components/HealthServices/HealthServices";

const Services = dynamic(() => import("../components/OurServices/Services"), {
  ssr: true,
});
const CleaningServices = dynamic(
  () => import("../components/CleaningServices/CleaningServices"),
  {
    ssr: true,
  }
);
const Footer = dynamic(() => import("../components/Footer/Footer"), {
  ssr: false,
});
const Bookings = dynamic(() => import("../components/Bookings/Bookings"), {
  ssr: true,
});
const Aboutus = dynamic(() => import("../components/Aboutus/Aboutus"), {
  ssr: true,
});

const App = ({ hero, footer, testimonials }) => {
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
        <Hero hero={hero} />
        <CalltoAction />
        <Services />
        <HealthServices />
        <CleaningServices />
        <Aboutus />
        <Bookings />
        <Testimonials testimonials={testimonials} />
        <Footer footer={footer} />
      </div>
    </>
  );
};

export default App;

export async function getServerSideProps() {
  const [hero, footer, testimonials] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API}/hero/hero`).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API}/footer/footer`).then((res) =>
      res.json()
    ),
    fetch(`${process.env.NEXT_PUBLIC_API}/testimonials`).then((res) =>
      res.json()
    ),
    // fetch(`${process.env.NEXT_PUBLIC_API}categories`).then((res) =>
    //   res.json()
    // ),
  ]);

  return {
    props: {
      hero,
      footer,
      testimonials,
    },
  };
}

// export async function getServerSideProps({ req, res }) {
//   res.setHeader(
//     "Cache-Control",
//     "public, s-maxage=10, stale-while-revalidate=59"
//   );
//   const { origin } = absoluteUrl(req);
//   const [dataOne, dataThree, dataFour] = await Promise.all([
//     fetch(`${process.env.API}/api/hero/hero`),
//     // fetch(`${process.env.API}/api/about/about`),
//     fetch(`${process.env.API}/api/footer/footer`),
//     fetch(`${process.env.API}/api/testimonials`),
//   ]);
//   const [hero, footer, testimonials] = await Promise.all([
//     dataOne.json(),
//     // dataTwo.json(),
//     dataThree.json(),
//     dataFour.json(),
//   ]);
//   return {
//     props: {
//       hero,
//       // about,
//       footer,
//       testimonials,
//     },
//   };
// }
