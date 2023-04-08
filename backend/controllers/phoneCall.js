require("dotenv").config();
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const makePhoneCall = asyncHandler(async (req, res) => {
  try {
    client.calls
      .create({
        twiml:
          "<Response><Say>Thank you for using Travel Buddy. This is a reminder call for your trip starting tomorrow. Happy journey from Travel Buddy Team!</Say></Response>",
        to: "+919920521656",
        from: "+15855316502",
      })
      .then((call) => console.log(call.sid));

    res.status(200).json({
      success: true,
      data: "Phone Call is made",
    });
  } catch (error) {
    console.log("ERROR ---- ", error);
    res.status(200).json({
      success: false,
      data: "Phone Call is not made",
    });
  }
});

const sendProgressReport = async (req, res) => {
  let output = "";

  output += `<p>Greetings!</p>
    <p>Please find the Program Report herewith.</p>`;
  setTimeout(async function () {
    output += `<table style="border: 1px solid #333;width:90%;border-collapse: collapse;margin-bottom:40px">
      <thead>
          <tr>
              <th style="padding-left:120px;">Program Name: NGO Feeding</th>
              <th>  </th>
          </tr>
      </thead>`;

    output += `
            <tr style="background-color: #dddddd;">
                <td style="border: 1px solid black;text-align: center;padding: 8px">NGO Name</td>
                <td style="border: 1px solid black;text-align: center;padding: 8px">NGO 1</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;text-align: center;padding: 8px">Total number of beneficiaries</td>
                <td style="border: 1px solid black;text-align: center;padding: 8px">90</td>
            </tr>
            <tr style="background-color: #dddddd;">
                <td style="border: 1px solid black;text-align: center;padding: 8px">Total number of female beneficiaries</td>
                <td style="border: 1px solid black;text-align: center;padding: 8px">55</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;text-align: center;padding: 8px">Total beneficiaries under the age of 18</td>
                <td style="border: 1px solid black;text-align: center;padding: 8px">15</td>
            </tr>
            <tr style="background-color: #dddddd;">
                <td style="border: 1px solid black;text-align: center;padding: 8px">Total beneficiaries over the age of 60</td>
                <td style="border: 1px solid black;text-align: center;padding: 8px">20</td>
            </tr>
            <tr>
                <td style="border: 1px solid black;text-align: center;padding: 8px">Total amounts of food items received (kg)</td>
                <td style="border: 1px solid black;text-align: center;padding: 8px">130</td>
            </tr>
        `;
    output += "</table>";

    output =
      output +
      "<p><strong>Regards</strong></p><p><strong>Team TravelBuddy</strong></p>";

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: `hartiksuhagiya10@gmail.com`,
        pass: `racxvvknohaekkfj`,
      },
      // If on localhost
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
    });

    let mailOptions = {
      from: `hartiksuhagiya10@gmail.com`,
      to: `rajsanghavi9@gmail.com`,
      // to: "rajsanghavi9@gmail.com",
      subject: "Program details",
      html: output,
      text: output,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // res.json(error);
        console.log(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("Weekly Report Sent");
        res.status(200).json({
          success: true,
          emailSuccess: true,
          // data: allVehiclesDetails,
        });
      }
    });
  }, 1500);
};

module.exports = {
  makePhoneCall,
  sendProgressReport,
};
