// tailwind.config.js
export const content = ["./index.html", "./src/**/*.{js,jsx}"];
export const theme = {
  extend: {
    colors: {
      forest: "#1a2f2e",
      forestDark: "#0f1e1d",
      sunset: "#e7542b",
      sunsetDark: "#b94523",
      cream: "#fdf6ec",
      stone: "#aaa",
    },
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
      mono: ["'Fira Code'", "monospace"],
    },
  },
};
export const plugins = [];
