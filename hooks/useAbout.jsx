import { useState, useEffect } from "react";
import axios from "axios";

const useAbout = () => {
  // state
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutContent, setAboutContent] = useState("");
  const [missionTitle, setMissionTitle] = useState("");
  const [missionContent, setMissionContent] = useState("");
  const [visionTitle, setVisionTitle] = useState("");
  const [visionContent, setVisionContent] = useState("");

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const { data } = await axios.get("/api/about/about");
      setAboutTitle(data.about_title);
      setAboutContent(data.about_content);
      setMissionTitle(data.mission_title);
      setMissionContent(data.mission_content);
      setVisionTitle(data.vision_title);
      setVisionContent(data.vision_content);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    aboutTitle,
    aboutContent,
    missionTitle,
    missionContent,
    visionTitle,
    visionContent,
    setAboutTitle,
    setAboutContent,
    setMissionTitle,
    setMissionContent,
    setVisionTitle,
    setVisionContent,
  };
};

export default useAbout;
