require("dotenv").config();
const { readdirSync } = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/dbConnect");
// const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middlewares/error");

connectDB();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

//  routes imports

// const authRoutes = require("./routes/auth.routes");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//home route
// auto load routes
//routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", authRoutes);

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.get("/", (req, res) => {
  res.send("<h4>WELCOME TO GRACE BUSINESS SERVICES</h4>");
});

app.use(ErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ::: ${PORT}`));
