import css from "./ManageBookings.module.scss";
import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import { Avatar, List, Input } from "antd";
import moment from "moment";
import axios from "axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [keyword, setKeyword] = useState("");

  // hooks
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings");
      setBookings(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookings = bookings?.filter((u) =>
    u.fullName.toLowerCase().includes(keyword)
  );

  return (
    <AdminLayout>
      <div className={css.container}>
        <div className={css.leftcolumn}>
          <p>Manage Bookings</p>
        </div>
        <div className={css.rightcolumn}></div>
      </div>
      <Input
        placeholder="Search"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
      <List
        itemLayout="horizontal"
        dataSource={filteredBookings}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(booking) => (
          <List.Item
          //   actions={[
          //     <a onClick={() => handleDelete(booking)}>
          //       <BiTrash size={30} color="red" />
          //     </a>,
          //     <a
          //     >
          //       <BiEdit size={30} color="green" />
          //     </a>,
          //   ]}
          >
            <Avatar size={50}>{booking?.fullName[0]}</Avatar>
            <List.Item.Meta
              title={booking.fullName}
              style={{ marginLeft: 10 }}
            />

            <List.Item.Meta description={booking?.email} />
            <List.Item.Meta description={booking?.contactNum} />
            <List.Item.Meta description={booking?.selectedOption} />
            <List.Item.Meta description={booking?.address} />
            <List.Item.Meta description={booking?.message} />
            <List.Item.Meta
              description={moment(booking?.bookingDate).format("LLLL")}
            />
          </List.Item>
        )}
      />
    </AdminLayout>
  );
};

export default ManageBookings;
