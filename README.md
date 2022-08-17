# AWS Lambda Update Jar/zip

[![GitHub](https://img.shields.io/github/license/asafmaoz1234/aws-lambda-update-jar-action)](https://opensource.org/licenses/MIT)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/asafmaoz1234/aws-lambda-update-jar-action)](https://github.com/asafmaoz1234/aws-lambda-update-jar-action/releases)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/asafmaoz1234/aws-lambda-update-jar-action/v1)](https://github.com/asafmaoz1234/aws-lambda-update-jar-action/actions)

This action updates a given lambda that runs java projects.
This action packages your project jar and directly updates your aws lambda.

## Usage

### minimum

```yaml
uses: asafmaoz1234/aws-lambda-update-jar-action@v1
with:
  lambda-name: 'lambda-name-to-update'
  snapshot-name: 'projectName-artifactId.jar'
```

### complete

```yaml
uses: asafmaoz1234/aws-lambda-update-jar-action@v1
with:
  lambda-name: 'lambda-name-to-update'
  snapshot-name: 'projectName-artifactId.jar'
  AWS_REGION: ${{ secrets.AWS_REGION }}
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## AWS Permissions needed
 - IAM user (prefebly not your root user) with (at least) lambda write permission (example - `"AWSLambdaRole"` policy attached)
 - Lambda updated with AWSLambdaRole `"lambda:UpdateFunctionCode"` permission for the user.


## Inputs

### `snapshot-name`

**Required**. The jar location, required argument of this action.

### `lambda-name`

**Required**. The lambda name, required argument of this action.

### `AWS_REGION`

_Optional_, if not specified fallbacks to environment variable.

### `AWS_ACCESS_KEY_ID`

_Optional_, if not specified fallbacks to environment variable.

### `AWS_SECRET_ACCESS_KEY`

_Optional_, if not specified fallbacks to environment variable.
