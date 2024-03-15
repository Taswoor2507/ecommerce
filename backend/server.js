import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// configure dotenv
dotenv.config({
  path: "backend/config/.env",
});

//connect db
connectDB();

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
