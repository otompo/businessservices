import Head from "next/head";
import OurServices from "../../../components/Admin/OurServices/OurServices";

const index = () => {
  return (
    <>
      <Head>
        <title>Our Services | Dashboard</title>
      </Head>
      <OurServices />;
    </>
  );
};

export default index;
