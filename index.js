require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongoDb } = require("./config/connectMongo");

const booksRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
connectMongoDb(process.env.MONGO_URL);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/v1", booksRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});