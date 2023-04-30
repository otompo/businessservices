import css from "./Testimonials.module.scss";
import AdminLayout from "../../layout/AdminLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Avatar, Spin } from "antd";
import Image from "next/image";
import { toast } from "react-hot-toast";

function EditTestimonials() {
  const router = useRouter();
  const [testimonialsID, setTestimonialsId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [featuredImage, setFeaturedImage] = useState({});
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [preImage, setPreImage] = useState({});
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  useEffect(() => {
    loadTestimonials();
  }, [router?.query?.id]);

  const loadTestimonials = async () => {
    try {
      const { data } = await axios.get(`/api/testimonials/${router.query.id}`);
      setName(data.name);
      setMessage(data.message);
      setPreImage(data.image.url);
      setTestimonialsId(data._id);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/testimonials/${testimonialsID}`, {
        name,
        message,
        image: imagePreview ? featuredImage : preImage,
      });
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      } else {
        toast.success("Success");
        router.push(`/admin/testimonials`);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleImage = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFeaturedImage(reader.result);
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setFeaturedImage(reader.result);
      setUploadButtonText("Upload Image");
    }
  };

  return (
    <AdminLayout>
      <div className={css.container}>
        <div className={css.leftcolumn}>
          <p>{name}</p>
        </div>
        <div className={css.rightcolumn}>
          {/* <button className={css.button}>Edit Testimonials</button> */}
        </div>
      </div>
      <div>
        <form
          className={css.form}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              rows={12}
              id="message"
              value={message}
              name="message"
              onChange={(e) => setMessage(e.target.value)}
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
            <div>
              {imagePreview ? (
                <Image
                  src={featuredImage}
                  alt="image"
                  width={70}
                  height={70}
                  lazy
                />
              ) : (
                <Avatar src={preImage} size={60}>
                  {name[0]}
                </Avatar>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-block btn-primary py-2">
            {loading ? <Spin /> : "UPDATE"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditTestimonials;
