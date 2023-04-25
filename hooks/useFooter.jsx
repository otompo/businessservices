import { useState, useEffect } from "react";
import axios from "axios";

const useFooter = () => {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [facebookLink, setFacebookLink] = useState("");

  useEffect(() => {
    loadFooter();
  }, []);

  const loadFooter = async () => {
    try {
      const { data } = await axios.get("/api/footer/footer");
      setAddress(data.address);
      setEmail(data.email);
      setContactNum(data.contact_number);
      setFacebookLink(data.facebook_link);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    address,
    email,
    contactNum,
    facebookLink,
    setAddress,
    setEmail,
    setContactNum,
    setFacebookLink,
  };
};

export default useFooter;
