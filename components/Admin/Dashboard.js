// import axios from "axios";
import { useEffect } from "react";
import Card from "./Card";
import AdminLayout from "../layout/AdminLayout";
import css from "./Dashboard.module.scss";

const Dashboard = ({ children }) => {
  // useEffect(() => {
  //   getNewUsers();
  //   getTotalUsers();
  //   showCategory();
  //   showBlogs();
  //   showNewlyCreatedBlogs();
  // }, []);

  // const showBlogs = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/admin/resources`);
  //     SetBlogs(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const showNewlyCreatedBlogs = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/admin/resources/new`);
  //     setNewlyBlogs(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const showCategory = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/category`);
  //     SetCategory(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getNewUsers = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/admin/users/limit`);
  //     setUsers(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getTotalUsers = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/admin/users`);
  //     setUsersTotal(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <AdminLayout title="Admin Dashboard">
      <div className={` ${css.container}`}>
        <Card cade_title="Total Users" cade_total="5" />
        <Card cade_title="Total Blogs" cade_total="33" />
        <Card cade_title="Total Users" cade_total="45" />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
