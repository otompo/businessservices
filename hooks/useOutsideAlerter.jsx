import { useEffect, useState } from "react";

export default function useOutsideAlerter({ menuRef, setMenuOpened }) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (typeof window !== "undefined") {
        const viewport_width = document.documentElement.clientWidth;
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          if (viewport_width <= 640) {
            setMenuOpened(false);
          }
        }
      }
    }
    // Bind the event listener
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [menuRef]);
}
