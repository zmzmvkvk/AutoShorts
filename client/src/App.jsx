import React from "react";
import Header from "./components/Header";
import AppRouter from "./routes/Router";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f1e1d] text-[#fdf6ec] font-sans">
      <Header />
      <AppRouter />
    </div>
  );
}
