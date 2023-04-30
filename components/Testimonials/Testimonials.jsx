import { sliderSettings } from "../../utils/data";
import css from "./Testimonials.module.scss";
// import Slider from "react-slick";
import { motion } from "framer-motion";
import { footerVariants, staggerChildren } from "../../utils/motion";
import Image from "next/image";
import { Avatar } from "antd";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"));

const Testimonials = ({ testimonials }) => {
  return (
    <>
      <motion.section
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        section
        className={`paddings ${css.wrapper}`}
      >
        <a className="anchor" id="testimonials"></a>

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
              {testimonials?.map((testimonial, i) => {
                return (
                  <div className={`flexCenter ${css.comment}`} key={i}>
                    {testimonial?.image?.url ? (
                      <Image
                        src={testimonial?.image?.url}
                        alt="image"
                        width={100}
                        height={100}
                        lazy
                      />
                    ) : (
                      <Avatar size={60}>{testimonial?.name[0]}</Avatar>
                    )}

                    <p>{testimonial.message}</p>
                    <div className={css.line}></div>
                    <div className={css.bio}>
                      <span>{testimonial.name}</span>
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

export default Testimonials;
