import { Layout } from "antd";
import AdminNav from "../nav/AdminNav";
const { Content } = Layout;

function AdminLayout({ children, title }) {
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
