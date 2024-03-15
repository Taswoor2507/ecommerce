import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//unhandled exception handled
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Server is close due to --> ${err}`);
  process.exit(1);
});

// configure dotenv
dotenv.config({
  path: "backend/config/.env",
});

//connect db
connectDB();

const PORT = process.env.PORT || 3030;
const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// unhandled promise rejection error handled -->
process.on("unhandledRejection", (err) => {
  console.log(`Error : |${err.message}`);
  console.log(`Server is closed due to unhandled promise rejection`);
  server.close();
  process.exit(1);
});
