import ManageBookings from "../../../components/Admin/ManageBookings/ManageBookings";
import Head from "next/head";
function index() {
  return (
    <>
      <Head>
        <title>Bookings | Dashboard</title>
      </Head>
      <ManageBookings />;
    </>
  );
}

export default index;
