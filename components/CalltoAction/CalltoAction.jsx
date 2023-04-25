import css from "./CalltoAction.module.scss";
import { projectExperience } from "../../utils/data";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/motion.js";

function CalltoAction() {
  return (
    <section className={css.wrapper}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`paddings yPaddings innerWidth flexCenter ${css.container}`}
      >
        {/* left side */}
        <div className={css.leftSide}>
          {projectExperience.map((exp, i) => {
            return (
              <div className={css.exp} key={i}>
                <div style={{ background: exp.bg }} className="flexCenter">
                  <exp.icon size={25} color="white" />
                </div>
                <div>
                  <span>{exp.name}</span>
                  <span className={css.subtext}>{exp.subtext}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default CalltoAction;
