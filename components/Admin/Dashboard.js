import { useEffect, useState } from "react";
import Card from "./Card";
import AdminLayout from "../layout/AdminLayout";
import css from "./Dashboard.module.scss";
import axios from "axios";

const Dashboard = ({ children }) => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    showNumbers();
  }, []);

  const showNumbers = async () => {
    try {
      const { data } = await axios.get(`/api/numbers`);
      setNumbers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className={` ${css.container}`}>
        <Card
          cade_title="Total Users"
          cade_total={numbers.users}
          backgroundColor="#005ea8"
        />
        <Card
          cade_title="Total Bookings"
          cade_total={numbers.bookings}
          backgroundColor="#9A00A8"
        />
        <Card
          cade_title="Total Testimonials"
          cade_total={numbers.testimonials}
          backgroundColor="#005B34"
        />
        <Card
          cade_title="Total Services"
          cade_total={numbers.services}
          backgroundColor="#E78906"
        />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
