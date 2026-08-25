const cookieParser = require("cookie-parser");
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.services");
const jwt = require('jsonwebtoken');


async function createMusic(req, res) {
  try {
    const { title } = req.body;

    const musicFile = req.files.music[0];
    const coverFile = req.files.cover[0];

    console.log(req.body); /// temprery
    console.log(req.files);

    // Upload music
    const musicResult = await uploadFile(
      musicFile.buffer.toString("base64")
    );

    // Upload cover image
    const coverResult = await uploadFile(
      coverFile.buffer.toString("base64")
    );

    const music = await musicModel.create({
      title,
      uri: musicResult.url,
      coverImage: coverResult.url,
      artist: req.user.id,
    });

    res.status(201).json({
      message: "Music uploaded successfully",
      music,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function createAlbum(req, res) {

  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics
  })
  res.status(201).json({
    messege: "album create successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    }
  })

}

async function getAllMusics(req, res) {

  const musics = await musicModel.find().limit(20).populate("artist", "username email")

  res.status(200).json({
    message: "Musics featched successfully",
    musics: musics,
  })

}

async function getMyMusics(req, res) {
  try {
    const musics = await musicModel
      .find({ artist: req.user.id })
      .populate("artist", "username email");

    res.status(200).json({
      message: "Artist musics fetched successfully",
      musics,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function deleteMusic(req, res) {
  try {
    const { id } = req.params;

    const music = await musicModel.findOne({
      _id: id,
      artist: req.user.id,
    });

    if (!music) {
      return res.status(404).json({
        message: "Music not found or you are not allowed to delete it",
      });
    }

    await musicModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Music deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports = { createMusic, createAlbum, getAllMusics, getMyMusics, deleteMusic,};