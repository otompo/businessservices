import { cleaningService, healthService } from "../../utils/data";
import { fadeIn, staggerContainer } from "../../utils/motion.js";
import css from "./Services.module.scss";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <section className={css.wrapper}>
      <a className="anchor" id="services"></a>
      <div className={css.mainTitle}>
        <p className={`primaryText `}>What do we help? </p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`paddings innerWidth flexCenter ${css.container}`}
      >
        {/* left side */}
        <div className={css.leftSide}>
          {healthService.map((paragraph, i) => {
            return (
              <motion.div
                variants={fadeIn("right", "tween", (i + 1) * 0.2, 1)}
                className={css.exp}
                key={i}
              >
                <p className="primaryText">{paragraph.title}:</p>
                <span className="secondaryText">{paragraph.description}</span>
              </motion.div>
            );
          })}
        </div>

        {/* right */}
        <div className={css.rightSide}>
          {cleaningService.map((paragraph, i) => {
            return (
              <motion.div
                variants={fadeIn("left", "tween", (i + 1) * 0.2, 1)}
                className={css.exp}
                key={i}
              >
                <p className="primaryText">{paragraph.title}:</p>
                <span className="secondaryText">{paragraph.description}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
