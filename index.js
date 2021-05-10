const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//niezj usunac
//const bodyParser = require("body-parser");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server uruchomiony na porcie: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
//nizej usunac
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
//console.log(process.env.mongoURI);
// connect to mongoDB

mongoose.connect(
  process.env.mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Polaczono z baza MongoDB");
  }
);

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/score", require("./routers/scoreRouter"));
app.use("/admin", require("./routers/adminRouter"));
app.use("/music", require("./routers/musicRouter"));
app.use("/adminMusic", require("./routers/adminMusicRouter"));
