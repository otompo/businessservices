import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import css from "./ManageSettings.module.scss";
import { Tabs, Input, Card, Avatar } from "antd";
import useHero from "../../../hooks/useHero";
import useAbout from "../../../hooks/useAbout";
import useFooter from "../../../hooks/useFooter";
import { toast } from "react-hot-toast";
import axios from "axios";
const { TabPane } = Tabs;
const { TextArea } = Input;

const ManageSettings = () => {
  const [loadingFooter, setLoadingFooter] = useState(false);
  const [loadingAbout, setLoadingAbout] = useState(false);
  const [loadingHero, setLoadingHero] = useState(false);

  const {
    title,
    slogan,
    heroEmail,
    jobscompletedTitle,
    jobscompletedNumber,
    happyclientsNumber,
    happyclientsTitle,
    setTitle,
    setSlogan,
    setHeroEmail,
    setJobscompletedTitle,
    setJobscompletedNumber,
    setHappyclientsTitle,
    setHappyclientsNumber,
  } = useHero();
  const {
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
  } = useAbout();
  const {
    address,
    email,
    contactNum,
    facebookLink,
    setAddress,
    setEmail,
    setContactNum,
    setFacebookLink,
  } = useFooter();

  const handleHeroSubmit = async () => {
    try {
      setLoadingHero(true);
      const { data } = await axios.post("/api/hero", {
        hero: "hero",
        title,
        slogan,
        email: heroEmail,
        jobscompleted_title: jobscompletedTitle,
        jobscompleted_number: jobscompletedNumber,
        happyclients_title: happyclientsTitle,
        happyclients_number: happyclientsNumber,
      });
      setLoadingHero(false);
      toast.success("Saved");
    } catch (err) {
      console.log(err);
      setLoadingHero(false);
    }
  };
  const handleAboutSubmit = async () => {
    try {
      setLoadingAbout(true);
      const { data } = await axios.post("/api/about", {
        about: "about",
        about_title: aboutTitle,
        about_content: aboutContent,
        mission_title: missionTitle,
        mission_content: missionContent,
        vision_title: visionTitle,
        vision_content: visionContent,
      });
      setLoadingAbout(false);
      toast.success("Saved");
    } catch (err) {
      console.log(err);
      setLoadingAbout(false);
    }
  };

  const handleFooterSubmit = async () => {
    try {
      setLoadingFooter(true);
      const { data } = await axios.post("/api/footer", {
        footer: "footer",
        address,
        email,
        contact_number: contactNum,
        facebook_link: facebookLink,
      });
      toast.success("Saved");
      setLoadingFooter(false);
    } catch (err) {
      console.log(err);
      setLoadingFooter(false);
    }
  };

  return (
    <AdminLayout>
      <div className={css.container}>
        <div className={css.leftcolumn}>
          <p>Manage Settings</p>
        </div>
        <div className={css.rightcolumn}></div>
      </div>
      <hr />
      <Tabs defaultActiveKey="1">
        <TabPane tab="CUSTOMIZE HERO SECTION" key="1">
          <div className={css.heroSection}>
            <Input
              size="large"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Input
              size="large"
              placeholder="Enter title"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
            />
            <Input
              size="large"
              placeholder="Enter email"
              value={heroEmail}
              onChange={(e) => setHeroEmail(e.target.value)}
            />
            <Input
              size="large"
              placeholder="Enter title"
              value={jobscompletedTitle}
              onChange={(e) => setJobscompletedTitle(e.target.value)}
            />
            <Input
              size="large"
              placeholder="Enter number"
              value={jobscompletedNumber}
              onChange={(e) => setJobscompletedNumber(e.target.value)}
            />
            <Input
              size="large"
              placeholder="Enter title"
              value={happyclientsTitle}
              onChange={(e) => setHappyclientsTitle(e.target.value)}
            />
            <Input
              size="large"
              placeholder="Enter number"
              value={happyclientsNumber}
              onChange={(e) => setHappyclientsNumber(e.target.value)}
            />

            <div>
              <button
                type="submit"
                onClick={handleHeroSubmit}
                className="bg-[#7c03a0]  hover:bg-purple-700 border-purple-700 w-full p-3 rounded-lg text-white"
              >
                {loadingHero ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </TabPane>

        <TabPane tab="CUSTOMIZE ABOUT US" key="2">
          <div className={css.aboutSection}>
            <Input
              style={{ margin: "20px 0px 10px 0px" }}
              size="large"
              placeholder="Enter title"
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
            />

            <Input
              style={{ margin: "20px 0px 10px 0px" }}
              size="large"
              placeholder="Enter title"
              value={missionTitle}
              onChange={(e) => setMissionTitle(e.target.value)}
            />
            {/* <TextArea
                rows={4}
                placeholder="maxLength is 6"
                maxLength={6}
                name="aboutContent"
                value={aboutContent}
                onChange={(e) => {
                  setAboutContent(e.target.value);
                }}
              /> */}
            <textarea
              rows={15}
              cols={150}
              id="aboutContent"
              value={aboutContent}
              name="aboutContent"
              onChange={(e) => {
                setAboutContent(e.target.value);
              }}
            ></textarea>

            <Input
              style={{ margin: "20px 0px 10px 0px" }}
              size="large"
              placeholder="Enter title"
              value={missionTitle}
              onChange={(e) => setMissionTitle(e.target.value)}
            />

            <textarea
              rows={15}
              cols={150}
              id="missionContent"
              value={missionContent}
              name="missionContent"
              onChange={(e) => {
                setMissionContent(e.target.value);
              }}
            ></textarea>

            <Input
              style={{ margin: "20px 0px 10px 0px" }}
              size="large"
              placeholder="Enter title"
              value={visionTitle}
              onChange={(e) => setVisionTitle(e.target.value)}
            />

            <textarea
              rows={15}
              cols={150}
              id="visionContent"
              value={visionContent}
              name="visionContent"
              onChange={(e) => {
                setVisionContent(e.target.value);
              }}
            ></textarea>

            <button
              type="submit"
              onClick={handleAboutSubmit}
              className="bg-[#7c03a0]  hover:bg-purple-700 border-purple-700 w-full p-3 rounded-lg text-white"
            >
              {loadingAbout ? "Loading..." : "Submit"}
            </button>
          </div>
        </TabPane>
        <TabPane tab="CUSTOMIZE FOOTER" key="5">
          <div className={css.footerSection}>
            <Input
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Enter address title"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Input
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Enter Contact"
              value={contactNum}
              onChange={(e) => setContactNum(e.target.value)}
            />

            <Input
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Enter facebook link"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
            />

            <button
              type="submit"
              onClick={handleFooterSubmit}
              style={{ margin: "10px 0px 10px 0px" }}
              className="bg-[#7c03a0]  hover:bg-purple-700 border-purple-700 w-full p-3 rounded-lg text-white"
            >
              {loadingFooter ? "Loading..." : "Submit"}
            </button>
          </div>
        </TabPane>
      </Tabs>
    </AdminLayout>
  );
};

export default ManageSettings;
