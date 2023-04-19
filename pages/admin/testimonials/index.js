// import { getSession } from "next-auth/react";
import Testimonials from "../../../components/Admin/Testimonials/Testimonials";

const Index = () => {
  return <Testimonials />;
};

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (!session || !session.user.role.includes("Admin")) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

export default Index;
