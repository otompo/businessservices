import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import css from "./Auth.module.scss";
import axios from "axios";
import { AuthContext } from "../../context";
import LoadingToRedirect from "../LoadingToRedirect";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("sasco@gmail.com");
  const [password, setPassword] = useState("otompo123@");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  // useEffect(() => {
  //   if (user?.token) getCurrentAdmin();
  // }, [user?.token]);

  // const getCurrentAdmin = async () => {
  //   try {
  //     const { data } = await axios.get("/api/currentadmin");
  //     setSuccess(false);
  //   } catch (err) {
  //     console.log(err.response.data.message);
  //     router.push("/");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/auth/login`, {
        email,
        password,
      });
      // setAuth(data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      toast.success("Success");
      setLoading(false);
      if (data?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  // if (!success) {
  //   return <LoadingToRedirect />;
  // }

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <div className="d-grid gap-2">
          <button disabled={!email || !password || loading} type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
