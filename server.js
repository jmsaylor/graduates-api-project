const express = require("express");
const app = express();
const grads = require("./routes/api/grads");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("cors");

dotenv.config();
const password = process.env.password;

mongoose
  .connect(
    `mongodb+srv://dino:${password}@cluster0-c4ci4.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("CONNECTED! SUCCESS!"))
  .catch(err => console.log("Error - Not Connected - Error", err));

app.use(express.static("public"));

app.use(express.json());
app.use(express.json({ extended: false }));

app.use("/api/grads", grads);

const port = 3000;

try {
  app.listen(port, () => console.log(`listening on ${port}`));
} catch (error) {
  console.error(error);
}
