import React from "react";
import { footerVariants, staggerChildren } from "../../utils/motion";
import { BiPhoneCall } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import css from "./Footer.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";
const Footer = () => {
  return (
    <>
      <motion.section
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`paddings ${css.wrapper}`}
      >
        <motion.div
          variants={footerVariants}
          className={`innerWidth yPaddings flexCenter ${css.container}`}
        >
          <div className={css.left}>
            <span className="primaryText">Address</span>
            <p className={`flexCenter ${css.location}`}>
              <GoLocation size={"25px"} />{" "}
              <span>403 York Road Is9 6td Leads</span>
            </p>
            <p className={`flexCenter ${css.phone}`}>
              <BiPhoneCall size={"25px"} />{" "}
              <span className={css.text}>07482673887</span>
            </p>
          </div>
          {/* <div className={css.left}>
            <span className="primaryText">Quick Links</span>
            <ul className={` ${css.menu}`}>
              <li>
                <Link href="#home">Home</Link>
              </li>
              <li>
                <Link href="#services">Services</Link>
              </li>
              <li>
                <Link href="#aboutus">About us</Link>
              </li>
              <li>
                <Link href="#bookus">Book us</Link>
              </li>
              <li>
                <Link href="#people">Testimonials</Link>
              </li>
            </ul>
          </div> */}

          <div className={css.right}>
            <div className={css.info}>
              <span className="primaryText">Quick Links</span>
            </div>
            <ul className={` ${css.menu}`}>
              <li>
                <Link href="#home">Home</Link>
              </li>
              <li>
                <Link href="#services">Services</Link>
              </li>
              <li>
                <Link href="#aboutus">About us</Link>
              </li>
              <li>
                <Link href="#bookus">Book us</Link>
              </li>
              <li>
                <Link href="#people">Testimonials</Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>
      <div className={css.copyright}>
        <span className={css.copyrightText}>
          © Copyright {new Date().getFullYear()}, Grace Business Services,{" "}
          <Link href="https://www.codesmartwebsoft.com/" target="blank">
            Lovingly designed by Code Smart Websoft
          </Link>
        </span>
      </div>
    </>
  );
};

export default Footer;
