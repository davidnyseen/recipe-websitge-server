const express = require('express')
const jwt = require('jsonwebtoken');
var im = require('imagemagick');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../s3')

module.exports.getImage_get = (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res);
}

const convert = (file) => {
  im.resize({
    srcPath: file,
    dstPath: 'kittens-small.jpg',
    width:   256
  }, function(err, stdout, stderr){
    if (err) console.log(err);;
  });
    console.log('resized kittens.jpg to fit within 256x256px');
}

module.exports.submitNewImage_post = async (req, res) => {
  const file = req.file;
  // convert(file.originalname);
  console.log(file)
  // convert(file);
  // apply filter  
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  // console.log(result)
  const description = req.body.description
  res.send({imagePath: `http://localhost:5000/getImage/${result.Key}`}).status(201);
}
// every time we post a image we return a link to the image on aws
