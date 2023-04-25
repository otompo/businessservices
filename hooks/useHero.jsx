import { useState, useEffect } from "react";
import axios from "axios";

const useHero = () => {
  // state
  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [jobscompletedTitle, setJobscompletedTitle] = useState("");
  const [jobscompletedNumber, setJobscompletedNumber] = useState("");
  const [happyclientsTitle, setHappyclientsTitle] = useState("");
  const [happyclientsNumber, setHappyclientsNumber] = useState("");
  const [heroEmail, setHeroEmail] = useState("");

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    try {
      const { data } = await axios.get("/api/hero/hero");
      setTitle(data.title);
      setSlogan(data.slogan);
      setJobscompletedTitle(data.jobscompleted_title);
      setJobscompletedNumber(data.jobscompleted_number);
      setHappyclientsTitle(data.happyclients_title);
      setHappyclientsNumber(data.happyclients_number);
      setHeroEmail(data.email);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    title,
    slogan,
    heroEmail,
    jobscompletedTitle,
    jobscompletedNumber,
    happyclientsTitle,
    happyclientsNumber,
    setTitle,
    setSlogan,
    setHeroEmail,
    setJobscompletedTitle,
    setHappyclientsTitle,
    setJobscompletedNumber,
    setHappyclientsNumber,
  };
};

export default useHero;
