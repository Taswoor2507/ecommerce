import express from "express";
const app = express();

app.use(express.json());

//import routes
import productRouter from "./routes/product.route.js";
app.use("/api/v1", productRouter);
export default app;
