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
          <div className={css.address}>
            <span className="primaryText">Address</span>
            <div className={css.row}>
              <GoLocation size={"25px"} />{" "}
              <p className={css.text}>403 York Road Is9 6td Leads</p>
            </div>
            <div className={css.row}>
              <BiPhoneCall size={"25px"} />{" "}
              <p className={css.text}>07482673887</p>
            </div>
          </div>

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
