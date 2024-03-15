import express from "express";
import catchError from "./middlewares/error.js";
const app = express();

app.use(express.json());

//import routes
import productRouter from "./routes/product.route.js";

app.use("/api/v1", productRouter);

app.use(catchError);
export default app;
