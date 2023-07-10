import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.VITE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      "/api": {
        target: `${
          process.env.VITE_ENV == "development"
            ? "http://localhost:5000"
            : "https://testtask-server.onrender.com/"
        }`,
        changeOrigin: true,
      },
    },
  },
});
