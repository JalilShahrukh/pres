const DataPair = require('data-pair-server');
const express = require('express'); 
const AWS = require('aws-sdk');
const http = require('http'); 
const app = module.exports.app = express();

const server = http.createServer(app)

DataPair(server, 1);

app.get('/images', (req, res) => { 
  // Request to AWS 
  AWS.config.update( 
    { 
      accessKeyId: 'AKIAJJ5VR4XHTWWWDP2A', 
      secretAccessKey: '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'
    }
  );

  var bucket = new AWS.S3({params: {Bucket: 'jalilbu'}});

  var images = []; 
  bucket.listObjects(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      for(let i = 1; i < data.Contents.length; i++) { 
        images.push('https://s3-us-west-2.amazonaws.com/' + bucket.config.params.Bucket + '/' + data.Contents[i].Key);
      }
    }
  res.status(200).send(images); 
  });
});

app.listen(5000, () => { 
  console.log('Listening on port 5000'); 
});