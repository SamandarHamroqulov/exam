require("dotenv").config();
const express = require("express");
const dbconnection = require("./lib/db.service");
const mainRouter = require("./routers/main.routes");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

dbconnection().catch(() => process.exit(1));
const app = express();

app.use(fileUpload({
    createParentPath: true
}));

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // Postman/curl
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true,
}));
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cookieParser());
app.use("/api", mainRouter);
app.use(express.static(path.join(process.cwd(), "frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "car-marketplace (5).html"));
});


let PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
