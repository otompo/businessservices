import React, { useEffect, useState } from "react";
import css from "./ManageUsers.module.scss";
import { Input, Modal, List } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import generator from "generate-password";
// import moment from "moment";
// import Link from 'next/link';
import AdminLayout from "../../layout/AdminLayout";
// import Link from "next/link";

const ManageUsers = () => {
  const { confirm } = Modal;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: generator.generate({ length: 6 }),
    loading: false,
  });

  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadUsers();
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(true);
      setValues({
        ...values,
        name: "",
        email: "",
        loading: true,
      });
      await axios.post(`/api/users`, {
        ...values,
        role: "admin",
      });
      toast.success("Success");
      setVisible(false);
      setValues({
        ...values,
        name: "",
        email: "",

        loading: false,
      });
      setSuccess(false);
    } catch (err) {
      console.log(err.response.data.message);
      // toast.error(err.response);
      setSuccess(false);
    }
  };

  const router = useRouter();
  const { id } = router.query;

  const loadUsers = async () => {
    try {
      const { data } = await axios.get(`/api/users`);
      setUsers(data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const filteredUsers = users?.filter((u) =>
    u.name.toLowerCase().includes(keyword)
  );

  return (
    <AdminLayout title="Manage Users">
      <div className={css.container}>
        <div className={css.leftcolumn}>
          <p>Manage Users</p>
        </div>
        <div className={css.rightcolumn}>
          <button className={css.button} onClick={showModal}>
            Add a Staff
          </button>
        </div>
      </div>

      <Input
        placeholder="Search"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
      <List
        itemLayout="horizontal"
        dataSource={filteredUsers}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(user) => (
          <List.Item
          // actions={[
          //   <Link href={`/admin/users/${user._id}`}>edit</Link>,
          //   <a disabled={user?._id} onClick={() => handleDelete(user)}>
          //     delete
          //   </a>,
          // ]}
          >
            <List.Item.Meta title={user.name} style={{ marginLeft: 10 }} />
            <List.Item.Meta
              description={user.email}
              style={{ marginLeft: 10, fontSize: 20 }}
            />
            <List.Item.Meta
              description={user.role}
              style={{ marginLeft: 10, fontSize: 20 }}
            />
            <List.Item.Meta
              description={user?.generatedPasword}
              style={{ marginLeft: 10, fontSize: 20 }}
            />
          </List.Item>
        )}
      />
      <Modal
        title="+ Add Staff"
        open={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="w-full shadow-sm rounded-md p-2 focus:outline-none border border-gray-300"
            placeholder="Enter name"
            required
          />

          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full shadow-sm rounded-md p-2 focus:outline-none border border-gray-300"
            placeholder="Enter email"
            required
          />
          <div style={{ display: "flex" }}>
            <input
              type="text"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full shadow-sm rounded-md p-2 focus:outline-none border border-gray-300"
              required
              hidden
            />
          </div>

          <div>
            <button
              className="bg-[#7c03a0] w-full my-5 hover:bg-purple-700 border-purple-700 text-white p-2 rounded-md cursor-pointer"
              disabled={!values.name || !values.email}
              type="submit"
            >
              {values.loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default ManageUsers;
