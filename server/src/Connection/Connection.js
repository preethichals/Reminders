//Required And connections;
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true,})
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch((error) => {
    console.log(error);});
