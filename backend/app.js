import express from "express";
import catchError from "./middlewares/error.js";
import cookieParser from "cookie-parser";
// import cors from "cors";
const app = express();
// const corsOptions = {
//   origin: " http://localhost:5173/", // Change this to your frontend URL
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//import routes
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

app.use(catchError);
export default app;
