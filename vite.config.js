import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mise_frontend/",
  server: {
    port: 3000,
  },
});
