const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/config");
// const Pusher = require('pusher');
// const generatePDF = require("./generatePdf");
var axios = require("axios");
const bodyParser = require("body-parser");
const generatePDF = require("./generatePdf");

const dataRouter = require("./routes/dataRouter");
const userRouter = require("./routes/userRouter");
const programRouter = require("./routes/programRouter");
const phoneCallRoutes = require("./routes/phoneCallRoutes");

const enrollmentRouter = require("./routes/enrollmentyROutes");
// Routes

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

// Connecting to mongodb server
connectDB();


// express application
const app = express();

// Body Parser middleware, no need to install body-parser package
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// allow CORS
app.use(cors());


// Swagger UI
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Buddy Admin Dashboard Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Travel Buddy",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

//Port
const PORT = 8080 || process.env.PORT;

// Certificate
app.post("/sendCertificate", async (req, res) => {
  try {
    const { name, email, event, date } = req.body;
    console.log(name, email, event, date);
    generatePDF(name, email, event, date);
    res.download(`name.pdf`);
    res.status(200).json({
      success: true,
      data: "Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: true,
      data: error,
    });
  }
});

app.use("/data", dataRouter);
app.use("/user", userRouter);
app.use("/program", programRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/phoneCall", phoneCallRoutes);

app.get("/", function (req, res) {
  res.send("StackUnderFlow backend is working");
  console.log("StackUnderFlow backend is working");
});
const server = app.listen(8080, () => {
  console.log(`Server is running on port ${PORT}.`);
});
