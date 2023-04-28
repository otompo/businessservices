import React, { useRef, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import css from "./Bookings.module.scss";
import { staggerChildren, textVariant } from "../../utils/motion";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const Bookings = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [address, setAddress] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setAddress(place);
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/bookings`, {
        fullName,
        message,
        email,
        contactNum,
        selectedOption,
        address: address.formatted_address,
        bookingDate,
      });
      setFullName("");
      setMessage("");
      setEmail("");
      setContactNum("");
      setSelectedOption("");
      setAddress("");
      setBookingDate(null);
      toast.success("Success");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
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
          </div>
        </motion.div>

        <div className={`flexCenter `}>
          <form className={`${css.bookingform}`} onSubmit={handleSubmit}>
            <div className={`${css.formgroup}`}>
              <label htmlFor="full-name">
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                value={fullName}
                id="full-name"
                name="full-name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                required
              />
            </div>
            <div className={`${css.formgroup}`}>
              <label htmlFor="phone-number">
                Phone Number <span>*</span>
              </label>
              <input
                type="tel"
                value={contactNum}
                id="phone-number"
                name="phone-number"
                onChange={(e) => {
                  setContactNum(e.target.value);
                }}
                required
              />
            </div>
            <div className={`${css.formgroup}`}>
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                type="email"
                value={email}
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className={`${css.formgroup}`}>
              <label htmlFor="phone-number">
                Address<span>*</span>
              </label>
              {/* <input
                type="text"
                value={address}
                id="phone-number"
                name="address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              /> */}
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                libraries={["places"]}
              >
                <StandaloneSearchBox
                  onLoad={(ref) => (inputRef.current = ref)}
                  onPlacesChanged={handlePlaceChanged}
                >
                  <input
                    type="text"
                    className={css.addressinput}
                    placeholder="Enter Location"
                    required
                  />
                </StandaloneSearchBox>
              </LoadScript>
            </div>

            <div className={`${css.formgroup}`}>
              <label htmlFor="select-date">
                Select Booking Date and Time <span>*</span>
              </label>

              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                minDate={new Date()}
                showTimeSelect
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                isClearable={false}
                timeIntervals={5}
                placeholderText="Select Booking Date and Time"
                className={css.addressinput}
                // style={{ width: "500px", backgroundColor: "red" }}
              />
            </div>
            <div className={`${css.formgroup}`}>
              <label htmlFor="select-booking-option">
                Select Booking Option <span>*</span>
              </label>
              <select
                id="gender"
                className={css.addressinput}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option className="py-5 ">Select...</option>
                {["Health", "Cleaning"].map((service) => (
                  <option key={service} value={service} className="py-5 ">
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${css.formgroup}`}>
              <label htmlFor="message">
                Message <span>*</span>
              </label>
              <textarea
                id="message"
                value={message}
                name="message"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </div>

            <button type="submit">{loading ? "Booking..." : "Book Now"}</button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Bookings;
