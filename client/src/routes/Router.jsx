import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ShortsResult from "../pages/ShortsResult";
import Channels from "../pages/Channels";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shorts" element={<ShortsResult />} />
      <Route path="/channels" element={<Channels />} />
    </Routes>
  );
}
