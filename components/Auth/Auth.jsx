import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { getSession, signIn } from "next-auth/react";
import css from "./Auth.module.scss";
const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("sasco@gmail.com");
  const [password, setPassword] = useState("otompo123@");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(true);
    if (!result.error) {
      const session = await getSession();
      // console.log("session", session);

      toast.success("SignIn Success");

      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else if (session?.user?.role === "author") {
        router.push("/author");
      } else {
        router.push("/subscriber");
      }

      setLoading(false);
    } else {
      toast.error(result.error);
      setLoading(false);
    }
  };
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
