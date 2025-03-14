const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

// from Jay branch

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

connectToMongoDB(MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).send("URL not found");
  }
  return res.redirect(entry.redirectURL);
});

// port is in .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
