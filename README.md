# OAuth-Drive-Upload

## Prerequisits

* NodeJS
* npm

## Dependencies
```javascript
{
    "cookie-session": "^1.3.3",
    "express": "^4.17.1",
    "express-fileupload": "^1.1.6-alpha.5",
    "googleapis": "^43.0.0",
    "nunjucks": "^3.2.0",
    "passport": "^0.4.0",
    "passport-google-oauth20": "^2.0.0"
}
```
## Start Up

### Normal Start up

Follow the steps below

1. `cd` into the directory
2. `npm install`
3. `npm start`

### Makefile

Run `make help` if you require any assistance
Run `make all`

### Run as a container

Run `docker run --env-file="./config.env" -d -p 8000:8000 luqman077/oauth-node:0.2a`
or
Run `make pull_run`

## NOTE

Provided credintials ClientID, Client Key and Callback URL are short lived. In the case the application dint work, Follow the steps below.

1. Create Project in Google Console
2. Enable Drive
3. Allow the following scopes
   - profile
   - email
   - "https://www.googleapis.com/auth/drive.file"

4. Collect your clientID, clientKey and callback URL and export as Environment Variables.
   Edit the config.env file and use either `source config.sh` command or use `make run_prod` to run the server.
5. Run the App.
