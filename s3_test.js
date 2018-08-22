var AWS = require('aws-sdk');
require('dotenv').config()
var fs = require('fs');
var re = /(\d+)(_)(\d+)/g;


var albumBucketName = process.env.ALBUM_BUCKET_NAME;
var bucketRegion = process.env.BUCKET_REGION;
var IdentityPoolId = process.env.IDENTITY_POOL_ID;
var URL = process.env.URL;

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});

// ListBuckets()//Call Method

module.exports = {
    "ListBuckets": function (callback) {
        var params = {
          Bucket: albumBucketName, /* required */
          FetchOwner: false,
          MaxKeys: 5000, //Play with this and Next Tokens
          Prefix: 'supervised_training'
        };
      
        s3.listObjectsV2(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          data.Contents.splice(0, 1);
          var clusterIndex = [];
          dataArray = [];
          images = [];
          var name = null;
          data.Contents.forEach((element, i) => {
              element.Key.replace(re, (match, p1, p2, p3) => {
                  clusterIndex.push(p1);
              })
          })
          var uniqueClusterIndex = clusterIndex.filter((v, i, a) => a.indexOf(v) === i);
          uniqueClusterIndex.forEach((id) => {
              name = "cluster" + id;
              images = [];
              data.Contents.forEach((element, i) => {
                  element.Key.replace(re, (match, p1, p2, p3) => {
                      if (p1 == id) {
                          var imageURL = URL + element.Key;
                          images.push(imageURL);
                      }
                  })
              })
              dataArray.push({
                  'name': name,
                  'images': images
              })
              if(uniqueClusterIndex.length == dataArray.length) {
                var value = {
                    "data": dataArray
                }
                value = JSON.stringify(value);
                fs.writeFile("./untagged_values.json", value, function(err) {
                    if(err) {
                        console.log(err);
                    }

                    console.log("The file was saved!");
                }); 
                  callback(null, dataArray);
              }
          })
        });
      },
      "listBucketElements": function(callback) {
        var params = {
            Bucket: albumBucketName, /* required */
            FetchOwner: false,
            MaxKeys: 5000, //Play with this and Next Tokens
            Prefix: 'supervised_training'
          };
        
          s3.listObjectsV2(params, function(err, data) {
            callback(null, data);
          })
      }
}
