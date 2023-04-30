import css from "./Testimonials.module.scss";
import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import { Modal, Avatar, Spin, List, Input } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useRouter } from "next/router";

const Testimonials = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    message: "",
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [image, setImage] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [imagePreview, setImagePreview] = useState("");
  const [keyword, setKeyword] = useState("");

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
    loadTestimonials();
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      await axios.post(`/api/testimonials`, {
        name: values.name,
        message: values.message,
        image,
      });
      setImagePreview({});
      setValues({ ...values, name: "", message: "", loading: false });
      setSuccess(false);
      setIsModalVisible(false);
      toast.success("Success");
    } catch (err) {
      console.log(err.response);
      // toast.error(err.response.data);
      setSuccess(false);
    }
  };

  const loadTestimonials = async () => {
    try {
      const { data } = await axios.get("/api/testimonials");
      setTestimonials(data);
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

  const handleDelete = async (testimonial) => {
    // console.log(testimonial);
    try {
      await axios.delete(`/api/testimonials/${testimonial._id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== testimonial._id));
      toast.error("Testimonial deleted");
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTestimonials = testimonials?.filter((u) =>
    u.name.toLowerCase().includes(keyword)
  );

  const handleEdit = async (testimonial) => {
    return router.push(`/admin/testimonials/${testimonial._id}`);
  };

  return (
    <AdminLayout>
      <div className={css.container}>
        <div className={css.leftcolumn}>
          <p>Manage Testimonials</p>
        </div>
        <div className={css.rightcolumn}>
          <button className={css.button} onClick={showModal}>
            Add Testimonials
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
        dataSource={filteredTestimonials}
        pagination={{
          pageSize: 10,
        }}
        renderItem={(testimonial) => (
          <List.Item
            actions={[
              // <Link href={`/admin/users/${testimonial._id}`}>edit</Link>,
              <a onClick={() => handleDelete(testimonial)}>
                <BiTrash size={30} color="red" />
              </a>,
              <a onClick={(e) => handleEdit(testimonial)}>
                <BiEdit size={30} color="green" />
              </a>,
            ]}
          >
            <Avatar src={testimonial?.image?.url} size={50}>
              {testimonial?.name[0]}
            </Avatar>
            <List.Item.Meta
              title={testimonial.name}
              style={{ marginLeft: 10 }}
            />

            <List.Item.Meta description={testimonial?.message} />
          </List.Item>
        )}
      />

      <Modal
        title="+ ADD TESTIMONIAL"
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
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              rows={12}
              id="message"
              value={values.message}
              name="message"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className={css.image}>
            <label>
              {uploadButtonText}
              <input
                type="file"
                name="image"
                size="large"
                onChange={handleImage}
                accept="image/*"
                hidden
              />
            </label>

            <div className="form-group">
              {imagePreview ? (
                <Avatar size={60} src={imagePreview} />
              ) : (
                <Avatar size={60} src="/preview.ico" />
              )}
            </div>
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

export default Testimonials;
