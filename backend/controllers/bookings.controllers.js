const Bookings = require("../models/bookings.model");
const catchAsync = require("../utils/catchAsync");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const moment = require("moment");

exports.newBooking = catchAsync(async (req, res, next) => {
  const {
    fullName,
    email,
    contactNum,
    address,
    message,
    bookingDate,
    selectedOption,
  } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: "steeletimothy2000@gmail.com",
      pass: "llgtrxgbfryrjjor",
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Grace Business Services",
      link: "https://wanghana.org",
    },
  });

  let response = {
    body: {
      name: "Grace Business Services",
      intro: `<h3>CLIENT NAME:</h3> ${fullName}`,
      dictionary: {
        statedate: `${moment(bookingDate).format("LLLL")}`,
        address: `${address}`,
      },
      table: {
        data: [
          {
            service: selectedOption,
            contact: contactNum,
            email: email,
          },
        ],
      },

      outro: `<h3>Message:</h3> ${message}`,
    },
  };

  let mail = MailGenerator.generate(response);

  let messageIfo = {
    from: email,
    to: "steeletimothy2000@gmail.com",
    subject: "Order Placed",
    html: mail,
  };

  const bookingdata = await new Bookings({
    fullName,
    email,
    contactNum,
    address,
    message,
    bookingDate,
    selectedOption,
  }).save();

  transporter
    .sendMail(messageIfo)
    .then(() => {
      return res.status(201).json({
        msg: "Booking done successfully",
        bookingdata,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const data = await Bookings.find({}).sort({ createdAt: -1 });
  res.send(data);
});

exports.getbill = (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: "steeletimothy2000@gmail.com",
      pass: "llgtrxgbfryrjjor",
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Grace Business Services",
      link: "https://wanghana.org",
    },
  });

  let response = {
    body: {
      name: "Daily Tuition",
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: userEmail,
    to: userEmail,
    subject: "Place Order",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("getBill Successfully...!");
};
