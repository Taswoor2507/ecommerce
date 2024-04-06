import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Update the target URL to match your backend server
      "/api": "http://localhost:4040",
    },
  },
});
