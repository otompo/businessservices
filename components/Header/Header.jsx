import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./Header.module.scss";
import { BiPhoneCall, BiMenuAltRight } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { getMenuStyles, headerVariants } from "../../utils/motion";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import useHeaderShadow from "../../hooks/useHeaderShadow";
import Link from "next/link";
import { AuthContext } from "../../context";

const Header = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const menuRef = useRef(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const headerShadow = useHeaderShadow();
  //to handle click outside of sidebar on mobile
  useOutsideAlerter({
    menuRef,
    setMenuOpened,
  });

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      whileInView="show"
      className={`bg-primary paddings ${css.wrapper}`}
      viewport={{ once: true, amount: 0.25 }}
      style={{ boxShadow: headerShadow }}
    >
      <div className={`innerWidth ${css.container} flexCenter`}>
        <div className={css.name}>
          <Link href="#home">Grace Business Services</Link>
        </div>
        <ul
          className={`flexCenter ${css.menu}`}
          ref={menuRef}
          style={getMenuStyles(menuOpened)}
        >
          <li onClick={() => setMenuOpened(false)}>
            <Link href="#home">Home</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link href="#services">Services</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link href="#aboutus">About us</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link href="#bookus">Book us</Link>
          </li>
          <li onClick={() => setMenuOpened(false)}>
            <Link href="#testimonials">Testimonials</Link>
          </li>

          <li
            className={`flexCenter ${css.phone}`}
            onClick={() => setMenuOpened(false)}
          >
            <Link href="tel:+07482673887">
              <p>07482673887</p>
            </Link>
            <BiPhoneCall size={"25px"} />
          </li>
          {user ? (
            <li
              onClick={() => setMenuOpened(false)}
              style={{ color: "yellow", fontWeight: "bold" }}
            >
              <Link href="/admin">Dashboard</Link>
            </li>
          ) : null}
        </ul>
        {/* <div
          className={css.menuIcon}
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div> */}
        {/* for medium and small screens */}
        {menuOpened ? (
          <div className={css.closeIcon}>
            <AiFillCloseCircle size={30} />
          </div>
        ) : (
          <div
            className={css.menuIcon}
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <BiMenuAltRight size={30} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
