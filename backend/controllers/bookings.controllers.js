const Bookings = require("../models/bookings.model");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const { sendEmail } = require("../utils/sendEmail");

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

  const bodymessage = `
  <html>
      <head>
          <style>
          .main_header{
            background-color: #0f71b0;
            padding:5px;
            margin:5px;
            text-transform:uppercase
          }
          .main_header h2{
            text-align:center;
            color:#ffffff
          }
              table {
                  border-collapse: collapse;
                  width: 100%;
                  margin-bottom: 20px;
              }
              th, td {
                  border: 1px solid black;
                  padding: 10px;
                  text-align: left;
              }
              th {
                  background-color: #0f71b0;
                  color:#ffffff
              }
              .highlight {
                  background-color: #ffe6e6;
              }
              #subsection{
                // background-color: #EBEBEB;
                margin:5px;
                padding:5px;
              }
              #subsection span{
               color:#383838;
               font-weight:300;
               font-family:   "font-family: "Times New Roman", Times, serif";
              }
              #subsection p{               
               font-family:   "font-family: "Times New Roman", Times, serif";
              }
          </style>
      </head>
      <body>
      <div class="main_header">
        <h2>Grace Business Services</h2>
      </div>
      <div id="subsection">
       
      <h4>CLIENT NAME:<span> ${fullName}</span></h4>      
      <h4>ADDRESS: <span> ${address}</span> </h4>
      <h4>CLIENT CONTACT: <span> ${contactNum}</span> </h4>
      <h4>CLIENT EMAIL: <span> ${email}</span> </h4>
      <h4>ADDRESS: <span> ${address}</span> </h4>
      <h4>SERVICE SELECTED: <span> ${selectedOption}</span> </h4>
      <h4>BOOKED DATE: <span> ${moment(bookingDate).format("LLLL")}</span></h4>
      <hr />
      <h4>MESSAGE: </h4>
      <p> ${message}</p>
      </div>
      
          <h4>Thank you</h4>
      </body>
  </html>
`;

  // const bookingdata = await new Bookings({
  //   fullName,
  //   email,
  //   contactNum,
  //   address,
  //   message,
  //   bookingDate,
  //   selectedOption,
  // }).save();

  await sendEmail({
    fromemail: email,
    email: "info@gracebusinessservices.co.uk",
    subject: "Order Placed",
    html: bodymessage,
  });

  return res.status(201).json({
    msg: "Booking done successfully",
    // bookingdata,
  });
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const data = await Bookings.find({}).sort({ createdAt: -1 });
  res.send(data);
});
// <h3>Hi Grace Business Services</h3>
//  <table>
//         <thead>
//             <tr>
//                 <th> Service Selected</th>
//                 <th>Contact  </th>
//                 <th>Email </th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${selectedOption}</td>
//                 <td>${contactNum}</td>
//                 <td>${email}</td>
//             </tr>

//         </tbody>
//     </table>
