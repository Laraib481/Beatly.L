const express = require("express");
const musicController = require('../controllers/music.controllers');
const authMiddleware = require("../middlewares/auth.middlewre");
const multer = require('multer');


const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
})
router.post("/upload", authMiddleware.authArtist, upload.fields([
    {
        name: "music",
        maxCount: 1,
    },
    {
        name: "cover",
        maxCount: 1,
    },
]), musicController.createMusic);

router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

router.get("/", musicController.getAllMusics)


module.exports = router;