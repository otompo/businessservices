import { Layout } from "antd";
import AdminNav from "../nav/AdminNav";
import LoadingToRedirect from "../LoadingToRedirect";
import { AuthContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const { Content } = Layout;

function AdminLayout({ children, title }) {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(true);
  // hooks
  const router = useRouter();

  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get("/api/currentadmin");
      // console.log("data", data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      router.push("/");
    }
  };

  // if (loading) {
  //   return <LoadingToRedirect />;
  // }
  return (
    <Layout>
      <AdminNav />
      {/* <Layout> */}
      <Content style={{ padding: "100px" }}>{children}</Content>
      {/* </Layout> */}
    </Layout>
  );
}

export default AdminLayout;
