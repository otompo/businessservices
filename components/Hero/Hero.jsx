import React from "react";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import css from "./Hero.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={`paddings ${css.wrapper}`}>
      <a className="anchor" id="home"></a>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`innerWidth ${css.container}`}
      >
        <div className={css.upperElements}>
          <motion.span
            className="primaryText"
            variants={fadeIn("right", "tween", 0.2, 1)}
          >
            Welcome to
            <br />
            Grace Business Services
          </motion.span>
          <motion.span variants={fadeIn("left", "tween", 0.4, 1)}>
            <Image src="/logos.png" alt="image" width={450} height={280} />
          </motion.span>
        </div>

        <p className={css.slogan}>
          We provide professional health care and cleaning solutions
        </p>
        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className={css.person}
        >
          <motion.img
            variants={slideIn("up", "tween", 0.5, 1.3)}
            src="/lady.png"
            alt=""
          />
        </motion.div>

        <Link
          className={css.email}
          href="mailto: info@gracebusinessservices.co.uk"
        >
          info@gracebusinessservices.co.uk
        </Link>

        <div className={css.lowerElements}>
          <motion.div
            variants={fadeIn("right", "tween", 0.3, 1)}
            className={css.experience}
          >
            <Link href="#bookus">
              <button className={css.button}>Book Us</button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "tween", 0.5, 1)}
            className={css.certificate}
          >
            <div className={`flexCenter ${css.stats}`}>
              <div className={`flexCenter ${css.stat}`}>
                <span className="primaryText">285+</span>
                <span className="secondaryText">Jobs Completed</span>
              </div>
              <div className={`flexCenter ${css.stat}`}>
                <span className="primaryText">190+</span>
                <span className="secondaryText">Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
