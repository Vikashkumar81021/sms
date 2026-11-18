import dotenv from "dotenv";
import express from "express";
import prisma from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import schoolRoute from "./routes/school.route.js";
import  academicSession  from "./routes/academicSession.route.js"; 
import classRoute from "./routes/class.route.js";
import sectionRoute from "./routes/section.route.js";
import subjectRoute from "./routes/subject.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", sectionRoute);
app.use("/api/v1", schoolRoute);
app.use("/api/v1", academicSession);
app.use("/api/v1",classRoute);
app.use("/api/v1", subjectRoute);


app.get("/", (req, res) => {
  res.send("School Management API is running!");
});

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "Server and database are working!",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
