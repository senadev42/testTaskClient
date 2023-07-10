import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//enviroment variables
import dotenv from "dotenv";
dotenv.config();

console.log("Running in " + process.env.VITE_ENV + " mode.");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
