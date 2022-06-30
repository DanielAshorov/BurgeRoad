import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 443,
      //protocol: "ws",
      //clientPort: 3000,
      // host: "https://burgeroad.azurewebsites.net" || "https://burgerroad-be.azurewebsites.net",
    },
    // hmr: false,
  },
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),
  ],
  base: "/",
});
