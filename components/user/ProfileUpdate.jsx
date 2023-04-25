import { useState, useEffect, useContext } from "react";
import { Input } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";
import css from "./ProfileUpdate.module.scss";

const ProfileUpdate = () => {
  // context
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  // state
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactNum, setContactNum] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [preCountry, setPreCountry] = useState("");
  const router = useRouter();

  useEffect(() => {
    const currentUser = async () => {
      try {
        const { data } = await axios.get(
          `/api/currentuser/${router?.query?.id}`
        );
        setId(data._id);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setContactNum(data.contactNum);
      } catch (err) {
        console.log(err);
      }
    };
    if (user?.token) currentUser();
  }, [user, user?.token]);

  // function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/profileupdate`, {
        id,
        name,
        email,
        password,
        contactNum,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        // udpate context and local storage for current user only
        if (user?.user?._id === data._id) {
          dispatch({
            type: "UPDATE_SUCCESS",
            payload: data,
          });
          let fromLocalStorage = JSON.parse(localStorage.getItem("user"));
          fromLocalStorage.user = data;
          window.localStorage.setItem("user", JSON.stringify(fromLocalStorage));
        }

        toast.success("success");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("User update failed. Try again.");
      setLoading(false);
    }
  };

  // show form
  return (
    <>
      <div className={css.container}>
        <h4 className={css.headerTitle}>Profile update</h4>
        <Input
          disabled
          style={{ margin: "10px 0px 10px 0px" }}
          size="large"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          style={{ margin: "20px 0px 10px 0px" }}
          size="large"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          style={{ margin: "10px 0px 10px 0px" }}
          size="large"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          style={{ margin: "10px 0px 10px 0px" }}
          size="large"
          placeholder="Contact Number"
          value={contactNum}
          onChange={(e) => setContactNum(e.target.value)}
        />

        <Input.Password
          style={{ margin: "10px 0px 10px 0px" }}
          size="large"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#7c03a0]  hover:bg-purple-700 border-purple-700 w-full p-3 rounded-lg text-white"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default ProfileUpdate;
