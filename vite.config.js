import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  //server: {
  //  proxy: {
  //    "/api": {
  //      target: "http://localhost:3000",
  //      changeOrigin: true,
  //    },
  //    "/public": {
  //      target: "http://localhost:3000",
  //      changeOrigin: true,
  //    },
  //  },
  //},
  plugins: [react(), tailwindcss()],
});
