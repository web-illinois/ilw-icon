import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    build: {
        outDir: "../dist",
        lib: {
            name: "ilw-icon",
            entry: "ilw-icon.js",
            fileName: "ilw-icon",
            formats: ["es"],
        },


        rollupOptions: {
            output: {
                assetFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "style.css") return "ilw-icon.css";
                },
            },
        },
    },
    server: {
        hmr: false,
    },
});
