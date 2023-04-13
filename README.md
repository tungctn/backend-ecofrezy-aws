# lambda-expressjs

A demo backend for a serverless express app in AWS Lambda

How to deploy to AWS Lambda?

Ensure you have SAM installed and configured: https://aws.amazon.com/serverless/sam/

Then simply run

```
sam build
```

Then:

```
sam deploy -g
```

For subsequent builds use:

```
sam build && sam deploy
```

Enjoy your Serverless express app in AWS Lambda
