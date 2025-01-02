const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const {restrictToLoggedInUsersOnly,checkAuth}=require('./middlewares/auth')

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute=require('./routes/user');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("Connected to MongoDB");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", restrictToLoggedInUsersOnly,urlRoute);
app.use('/user',checkAuth,userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
    return res.status(404).send("Short URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
