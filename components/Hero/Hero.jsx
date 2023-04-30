import React from "react";
import { fadeIn, slideIn, staggerContainer } from "../../utils/motion";
import css from "./Hero.module.scss";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Hero = ({ hero }) => {
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
            {hero.title}
          </motion.span>
          <motion.span variants={fadeIn("left", "tween", 0.4, 1)}>
            <Image
              src="https://res.cloudinary.com/codesmart/image/upload/v1682603125/gracebusiness/logos_s9gstf.png"
              alt="image"
              width={450}
              height={280}
              lazy
            />
          </motion.span>
        </div>

        <p className={css.slogan}>{hero.slogan}</p>
        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className={css.person}
        >
          <motion.img
            variants={slideIn("up", "tween", 0.5, 1.3)}
            src="/lady.png"
            alt="image"
            lazy
          />
        </motion.div>

        <Link
          className={css.email}
          href="mailto: info@gracebusinessservices.co.uk"
        >
          {hero.email}
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
                <span className="primaryText">
                  {hero.jobscompleted_number}+
                </span>
                <span className="secondaryText">
                  {hero.jobscompleted_title}
                </span>
              </div>
              <div className={`flexCenter ${css.stat}`}>
                <span className="primaryText">{hero.happyclients_number}+</span>
                <span className="secondaryText">{hero.happyclients_title}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
