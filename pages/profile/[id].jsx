import Head from "next/head";
import AdminLayout from "../../components/layout/AdminLayout";
import ProfileUpdate from "../../components/user/ProfileUpdate";
const UpdateUser = () => {
  // show form
  return (
    <>
      <Head>
        <title>Manage Profile</title>
      </Head>
      <AdminLayout>
        <ProfileUpdate />
      </AdminLayout>
    </>
  );
};

export default UpdateUser;
