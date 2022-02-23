const express = require('express')

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../s3')

const app = express()

module.exports.getImage_get = (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res);
}

module.exports.submitNewImage_post = async (req, res) => {
  const file = req.file
  // console.log(file)

  // apply filter  
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  // console.log(result)
  const description = req.body.description
  res.send({imagePath: `http://localhost:5000/getImage/${result.Key}`}).status(201);
}
// every time we post a image we return a link to the image on aws
