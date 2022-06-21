const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const secret = require('./secret')

const bucketName = (process.env.AWS_BUCKETNAME || secret.secrets.AWS_BUCKETNAME);
const region = (process.env.AWS_REGION || secret.secrets.AWS_REGION);
const accessKeyId = (process.env.AWS_ACCESS_CODE || secret.secrets.AWS_ACCESS_CODE);
const secretAccessKey = (process.env.AWS_SECRET_ACCESS_CODE || secret.secrets.AWS_SECRET_ACCESS_CODE);
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  try{
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise();
}
catch(err){
  console.log(err)
}
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  try{
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream();
}
catch(err){
  console.log(err);
}
}
exports.getFileStream = getFileStream