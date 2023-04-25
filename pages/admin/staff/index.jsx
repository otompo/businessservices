import ManageUsers from "../../../components/Admin/Users/ManageUsers";
import Head from "next/head";
const index = () => {
  return (
    <>
      <Head>
        <title>Users | Dashboard</title>
      </Head>
      <ManageUsers />;
    </>
  );
};

export default index;
