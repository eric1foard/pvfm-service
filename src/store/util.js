//FEATURED VENDOR STORE
const Promise = require('bluebird');
const fs = require('fs');
const AwsCreds = require(`${__dirname}/../../aws-config.js`);
const AWS = require('aws-sdk');//.config.loadFromPath(`${__dirname}/../../aws-config.json`); // load credentials

// initialize AWS with credentials
const initAWS = () => {
  const accessKeyId = AwsCreds.accessKeyId;
  const secretAccessKey = AwsCreds.secretAccessKey;
  AWS.config.update({
    accessKeyId,
    secretAccessKey
  });
};

// utility function for reading from json file
const get = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      const json = parseJSON(data);
      if (json.error) {
        return reject(json.error);
      }
      if (err) {
        return reject(err);
      }
      return resolve(json.data);
    });
  });
};

// utility function for writing to json file
const setProp = (filepath, key, value) => {
  if (key === null) { // key not specified; replace whole object
    return new Promise((resolve, reject) => {
      return writeJSON(filepath, value, resolve, reject);
    });
  }
  return new Promise((resolve, reject) => { // key specified; set only that property
    fs.readFile(filepath, (err, data) => {
      const json = parseJSON(data);
      if (json.error) {
        return reject(json.error);
      }
      if (err) {
        return reject(err);
      }
      json.data[key] = value;
      return writeJSON(filepath, json.data, resolve, reject);
    });
  });
};

// upload photo and return image url
const uploadPhoto = (imageName, imageFile) => {
  return new Promise((resolve, reject) => {
    const bucketName = 'portola-valley-farmers-market';
    const s3Bucket = new AWS.S3({ params: { Bucket: bucketName } });
    const data = { Key: imageName, Body: imageFile };
    s3Bucket.putObject(data, (err, data) => {
      if (err) {
        console.log('error uploading photo ',err);
        return reject(err);
      }
      console.log('succesfully uploaded the image!');
      return resolve(getPhoto(s3Bucket, imageName));
    });
  });
};

// return url of photo or null if image not found or error
const getPhoto = (imageName) => {
  return `http://s3-us-west-1.amazonaws.com/portola-valley-farmers-market/${imageName}`;
};

const parseJSON = (data) => {
  let result;
  try {
    const json = JSON.parse(data); // syncronous
    result = { data: json, error: null };
  }
  catch(e) {
    result = { data: null, erorr: e.message };
  }
  finally {
    return result;
  }
};

const writeJSON = (filepath, data, promiseResolve, promiseReject) => {
  return fs.writeFile(filepath, JSON.stringify(data), (error) => {
    if (error) {
      return promiseReject(error);
    }
    return promiseResolve(data);
  });
};

module.exports = {
  get,
  setProp,
  uploadPhoto,
  getPhoto,
  initAWS
};
