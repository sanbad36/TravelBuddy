const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");
// var QR = require('qr-image');
const QRCode = require("qrcode");
const axios = require("axios");
const generatePDF = async (name, email, event, date) => {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // Helper to move to next line
  function jumpLine(doc, lines) {
    for (let index = 0; index < lines; index++) {
      doc.moveDown();
    }
  }

  // const certiId = "65694094fdfdfdfd34390";

  doc.pipe(
    fs.createWriteStream(
      `certificates/${name}_${event}_completion_certificate.pdf`
    )
  );

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

  doc.fontSize(10);

  // Margin
  const distanceMargin = 18;
  // doc
  //     .font("fonts/NotoSansJP-Light.otf")
  //     .fontSize(10)
  //     .fill("#021c27")
  //     .text(`id : ${certiId}`, {
  //         align: "left",
  //     });
  doc
    .fillAndStroke("#0e8cc3")
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();

  // Header
  const maxWidth = 140;
  const maxHeight = 70;

  doc.image("images/winners.png", doc.page.width / 2 - maxWidth / 2, 60, {
    fit: [maxWidth, maxHeight],
    align: "center",
  });

  jumpLine(doc, 5);

  // doc
  //     .font("fonts/NotoSansJP-Light.otf")
  //     .fontSize(10)
  //     .fill("#021c27")
  //     .text("Super Course for Awesomes", {
  //         align: "center",
  //     });

  jumpLine(doc, 2);

  // Content
  doc
    .font("fonts/NotoSansJP-Regular.otf")
    .fontSize(16)
    .fill("#021c27")
    .text("VOUCHER CODE", {
      align: "center",
    });

  jumpLine(doc, 1);

  doc
    .font("fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Your voucher code is:", {
      align: "center",
    });

  jumpLine(doc, 2);

  doc
    .font("fonts/NotoSansJP-Bold.otf")
    .fontSize(24)
    .fill("#021c27")
    .text(`Travel100`, {
      align: "center",
    });

  jumpLine(doc, 1);
  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  doc.font("fonts/NotoSansJP-Light.otf").fontSize(10).fill("#021c27").text(
    // `has successfully completed the ${course} on ${new Date(
    //   Date.now()
    // ).toLocaleDateString()}.`
    `has successfully completed the Best Picture Contest on ${date}. If the above code doesn't work, scan the below QR Code for your voucher code.`,
    {
      align: "center",
    }
  );

  jumpLine(doc, 7);

  doc.lineWidth(1);

  // Signatures
  const lineSize = 154;
  const signatureHeight = 450;

  doc.fillAndStroke("#021c27");
  doc.strokeOpacity(0.2);

  const startLine1 = 208;
  const endLine1 = 198 + lineSize;
  doc
    .moveTo(startLine1, signatureHeight)
    .lineTo(endLine1, signatureHeight)
    .stroke();
  // doc.image("images/xcitedulogo.jpg", startLine1 + 530, 50, {
  //     // fit: [100, 100],
  //     // align: "left",
  //     height: 50,
  //     width: 50,
  // });
  doc.image("images/nancy.jpeg", startLine1 + 20, 350, {
    fit: [maxWidth, maxHeight],
    align: "left",
  });
  doc.image("images/yaamini1.jpeg", startLine1 + 330, 350, {
    fit: [300, 100],
    align: "left",
  });

  const startLine2 = endLine1;
  const endLine2 = startLine2 + lineSize;
  // doc
  //   .moveTo(startLine2, signatureHeight)
  //   .lineTo(endLine2, signatureHeight)
  //   .stroke();

  const startLine3 = endLine2;
  const endLine3 = startLine3 + lineSize;
  doc
    .moveTo(startLine3, signatureHeight)
    .lineTo(endLine3, signatureHeight)
    .stroke();

  doc
    .font("fonts/NotoSansJP-Regular.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Nancy", startLine1, signatureHeight + 0, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });
  doc
    .font("fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text(
      `CEO, TravelBuddy
        `,
      startLine1,
      signatureHeight + 15,
      {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      }
    );

  // doc
  //     .font("fonts/NotoSansJP-Light.otf")
  //     .fontSize(10)
  //     .fill("#021c27")
  //     .text(`certificate id : ${certiId}`, {
  //         align: "left",
  //     });
  // const generateQR = async text => {
  //     try {

  //         const ans = await QRCode.toDataURL(text);
  //         return ans
  //     } catch (err) {
  //         console.log(err);
  //         return 0;
  //     }
  // }
  // const qr = await generateQR(`validate-your-certificate.xcitedu.com/${certiId}`);
  // // console.log("qr", qr);
  // // const logo = await fetchImage("https://i.imgur.com/2ff9bM7.png");
  // doc.image(qr, {
  //     fit: [70, 70],
  //     align: 'left',
  //     // valign: 'center'
  // });
  // jumpLine(doc, 6);

  doc
    .font("fonts/NotoSansJP-Regular.otf")
    .fontSize(10)
    .fill("#021c27")
    .text("Yaamini Shahini", startLine3, signatureHeight + 0, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font("fonts/NotoSansJP-Light.otf")
    .fontSize(10)
    .fill("#021c27")
    .text(
      `MANAGER, TravelBuddy
        `,
      startLine3,
      signatureHeight + 15,
      {
        columns: 1,
        columnGap: 0,
        height: 40,
        width: lineSize,
        align: "center",
      }
    );

  // doc
  //   .font("fonts/NotoSansJP-Light.otf")
  //   .fontSize(10)
  //   .fill("#021c27")
  //   .text(`certificate id : ${certiId}`, 150, 505, {
  //     // align: "left",
  //   });
  const generateQR = async (text) => {
    try {
      const ans = await QRCode.toDataURL(text);
      return ans;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };
  const qr = await generateQR(`Travel100`);
  doc.image(qr, 40, 425, {
    fit: [100, 100],
    align: "left",
    // valign: 'center'
  });

  jumpLine(doc, 6);

  // Validation link
  // const link = "https://validate-your-certificate.hello/validation-code-here";

  // const linkWidth = doc.widthOfString(link);
  // const linkHeight = doc.currentLineHeight();

  // doc
  //     .underline(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, {
  //         color: "#021c27",
  //     })
  //     .link(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, link);

  // doc
  //     .font("fonts/NotoSansJP-Light.otf")
  //     .fontSize(10)
  //     .fill("#021c27")
  //     .text(link, doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight);

  // // Footer
  // doc
  //     .font("fonts/NotoSansJP-Light.otf")
  //     .fontSize(10)
  //     .fill("#021c27")
  //     .text(`id : ${certiId}`, {
  //         align: "right",
  //     });
  const bottomHeight = doc.page.height - 100;

  // doc.image("images/qr.png", doc.page.width / 2 - 30, bottomHeight, {
  //     fit: [60, 60],
  // });

  doc.end();

  const output = `
          <h2>Hi ${name}, Congratulations on completing the event in Best Picture Contest</h2>
        <p>You have successfully completed your event in Best Picture Contest with TravelBuddy. Please find your Voucher code below.</p>
        <h3>Your Details:</h3>
        <ul>
          <li>Name : ${name}</li>
          <li>Email : ${email}</li>
          <li>Event : Best Picture Contest</li>
          <li>Voucher Code : Travel100</li>
        </ul>
        <p>We wish you All the Best for your bright future!</p>
        <p></p>
        <p>Regards</p>
        <p>Team TravelBuddy</p>
      `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "hartiksuhagiya10@gmail.com", // generated ethereal user
      pass: "racxvvknohaekkfj", // generated ethereal password
    },
    // If on localhost
    tls: {
      rejectUnauthorized: false,
    },
    service: "gmail",
  });

  //   // send mail with defined transport object
  let mailOptions = {
    // from: '"Nodemailer Testing" <raj.sanghavi1@svkmmumbai.onmicrosoft.com>', // sender address
    from: "hartiksuhagiya10@gmail.com",
    to: `rajsanghavi9@gmail.com`, // list of receivers
    subject: "Voucher Code for Best Picture", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
    html: output,
    attachments: [
      {
        filename: `${name}_${event}_completion_certificate.pdf`,
        path: `certificates\\${name}_Best Picture Contest_completion_certificate.pdf`,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message of completion sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.status(200).json({
        success: true,
        emailSuccess: true,
        data: req.body,
      });
    }
  });
};

// generatePDF("raj", "REACT COURSE");
module.exports = generatePDF;
