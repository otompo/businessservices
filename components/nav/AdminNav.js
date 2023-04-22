import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { Menu, Layout } from "antd";
import { useWindowWidth } from "@react-hook/window-size";
import {
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  PushpinOutlined,
  PicRightOutlined,
  VerticalAlignMiddleOutlined,
  FullscreenExitOutlined,
  FunnelPlotOutlined,
  SearchOutlined,
  GlobalOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AdminNav = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const router = useRouter();
  // context
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");
  // hooks
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  useEffect(() => {
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `${current === name && "active"}`;

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    // toast(data.message);
    router.push("/");
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["2", "6", "10"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<SettingOutlined />} className="mt-5">
          <Link href="/admin" legacyBehavior>
            <a className={activeName("/admin")}>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* users */}
        <SubMenu key="2" icon={<UserSwitchOutlined />} title="Users">
          <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
            <Link href="/admin/staff" legacyBehavior>
              <a className={activeName("/admin/staff")}>Manage Staff</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* posts */}

        <SubMenu key="10" icon={<HomeOutlined />} title="Home">
          <Menu.Item key="4" icon={<VerticalAlignMiddleOutlined />}>
            <Link href="/admin/testimonials" legacyBehavior>
              <a className={activeName("/admin/testimonials")}>
                Manage Testimonials
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<VerticalAlignMiddleOutlined />}>
            <Link href="/admin/testimonials" legacyBehavior>
              <a className={activeName("/admin/testimonials")}>
                Manage Bookings
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<VerticalAlignMiddleOutlined />}>
            <Link href="/admin/testimonials" legacyBehavior>
              <a className={activeName("/admin/testimonials")}>
                Manage Services
              </a>
            </Link>
          </Menu.Item>
        </SubMenu>

        {/* Customize */}
        <Menu.Item key="14" icon={<BgColorsOutlined />}>
          <Link href="/admin/customize" legacyBehavior>
            <a className={activeName("/admin/customize")}>Customize</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="15" icon={<BiPowerOff size={30} color="red" />}>
          <p onClick={logout} className="logout" style={{ color: "red" }}>
            <span className="fa fa-power-off m-2"></span>Log Out
          </p>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
