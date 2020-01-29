# AWS resources not managed by Amplify

Create manually in the AWS Console.

## SNS

In the same zone where amplify is configured: create SNS topics;

- SiteAdmin: **merchacha-dev-siteadmin**  (leave all optional fields at default values).

Note ARN of the format "arn:aws:sns:us-west-2:692387282546:merchacha-dev-siteadmin".

## SES

SES -> Identity Management, add and verify an email address (from-sender).

**IMPORTANT**: the same verified email must be the from-address in lambda source (index.js). By default (sandbox mode), recepients must be verified addresses as well; for production follow request [procedure](https://stackoverflow.com/questions/37528301/send-test-email-fails-with-email-address-is-not-verified).

## Secret Manager

- `merch/services/ASI` with `CLIENT` and `SECR` key-value pairs for ASI API authentication. Disable secret rotation, **include ARN** for this secret in Admin Queries lambda source (`customQueries.js`).

Update Amplify services relying on saved secrets with the corresponding ARN strings.


# Amplify functions

Note: GraphQL schema includes fields calling the functions below. Update API if needed: **make sure** selected function names (below) match `@function`-resolvers in GraphQL API `schema.graphql`.

## SNS, SES from GraphQL

`amplify add function` (if editing settings: `amplify update function`; if needing to delete and add again, `amplify remove function`).

? Provide a friendly name for your resource to be used as a label for this category in the project:
merchachadev7messaging

? Provide the AWS Lambda function name:
merchachadev7messaging

? Choose the function template that you want to use:
Hello world function

? Do you want to access other resources created in this project from your Lambda function?
No

? Do you want to edit the local lambda function now? (Y/n) Y
edit index.js, **include ARN** for SNS in `sns_arn_siteadmin` and from-address for SES in `ses_from_email` variables.

Add dependencies in `amplify/backend/function/merchachadev7messaging/src/`:
`npm i --save nodemailer`

(Alternatively, copy `package.json` with dependencies to `/src/`).

`amplify function build`

Edit event.json with example arguments and test locally:
`amplify function invoke merchachadev7messaging`

NOTE: Region not being set error is fine locally (it is set in the AWS execution environment). Just verify no syntax errors etc. with the local run.

### Enabling required permissions

Lambda's IAM execution role must be able to publish to SNS and send emails through SES. Edit `amplify/backend/function/merchachadev7messaging/merchachadev7messaging-cloudformation-template.json` that was automatically created: find the `lambdaexecutionpolicy` part, `Statement` array that has a single element for `logs:CreateLogGroup` etc.; include more Statement-array entries:

```
{
							"Effect": "Allow",
							"Action": [
								"sns:Publish"
							],
							"Resource": "arn:aws:sns:*:*:*"
},
{
							"Effect": "Allow",
							"Action": [
								"ses:*"
							],
							"Resource": "*"
}
```

NOTE: Editing that template seems to be the [recommended](https://github.com/aws-amplify/amplify-cli/issues/1019) way of adding permissions to lambdas managed by Amplify.

After the final `amplify push`, verify that the lambda in console shows added permissions in the graphical Designer-display. Create a lambda test event from `event.json` content and test in the AWS Console verifying that the messaging happens returning `true`.

## Backend-authenticated GraphQL operations

Used in cases when client `@auth` status should not allow operations, e.g. check calling user and add as member to a type where the user is not a member yet. See [call GraphQL from Lambda docs](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#graphql-from-lambda) for setup details. Keep in mind `allow: private, provider: iam` @auth-directive on GraphQL types to be operated with by this lambda (keep in mind [our notes](https://github.com/aws-amplify/amplify-cli/issues/2776#issuecomment-558442429)).

`amplify add function`

? Provide a friendly name for your resource to be used as a label for this category in the project:
merchachadev7begraphql

? Provide the AWS Lambda function name:
merchachadev7begraphql

? Choose the function template that you want to use:
Hello world function

? Do you want to access other resources created in this project from your Lambda function?
Yes: select "auth", "api"

? Auth has 2 resources in this project. Select the one you would like your Lambda to access
merchachadev7auth

? Select the operations you want to permit for merchachadev7auth
read

? Api has 2 resources in this project. Select the one you would like your Lambda to access
merchachadev7api

? Select the operations you want to permit for merchachadev7api
create, read, update, delete
(**NOTE** create is apparently essential here to prevent unauthorized-errors)

? Do you want to edit the local lambda function now? (Y/n) Y
edit index.js, queries.js

**Make sure** to use proper env variables (they include API and AUTH resorce names) in the `index.js` code.

`amplify function build`

## Admin Queries

REST API lambda (serverless-express) is initially created by Amplify. Edit to remove unnecessary event log in the main handler, and **include custom queries** into lambda source.

### Enabling required permissions: Secret manager

Allow access to specific keys: Edit Admin Queries function CloudFormation template that was initially created by Amplify: find the `lambdaexecutionpolicy` part, `Statement` array that permits log publishing and Cognito actions; include an additional Statement-array entry for Secret manager (modify the ARN tail as needed):

```
{
    "Effect": "Allow",
    "Action": [
	    "secretsmanager:GetSecretValue"
	],
	"Resource": {
        "Fn::Sub": [
            "arn:aws:secretsmanager:${region}:${account}:secret:merch/services/ASI-SS2HS9",
            {
                "region": {
				    "Ref": "AWS::Region"
				},
				"account": {
				    "Ref": "AWS::AccountId"
				}
            }
        ]
    }
}
```

Finally run function build and push again.

