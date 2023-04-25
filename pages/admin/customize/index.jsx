import Head from "next/head";
import ManageSettings from "../../../components/Admin/ManageSettings/ManageSettings";

const Index = () => {
  // context

  return (
    <>
      <Head>
        <title>Settings | Dashboard</title>
      </Head>
      <ManageSettings />;
    </>
  );
};

export default Index;
