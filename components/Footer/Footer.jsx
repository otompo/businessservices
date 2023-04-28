import { footerVariants, staggerChildren } from "../../utils/motion";
import { BiPhoneCall } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import css from "./Footer.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Footer = ({ footer }) => {
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
          <div className={css.footer_about}>
            <Image
              src="https://res.cloudinary.com/codesmart/image/upload/v1682603125/gracebusiness/logos_s9gstf.png"
              alt="image"
              width={150}
              height={90}
            />
            <p className={css.footer_about_text}>
              At Grace Business Services, we specialize in providing top-notch
              cleaning and healthcare services to our clients. With a focus on
              delivering exceptional quality and customer satisfaction, we are
              dedicated to creating a clean, safe, and healthy environment for
              our clients. We understand the importance of maintaining a clean
              and hygienic environment, especially in healthcare settings where
              patient safety is paramount. That's why we use only the latest
              techniques and equipment, combined with our team's expertise, to
              ensure that we provide the best possible services to our clients.
              We take pride in our commitment to excellence and strive to exceed
              expectations in every aspect of our business. From our experienced
              and well-trained employees to our comprehensive range of services,
              we are confident that we can provide the best solutions to meet
              our clients' needs.
            </p>
          </div>

          {/* **************************** */}
          <div className={css.address}>
            <span className="primaryText">Address</span>
            <div className={css.row}>
              <GoLocation size={"25px"} />{" "}
              <p className={css.text}>{footer.address}</p>
            </div>
            <div className={css.row}>
              <BiPhoneCall size={"25px"} />{" "}
              <p className={css.text}>{footer.contact_number}</p>
            </div>
          </div>

          {/* **************************** */}
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
          © Copyright {new Date().getFullYear()}, Grace Business Services
          <Link href="https://www.codesmartwebsoft.com/" target="blank">
            {" "}
            Lovingly designed by Code Smart Websoft
          </Link>
        </span>
      </div>
    </>
  );
};

export default Footer;
