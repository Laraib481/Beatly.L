// const { ImageKit } = require('@imagekit/nodejs');

// const ImageKitClient = new ImageKit({
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
// })

// async function uploadFile(file) {
    
//     const result = await ImageKitClient.upload({
//         file,
//         fileName: "music_" + Date.now(),
//         folder: "yt-complete-backend/music"
//     })
//     return result;
// }

// module.exports = {uploadFile};



// const { ImageKit } = require("@imagekit/nodejs");
const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  try {
    const result = await imagekit.upload({
      file: file,
      fileName: `music_${Date.now()}`,
      folder: "/yt-complete-backend/music",
    });

    return result;
  } catch (error) {
    console.log("ImageKit Upload Error:", error);
    throw error;
  }
}

module.exports = { uploadFile };

// const { ImageKit } = require("@imagekit/nodejs");

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

// // console.log("imagekit =", imagekit);
// // console.log("keys =", Object.keys(imagekit));
// console.log(Object.keys(imagekit.files));