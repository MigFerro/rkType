import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    proxy: {
      "/words": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      //"/socket.io": {
      //  target: "ws://localhost:3001",
      //  //changeOrigin: true,
      //  ws: true,
      //},
    },
  },
  plugins: [react(), tailwindcss()],
});
