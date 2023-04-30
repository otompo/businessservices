import "../styles/globals.scss";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SplashScreen from "../components/SplashScreen/SplashScreen";

export default function App({ Component, pageProps }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome);
  return (
    <>
      {isLoading && isHome ? (
        <SplashScreen finishLoading={() => setIsLoading(false)} />
      ) : (
        <>
          <AuthProvider>
            <Toaster />
            <Component {...pageProps} />
          </AuthProvider>
        </>
      )}
    </>
  );
}
