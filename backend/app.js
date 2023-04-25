// const { readdirSync } = require("fs");
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnect");
const cors = require("cors");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middlewares/error");

connectDB();

//  routes imports
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const numbersRoutes = require("./routes/numbers.routes");
const bookingsRoutes = require("./routes/bookings.routes");
const servicesRoutes = require("./routes/ourservices.routes");
const testimonialsRoutes = require("./routes/testimonials.routes");
const webappRoutes = require("./routes/webapp.routes");

const app = express();

//middlewares
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", numbersRoutes);
app.use("/api", bookingsRoutes);
app.use("/api", servicesRoutes);
app.use("/api", testimonialsRoutes);
app.use("/api", webappRoutes);

// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.get("/", (req, res) => {
  res.send("<h4>WELCOME TO GRACE BUSINESS SERVICES</h4>");
});

app.use(ErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ::: ${PORT}`));
