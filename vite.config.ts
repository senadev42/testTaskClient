import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

console.log("Running in " + process.env.VITE_ENV);

const apiTarget = process.env.API_TARGET || "http://localhost:5000";

console.log("Connected to " + apiTarget + " as API");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
});
