import app from "./app.js";
import dotenv from "dotenv";

// configure dotenv
dotenv.config({
  path: "backend/config/.env",
});
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
