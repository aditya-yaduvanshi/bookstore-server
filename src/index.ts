import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import connectDb from "@/config/db";
import swaggerOptions from "@/config/swagger";
import { isAuth } from "@/middlewares/auth";
import authRouter from "@/routes/auth.route";
import booksRouter from "@/routes/books.route";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (_req, res) => {
  res.send("Hello from server!");
});

// swagger api docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

// api routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", isAuth, booksRouter);

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
  connectDb();
});

// prevent nodejs server from stopping in case of runtime exceptions or rejections
process.on("uncaughtException", (err) => {
  console.log("uncaughtException: ", err);
});
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection: ", err);
});
