import React from "react";
import { comments, sliderSettings } from "../../utils/data";
import css from "./People.module.scss";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { footerVariants, staggerChildren } from "../../utils/motion";
import Image from "next/image";
// import Head from "next/head";
const People = () => {
  return (
    <>
      {/* <Head></Head> */}
      <motion.section
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        section
        className={`paddings ${css.wrapper}`}
      >
        <a className="anchor" id="people"></a>

        <motion.div
          variants={footerVariants}
          className={`yPaddings innerWidth ${css.container}`}
        >
          <div className={`flexCenter ${css.heading}`}>
            <span className="primaryText">What People say&apos;s about us</span>
          </div>

          <div className={`yPaddings ${css.comments}`}>
            {/* to use slider , we have to inlcude css in index.html head */}
            <Slider {...sliderSettings} className={css.slider}>
              {comments.map((comment, i) => {
                return (
                  <div className={`flexCenter ${css.comment}`} key={i}>
                    <Image
                      src={comment.img}
                      alt="image"
                      width={100}
                      height={100}
                    />
                    <p>{comment.comment}</p>
                    <div className={css.line}></div>
                    <div className={css.bio}>
                      <span>{comment.name}</span>
                      <span>{comment.post}</span>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default People;
