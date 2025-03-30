const express = require("express");
const multer = require("multer");
const cors = require('cors');
const router = express.Router();
const Application = require('../models/UserApplication');
const app = express();

app.use(cors());

const upload = multer();

// Function to generate an 8-digit numeric UUID
const generateUUID = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();  // Generates a number between 10000000 and 99999999
};

router.post('/register', upload.fields([{ name: 'frontImage' }, { name: 'backImage' }, { name: 'passportSizePhoto' }]), async (req, res) => {
    const applicationData = { ...req.body };

    // Assign 8-digit UUID to user
    applicationData.userUUID = generateUUID();

    // If images are uploaded, convert the files to Base64
    if (req.files) {
        if (req.files.frontImage && req.files.frontImage.length > 0) {
            applicationData.frontImage = `data:${req.files.frontImage[0].mimetype};base64,${req.files.frontImage[0].buffer.toString('base64')}`;
        }
        if (req.files.backImage && req.files.backImage.length > 0) {
            applicationData.backImage = `data:${req.files.backImage[0].mimetype};base64,${req.files.backImage[0].buffer.toString('base64')}`;
        }
        if (req.files.passportSizePhoto && req.files.passportSizePhoto.length > 0) {
            applicationData.passportSizePhoto = `data:${req.files.passportSizePhoto[0].mimetype};base64,${req.files.passportSizePhoto[0].buffer.toString('base64')}`;
        }
    }

    try {
        const application = new Application(applicationData);
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully!', application });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Error submitting application', error });
    }
});

router.get('/allApplicants', async (req, res) => {
    try {
        const applications = await Application.find();

        const applicationData = applications.map(app => ({
            id: app._id,
            userUUID: app.userUUID,  // Return userUUID
            fullName: app.fullName,
            email: app.email,
            phoneNumber: app.phoneNumber,
            occupation: app.occupation,
            cityOfBirth:app.cityOfBirth,
            passportSizePhoto: app.passportSizePhoto ? app.passportSizePhoto.toString('base64') : null,
        }));

        res.status(200).json(applicationData);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: 'Error fetching applications', error });
    }
});

router.get("/applicant-detail/:uuid", async (req, res) => {
    try {
        const user = await Application.findOne({ userUUID: req.params.uuid });  // Find user by 8-digit UUID
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.get("/user-detail/:uid", async (req, res) => {
    const { uid } = req.params; // Correct parameter name: `uid` instead of `uuid`
    try {
      const user = await Application.findOne({ userUUID: uid }); // Correctly search by `uid`
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user); // Return user data if found
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  

module.exports = router;
