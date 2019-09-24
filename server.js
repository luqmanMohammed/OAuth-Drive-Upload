const express = require("express");
const cookie = require("cookie-session");
const app = express();
const path = require("path");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const nunjucks = require("nunjucks");
const fileupload = require("express-fileupload");

app.use(passport.initialize());
app.use(passport.session());    
app.use(cookie({
    keys:["secret"]
}));

app.use(fileupload());
passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "282383424955-u83ib03o2c2bnfp0os9kk9pmqjtb7hrl.apps.googleusercontent.com",
    clientSecret: "tncvRb4OpNjq2hRi-J7Lgago",
    callbackURL: "http://localhost:8000/ssd/auth/google/callback"
  },(accessToken, refreshToken, profile, done) => {
    const user = {
        "accesstoken": accessToken,
        'googleID': profile.id,
        'name': profile.displayName,
        'pic_url': profile._json.picture,
        'email': profile._json.email
    }
    done(null,user)
  }
));

const checkLogin = (req,res,next) => {
    console.log(req.files);
    if(req.session.passport === undefined || req.session.passport === null )
        res.redirect("/")
    else
        next()
}

app.use("/static",express.static("public"))

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.listen(8000, () => {
    console.log("Server Started")
});

app.get('/', (req,res) => {
    res.render(path.join(__dirname,"/views/index.html"));
});

app.get("/main",checkLogin,(req,res) => {
    const session = req.session.passport.user;
    console.log(session);
    res.render(path.join(__dirname,"/views/upload.html"),{
        email: session.email
    });
})

app.get('/ssd/auth/google',passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/drive.file",'profile','email'] }));

app.get('/ssd/auth/google/callback',passport.authenticate('google',{ successRedirect : "/main" , failureRedirect : "/" }));

app.post('/ssd/file/upload',checkLogin,(req,res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let uploadedFile = req.files.file;
    
      // Use the mv() method to place the file somewhere on your server
      uploadedF.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });
    res.send();
})