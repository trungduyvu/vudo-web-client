/* eslint-disable no-console */

// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
// eslint-disable-next-line import/no-extraneous-dependencies
import s3 from 's3';

import fs from 'fs'; // from node.js
import path from 'path'; // from node.

/**
 * Invalidate index.html and / from a cloudfront distribution given distribution id
 * @param cloudFrontId
 * @returns {Promise<void>}
 */
const invalidateCloudFront = async (cloudFrontId) => {
  const CloudFront = new AWS.CloudFront();
  const params = {
    DistributionId: cloudFrontId,
    InvalidationBatch: {
      CallerReference: (new Date()).toString(),
      Paths: {
        Quantity: 2,
        Items: [
          '/index.html',
          '/',
        ],
      },
    },
  };
  try {
    await CloudFront.createInvalidation(params).promise();
  } catch (error) {
    console.log(error, error.stack);
  }
};

/**
 * Deploy all content in dist folder to a given s3 bucket and
 * invalidate index.html & / from a cloudfront distribution
 * @param bucket - Name of s3 bucket
 * @param cloudfrontDist - ID of cloudfront distribution
 * @returns {Promise<void>}
 */
const deploy = async ({ bucket, cloudfrontDist }) => {
  // configuration
  const config = {
    s3BucketName: bucket,
    folderPath: '../dist', // path relative script's location
  };

  // initialize S3 client
  const s3Client = s3.createClient({
    s3Client: new AWS.S3(),
  });

  // resolve full folder path
  const distFolderPath = path.join(__dirname, config.folderPath);

  // get of list of files from 'dist' directory
  fs.readdir(distFolderPath, (err, files) => {
    if (!files || files.length === 0) {
      console.log(`provided folder '${distFolderPath}' is empty or does not exist.`);
      console.log('Make sure your project was compiled!');
      return;
    }

    // for each file in the directory
    files.forEach((fileName) => {
      // get the full path of the file
      const filePath = path.join(distFolderPath, fileName);

      // ignore if directory
      if (fs.lstatSync(filePath).isDirectory()) {
        return;
      }

      const params = {
        localFile: filePath,

        s3Params: {
          Bucket: config.s3BucketName,
          Key: fileName,
          ACL: 'public-read',
          // other options supported by putObject, except Body and ContentLength.
          // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        },
      };

      const uploader = s3Client.uploadFile(params);
      uploader.on('error', (uploadError) => {
        console.error('unable to upload:', uploadError.stack);
      });
      uploader.on('progress', () => {
        console.log(
          'progress', uploader.progressMd5Amount,
          uploader.progressAmount, uploader.progressTotal,
        );
      });
      uploader.on('end', async () => {
        console.log(`Successfully uploaded '${fileName}'!`);
        if (fileName === 'index.html') {
          await invalidateCloudFront(cloudfrontDist);
        }
      });
    });
  });
};

deploy({ bucket: process.argv[2], cloudfrontDist: process.argv[3] });

