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
