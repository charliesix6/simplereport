import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // usa './' para que los assets se resuelvan correctamente en GH Pages
  plugins: [react()],
});
