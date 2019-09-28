const env = {
    NODE_ENV : process.env.NODE_ENV || "devolopment",
    PORT : process.env.PORT || 8000,
    CLIENT_ID : process.env.CLIENT_ID || "282383424955-u83ib03o2c2bnfp0os9kk9pmqjtb7hrl.apps.googleusercontent.com",
    CLIENT_SECRET : process.env.CLIENT_SECRET || "tncvRb4OpNjq2hRi-J7Lgago",
    CALLBACK_URL : process.env.CALLBACK_URL || "http://localhost:8000/ssd/auth/google/callback",
    COOKIE_SECRET : "very_secret",
}

const callbackArr = env.CALLBACK_URL.split("/");
let callbackendpoint = callbackArr.reduce((pre,cur,index)=>{
    if(index < 3)
        return "";
    else
        return pre + "/" + cur;
})

env["CALLBACK_URL_ENDPOINT"] = callbackendpoint;

module.exports = env;