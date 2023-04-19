import { getSession } from "next-auth/react";
import { APP_NAME } from "../../config";
import Head from "next/head";
import Auth from "../../components/Auth/Auth";

export default function Index() {
  return (
    <>
      <Head>
        <title>Login | {APP_NAME}</title>
      </Head>
      <Auth />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({
    req: context.req,
  });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
