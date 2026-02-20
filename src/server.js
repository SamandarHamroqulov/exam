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

app.use(cors({
  origin: [
    "http://localhost:5173",  
    "http://localhost:5500",    
    "http://127.0.0.1:5500",  
    "http://localhost:3000",
  ],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cookieParser());
app.use("/api", mainRouter);

let PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));