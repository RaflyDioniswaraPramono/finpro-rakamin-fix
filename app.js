require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT;

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
