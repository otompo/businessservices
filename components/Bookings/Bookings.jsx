import React from "react";
import { motion } from "framer-motion";
import css from "./Bookings.module.scss";
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion";
const Bookings = () => {
  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <a className="anchor" id="bookus"></a>

      <div className={`innerWidth flexCenter ${css.container}`}>
        <motion.div
          variants={textVariant(0.4)}
          className={`flexCenter ${css.heading}`}
        >
          <div>
            <span className="primaryText">Book Us Now</span>
            <p style={{ marginTop: "10px" }}>
              Perfect solution for digital experience
            </p>
          </div>
        </motion.div>

        <div className={`flexCenter `}>
          <form className={`${css.bookingform}`}>
            <div className={`${css.formgroup}`}>
              <label for="full-name">Full Name</label>
              <input type="text" id="full-name" name="full-name" required />
            </div>
            <div className={`${css.formgroup}`}>
              <label for="phone-number">Phone Number</label>
              <input
                type="tel"
                id="phone-number"
                name="phone-number"
                required
              />
            </div>
            <div className={`${css.formgroup}`}>
              <label for="email">Emial</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={`${css.formgroup}`}>
              <label for="select-date">Select Date</label>
              <input type="date" id="select-date" name="select-date" required />
            </div>
            <div className={`${css.formgroup}`}>
              <label for="message">Message</label>
              <textarea id="message" name="message"></textarea>
            </div>

            <div className={`${css.formgroup}`}>
              <label for="select-booking-option">Select Booking Option</label>
              <select
                id="select-booking-option"
                name="select-booking-option"
                required
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <button type="submit">Book Now</button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Bookings;
