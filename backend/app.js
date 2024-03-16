import express from "express";
import catchError from "./middlewares/error.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

//import routes
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);

app.use(catchError);
export default app;
