const express = require("express");
const multer = require("multer");
const cors = require('cors');
const router = express.Router();
const Application = require('../models/UserApplication');
const app = express();


app.use(cors());

const upload = multer();

router.post('/register', upload.fields([{ name: 'frontImage' }, { name: 'backImage' }, { name: 'passportSizePhoto' }]), async (req, res) => {
    const applicationData = { ...req.body };

    // If images are uploaded, convert the files to Buffer
    if (req.files) {
        if (req.files.frontImage && req.files.frontImage.length > 0) {
            // Convert Buffer to Base64 string
            applicationData.frontImage = `data:${req.files.frontImage[0].mimetype};base64,${req.files.frontImage[0].buffer.toString('base64')}`;
        }

        if (req.files.backImage && req.files.backImage.length > 0) {
            // Convert Buffer to Base64 string
            applicationData.backImage = `data:${req.files.backImage[0].mimetype};base64,${req.files.backImage[0].buffer.toString('base64')}`;
        }

        if (req.files.passportSizePhoto && req.files.passportSizePhoto.length > 0) {
            // Convert Buffer to Base64 string
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

        // Convert passportSizePhoto from Buffer to base64
        const applicationData = applications.map(app => ({
            id: app._id,
            fullName: app.fullName,
            email: app.email,
            phoneNumber: app.phoneNumber,
            occupation: app.occupation,
            passportSizePhoto: app.passportSizePhoto ? app.passportSizePhoto.toString('base64') : null, // Convert to Base64
        }));

        res.status(200).json(applicationData);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: 'Error fetching applications', error });
    }
});


router.get("/applicant-detail/:id", async (req, res) => {
    try {
      const user = await Application.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });

module.exports = router;
