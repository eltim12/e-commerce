require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

mongoose.connect(`mongodb+srv://eltim:${process.env.MONGO_PASSWORD}@cluster0-sfchz.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

//for user
app.use("/users", userRoutes);
app.use("/products", productRoutes);

module.exports = app;
app.listen(port, () => console.log("listening on port" + port));
