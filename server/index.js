const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// ✅ DB Connect
database.connect();

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ FIXED CORS (IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local frontend
      "https://acadly-blue.vercel.app" // your deployed frontend
    ],
    credentials: true,
  })
);

// ✅ File Upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// ✅ Cloudinary
cloudinaryConnect();

// ✅ Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});
app.use(express.json());
// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});