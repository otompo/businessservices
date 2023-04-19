import React, { useEffect, useState } from "react";
// import { MDBDataTable } from "mdbreact";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
import { Tooltip, Modal } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  CoffeeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
// import moment from 'moment';
import axios from "axios";
import { useRouter } from "next/router";
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';
// import { updateUser } from '../../helpers/authHelpers';
import AdminLayout from "../layout/AdminLayout";

const ManageUsers = () => {
  const { confirm } = Modal;
  // const [users, setUsers] = useState([]);
  // const [visible, setVisible] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  // useEffect(() => {
  //   loadUsers();
  // }, [loading]);

  const router = useRouter();
  const { id } = router.query;

  // const loadUsers = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/admin/users`);
  //     setUsers(data);
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err.response.data);
  //   }
  // };

  // const handleDelete = (index) => {
  //   confirm({
  //     title: `Are you sure remove this User`,
  //     icon: <ExclamationCircleOutlined />,
  //     content: 'It will be deleted permanentily if you click Yes',
  //     okText: 'Yes',
  //     okType: 'danger',
  //     cancelText: 'No',

  //     onOk: async () => {
  //       try {
  //         setSuccess(true);
  //         let allusers = users;
  //         const removed = allusers.splice(index, 1);
  //         setUsers(allusers);
  //         // send request to server
  //         const { data } = await axios.delete(
  //           `/api/admin/users/${removed[0]._id}`,
  //         );
  //         toast.success('User Deleted Successfully');
  //         setSuccess(false);
  //       } catch (err) {
  //         toast.error(err.response.data.message);
  //         setSuccess(false);
  //       }
  //     },
  //     onCancel() {
  //       return;
  //     },
  //   });
  // };

  // const removeUserAsAdmin = (index) => {
  //   confirm({
  //     title: `Are you sure remove this User as an Admin`,
  //     icon: <ExclamationCircleOutlined />,
  //     content: 'User Will no more be an Admin if you click yes',
  //     okText: 'Yes',
  //     okType: 'danger',
  //     cancelText: 'No',
  //     onOk: async () => {
  //       try {
  //         let allusers = users;
  //         const removed = allusers.splice(index, 1);
  //         setLoading(true);
  //         const { data } = await axios.put(
  //           `/api/admin/users/removeadmin/${removed[0]._id}`,
  //         );
  //         setUsers(allusers);
  //         toast.success('User Removed  As Admin Successfully');
  //         setLoading(false);
  //         updateUser(data);
  //       } catch (err) {
  //         // console.log(err);
  //         toast.error(err.response.data);
  //         setLoading(false);
  //       }
  //     },
  //     onCancel() {
  //       return;
  //     },
  //   });
  // };

  // const makeUserAnAdmin = async (e, id) => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.put(`/api/admin/users/addadmin/${id}`);
  //     setLoading(false);
  //     toast.success('Great! User is now an admin');

  //   } catch (err) {

  //     toast.error(err.response.data);
  //     setLoading(false);
  //   }
  // };

  // const setData = () => {
  //   const data = {
  //     columns: [
  //       {
  //         label: 'Name',
  //         field: 'name',
  //         sort: 'asc',
  //       },
  //       {
  //         label: 'Joined Date',
  //         field: 'join',
  //         sort: 'asc',
  //       },
  //       {
  //         label: 'Role',
  //         field: 'role',
  //         sort: 'asc',
  //       },
  //       {
  //         label: 'Email',
  //         field: 'email',
  //         sort: 'asc',
  //       },
  //       {
  //         label: 'Action',
  //         field: 'action',
  //         sort: 'asc',
  //       },
  //     ],
  //     rows: [],
  //   };

  //   users &&
  //     users.forEach((user, index) => {
  //       data.rows.push({
  //         name: `${user.name}`,
  //         join: `${moment(user.createdAt).fromNow()}`,
  //         role: `${user.role}`,
  //         email: `${user.email}`,
  //         action: (
  //           <>
  //             <div className="row">
  //               <div className="col-md-6">
  //                 <Tooltip title="View User Profile">
  //                   <span onClick={() => setVisible(true)}>
  //                     <Link
  //                       key={index}
  //                       href={`/admin/user/profile/${user.username}`}
  //                     >
  //                       <a>
  //                         <EyeOutlined className="text-success d-flex justify-content-center" />
  //                       </a>
  //                     </Link>
  //                   </span>
  //                 </Tooltip>
  //               </div>
  //               <div className="col-md-3">
  //                 {user && user.role.includes('Admin') ? (
  //                   <Tooltip title="Remove User as Admin">
  //                     <span
  //                       onClick={() => removeUserAsAdmin(index)}
  //                       // className="pt-1 pl-3"
  //                     >
  //                       <CoffeeOutlined
  //                         className="text-danger d-flex justify-content-center "
  //                         style={{ cursor: 'pointer' }}
  //                       />
  //                     </span>
  //                   </Tooltip>
  //                 ) : (
  //                   <Tooltip title="Make User as Admin">
  //                     <span
  //                       onClick={(e) => makeUserAnAdmin(e, user._id)}
  //                       // className="pt-1 pl-3"
  //                     >
  //                       <CoffeeOutlined
  //                         className="text-success d-flex justify-content-center "
  //                         style={{ cursor: 'pointer' }}
  //                       />
  //                     </span>
  //                   </Tooltip>
  //                 )}
  //               </div>
  //               <div className="col-md-3">
  //                 <Tooltip title="Delete User">
  //                   <span
  //                     onClick={() => handleDelete(index)}
  //                     // className="pt-1 pl-3"
  //                   >
  //                     <DeleteOutlined
  //                       className="text-danger d-flex justify-content-center "
  //                       style={{ cursor: 'pointer' }}
  //                     />
  //                   </span>
  //                 </Tooltip>
  //               </div>
  //             </div>
  //           </>
  //         ),
  //       });
  //     });

  //   return data;
  // };

  return (
    <AdminLayout title="Manage Users">
      <div>Manage Users</div>
      {/* <MDBDataTable data={setData()} className="px-3" bordered striped hover /> */}
    </AdminLayout>
  );
};

export default ManageUsers;
