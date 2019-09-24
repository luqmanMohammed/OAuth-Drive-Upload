const express = require("express");
const cookie = require("cookie-session");
const path = require("path");
const passport = require("passport");
const nunjucks = require("nunjucks");
const fileupload = require("express-fileupload");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Drive = require("./controllers/DriveController");

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cookie({
    keys: ["secret"]
  })
);
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);
app.use("/static", express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "282383424955-u83ib03o2c2bnfp0os9kk9pmqjtb7hrl.apps.googleusercontent.com",
      clientSecret: "tncvRb4OpNjq2hRi-J7Lgago",
      callbackURL: "http://localhost:8000/ssd/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        accesstoken: accessToken,
        googleID: profile.id,
        name: profile.displayName,
        pic_url: profile._json.picture,
        email: profile._json.email
      };
      done(null, user);
    }
  )
);

const checkLogin = (req, res, next) => {
  if (req.session.passport === undefined || req.session.passport === null)
    res.redirect("/login");
  else next();
};

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "/views/login.html"));
});

app.get("/main", checkLogin, (req, res) => {
  const session = req.session.passport.user;
  if(req.query.status !== undefined && req.query.session !== null){
    res.render(path.join(__dirname, "/views/index.html"), {
      email: session.email,
      name: session.name,
      pic_url:session.pic_url,
      status:req.query.status
    });
  }
  else {
    res.render(path.join(__dirname, "/views/index.html"), {
      email: session.email,
      name: session.name,
      pic_url:session.pic_url
    });
  }
});

app.get("/",(req,res) => res.redirect("/main"));

app.get(
  "/ssd/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/drive.file", "profile", "email"]
  })
);

app.get(
  "/ssd/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/main",
    failureRedirect: "/login"
  })
);

app.get("/ssd/auth/google/loggout", (req,res) => {
  req.logout();
  req.session.passport = undefined;
  res.redirect("/");
})
app.post("/ssd/file/upload", checkLogin, Drive.upload);

app.listen(8000, () => {
    console.log("Server Started");
  });
  