const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const AWS = require('aws-sdk');

try {
  const lambdaFunctionName = core.getInput('lambda-name');
  const snapShotName = core.getInput('snapshot-name');

  console.log(`Updating Function Name ${lambdaFunctionName} with ${snapShotName}!`);

  var jarFile = fs.readFileSync(`./target/${snapShotName}`);
  core.debug('Package put into memory buffer');

  const lambda = new AWS.Lambda({
      apiVersion: '2015-03-31',
      region: process.env.AWS_REGION,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      maxRetries: 3,
      sslEnabled: true,
      logger: console,
  });

  const params = {
    FunctionName: lambdaFunctionName,
    Publish: true,
    ZipFile: jarFile,
  };

  lambda.updateFunctionCode(params, err => {
      if (err) {
          console.error(err);
          core.setFailed(err)
      }
  });

} catch (error) {
  core.setFailed(error.message);
}
