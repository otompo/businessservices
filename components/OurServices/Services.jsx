import React from "react";
import {
  projectExperience,
  cleaningService,
  healthService,
} from "../../utils/data";
import css from "./Services.module.scss";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/motion.js";
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
        {/* <div className={css.leftSide}>
          {projectExperience.map((exp, i) => {
            return (
              <motion.div
                variants={fadeIn("right", "tween", (i + 1) * 0.2, 1)}
                className={css.exp}
                key={i}
              >
                <div style={{ background: exp.bg }} className="flexCenter">
                  <exp.icon size={25} color="white" />
                </div>
                <div>
                  <span>{exp.name}</span>
                  <span className="secondaryText">{exp.projects} Projects</span>
                </div>
              </motion.div>
            );
          })}
        </div> */}

        {/* right */}
        <motion.div className={css.rightSide}>
          {healthService.map((paragraph, i) => (
            <div key={i}>
              <p className="primaryText">{paragraph.title}:</p>
              <span className="secondaryText">{paragraph.description}</span>
            </div>
          ))}
          {cleaningService.map((paragraph, i) => (
            <div key={i}>
              <p className="primaryText">{paragraph.title}:</p>
              <span className="secondaryText">{paragraph.description}</span>
            </div>
          ))}

          {/* <div className={`flexCenter ${css.stats}`}>
            <div className={`flexCenter ${css.stat}`}>
              <span className="primaryText">285+</span>
              <span className="secondaryText">Jobs Completed</span>
            </div>
            <div className={`flexCenter ${css.stat}`}>
              <span className="primaryText">190+</span>
              <span className="secondaryText">Happy Clients</span>
            </div>
          </div> */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
