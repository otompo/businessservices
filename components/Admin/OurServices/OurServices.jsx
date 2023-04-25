import css from "./OurServices.module.scss";
import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import { Modal, Avatar, Spin, List, Input } from "antd";
// import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";
const { confirm } = Modal;

const OurServices = () => {
  const [values, setValues] = useState({
    title: "",
    content: "",
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [image, setImage] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [imagePreview, setImagePreview] = useState("");
  const [keyword, setKeyword] = useState("");
  // console.log(image);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // hooks
  useEffect(() => {
    loadServices();
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      await axios.post(`/api/ourservices`, {
        title: values.title,
        content: values.content,
      });
      setImagePreview({});
      setValues({ ...values, title: "", content: "", loading: false });
      setSuccess(false);
      setIsModalVisible(false);
      toast.success("Success");
    } catch (err) {
      console.log(err.response);
      setSuccess(false);
    }
  };

  const loadServices = async () => {
    try {
      const { data } = await axios.get("/api/ourservices");
      setServices(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      // setUploadButtonText(reader.name);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setUploadButtonText("Upload Image");
      setImagePreview("Upload Image");
    }
  };

  const handleDelete = async (service) => {
    try {
      await axios.delete(`/api/ourservices/${service._id}`);
      setServices((prev) => prev.filter((t) => t._id !== service._id));
      toast.error("Service deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const filteredServices = services?.filter((u) =>
    u.title.toLowerCase().includes(keyword)
  );

  return (
    <AdminLayout>
      <div className={css.container}>
        <div className={css.leftcolumn}>
          <p>Manage Services</p>
        </div>
        <div className={css.rightcolumn}>
          <button className={css.button} onClick={showModal}>
            Add Service
          </button>
        </div>
      </div>
      <Input
        placeholder="Search"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
      <List
        itemLayout="horizontal"
        dataSource={filteredServices}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(service) => (
          <List.Item
            actions={[
              // <Link href={`/admin/users/${service._id}`}>edit</Link>,
              <a onClick={() => handleDelete(service)}>
                <BiTrash size={30} color="red" />
              </a>,
              <a
              //   onClick={
              //   () => handleDelete(service)
              // }
              >
                <BiEdit size={30} color="green" />
              </a>,
            ]}
          >
            <List.Item.Meta title={service.title} style={{ marginLeft: 10 }} />

            <List.Item.Meta description={service?.content} />
          </List.Item>
        )}
      />

      <Modal
        title="+ Add service"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={700}
      >
        <form
          className={css.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              rows={12}
              id="content"
              value={values.content}
              name="content"
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-block btn-primary py-2"
            disabled={values.loading ? true : false}
          >
            {values.loading ? <Spin /> : "CREATE"}
          </button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default OurServices;
