// import { getSession } from "next-auth/react";
import ManageSettings from "../../../components/Admin/ManageSettings/ManageSettings";

const Index = () => {
  // context

  return <ManageSettings />;
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
