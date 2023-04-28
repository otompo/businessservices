import { cleaningServices } from "../../utils/data";
import css from "./CleaningServices.module.scss";
import { motion } from "framer-motion";
import { staggerChildren } from "../../utils/motion";
import Image from "next/image";
const CleaningServices = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="show"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <p className="primaryText yPaddings ">Cleaning Services</p>
      <div className={`innerWidth  ${css.container}`}>
        {/* heading */}
        <div className={`${css.card_container}`}>
          {cleaningServices.map((data, i) => (
            <div className={css.card} key={i}>
              <Image src={data.img} alt="img" width={250} height={250} />
              <h3>{data.title}</h3>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CleaningServices;
