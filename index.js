const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const AWS = require('aws-sdk');

try {
  const lambdaFunctionName = core.getInput('lambda-name');
  const snapShotName = core.getInput('snapshot-name');
  const AWS_ACCESS_KEY_ID = core.getInput('AWS_ACCESS_KEY_ID');
  const AWS_SECRET_ACCESS_KEY = core.getInput('AWS_SECRET_ACCESS_KEY');
  const AWS_REGION = core.getInput('AWS_REGION');

  console.log(`Updating Function Name ${lambdaFunctionName} with ${snapShotName}!`);

  var jarFile = fs.readFileSync(`./target/${snapShotName}`);
  core.debug('Package put into memory buffer');

  const lambda = new AWS.Lambda({
      apiVersion: '2015-03-31',
      region: AWS_REGION,
      secretAccessKey: AWS_ACCESS_KEY_ID,
      accessKeyId: AWS_SECRET_ACCESS_KEY,
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
