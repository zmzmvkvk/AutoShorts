require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const shortsRouter = require("./routes/shorts");
app.use("/api/shorts", shortsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🔥 Server running on http://localhost:${PORT}`)
);
