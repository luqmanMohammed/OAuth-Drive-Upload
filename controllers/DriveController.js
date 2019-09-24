const fs = require("fs");
const { google } = require("googleapis");

class DriveController {
  constructor() {}

  upload({ files, session }, res) {
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const accessToken = session.passport.user.accesstoken;
    const googleOAuthClient = new google.auth.OAuth2();
    googleOAuthClient.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: "v3", auth: googleOAuthClient });

    const uploadedFile = files.to_drive_file;
    const { name, tempFilePath, mimetype } = uploadedFile;

    const uploadMedia = {
      mimeType: mimetype,
      body: fs.createReadStream(tempFilePath)
    };

    drive.files.create(
      {
        resource: {
          name
        },
        media: uploadMedia,
        fields: "id"
      },
      err => {
        if (err) {
            res.redirect("/main?status=failed");
        } else {
            res.redirect("/main?status=success");
        }
      }
    );
  };
}

module.exports = new DriveController();