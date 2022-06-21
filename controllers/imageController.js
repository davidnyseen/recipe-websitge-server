const jwt = require('jsonwebtoken');
var im = require('imagemagick');
const sharp = require('sharp');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../s3')
let outputImage = 'resized-image.jpg';

module.exports.getImage_get = (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res);
}

const convert = (file) => {
// file name of the resized image
sharp(file).resize({height:300,width:300}).toFile(outputImage)
.then(function(newFileInfo){
})
.catch(function(err){
	console.log("Got Error resing image");
})
}

module.exports.submitNewImage_post = async (req, res) => {
  try{
    const file = req.file;

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  // console.log(result)
  //https://recipe-website-server.herokuapp.com
  const description = req.body.description
  //res.send({imagePath: `http://localhost:5000/getImage/${result.Key}`}).status(201);
  res.send({imagePath: `  //https://recipe-website-server.herokuapp.com
  /getImage/${result.Key}`}).status(201);

}
  catch(err){
console.log(err);
  }
  
}
// every time we post a image we return a link to the image on aws
