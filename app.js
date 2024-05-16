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
app.use(cors({origin: '*'}));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
