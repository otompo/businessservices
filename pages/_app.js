import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster />
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
