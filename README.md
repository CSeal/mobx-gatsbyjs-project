# Merchacha web application

Gatsby with AWS Amplify.


## AWS setup: development


### Install & configure the AWS Amplify CLI

```sh
npm install -g @aws-amplify/cli

amplify configure
```

Amplify development configuration:

* TI AWS account
* user "tidev-merchacha"
* region "us-west-2"
* local profile (specify name "devmerchacha")


### Create a new AWS Amplify Project

```sh
amplify init
```

- project __merchachadev7__
- environment __master__
- Choose the type of app that you're building __javascript__
- What javascript framework are you using __react__
- Source Directory Path: __src__
- Distribution Directory Path: __public__
- Build Command: __npm run-script build__
- Start Command: __npm run-script develop__
- Specify local profile to be used with the project

NOTE: At this point, `amplify/` will be created and `.gitignore` will be modified. S3 bucket for deployment will also be created.

**Remove** `aws-exports.js` from `.gitignore`: need that file to be in `src/` available for client code export.


### Add authentication

```sh
amplify add auth
```

Go over the prompts for customization: see `notes_amplify_auth_setup.txt`.

#### Add storage before user pool creation

**IMPORTANT**: `AliasAttributes` used to allow email-based logins may be mentioned somewhere in Storage components. If auth is pushed before storage those settings may fail. Therefore it is necessary to setup auth and storage, modify cloud formation template, and then push all together.

```sh
amplify add storage
```

Go over the prompts (if editing later on, use `amplify update storage`):

**TEMP NOTE**: For the moment, not using the S3 trigger and not allowing users-group to create/update. This is mainly due to the [diffuculty mapping identity id to user info](https://github.com/aws-amplify/amplify-js/issues/54). Modify if that resolves, or keep as (even remove read-access from users) and use a custom lambda to upload user images (possibly as a GraphQL resolver).

- Content (Images, audio, video, etc.)
- Please provide a friendly name for your resource that will be used to label this category in the project: __merchachadev7storage__
- Please provide bucket name: __merchachadev7media__
- Restrict access by? __Individual Groups__
- Select groups: __admin, users__
- What kind of access do you want for admin users? __create/update, read, delete__
- What kind of access do you want for users users? __create/update__
- Do you want to add a Lambda Trigger for your S3 Bucket? __Y, Create a new function__ (S3Trigger{*} will be added)
- Do you want to edit the local S3Trigger{numbers} lambda function now? __n__

At this stage, we just leave the default S3 Trigger function code (logs event info) to prevent cyclic dependency conflicts before push.

#### Modify Cognito template

**IMPORTANT**: edit CloudFormation template for Cognito resources (`amplify/backend/auth/{resource_label}/*-cloudformation-template.yaml`) before doing `amplify push` since once a Cognito user pool is created it is not possible to modify attributes-settings:

after

```
AutoVerifiedAttributes: !Ref autoVerifiedAttributes
```

[add](https://github.com/aws-amplify/amplify-cli/issues/382#issue-376275871)

```
AliasAttributes: ["email"]
```

Check status:

```sh
amplify status
```

Create resources in AWS cloud:

```sh
amplify push
```

Verify in AWS Console, Cognito user pool, Attributes, that the "Also allow sign in with verified email address" checkbox is enabled. No further edits of those settings are possible.

**Check identity pool**: as of Amplify CLI v4.9.0 for some reason in Settings, `Enable access to unauthenticated identities` is un-checked (although auth and un-auth roles are being created). Checking that box manually in the AWS Cognito Console.

For allowed edits in auth configuration: `amplify update auth` then status (check), push.

**Production note**: Modify settings to have Cognito send emails through SES.


### Add GraphQL API

```sh
amplify add api
```

Go over the prompts (if editing later on, use `amplify configure api`):

- GraphQL, api name __merchachadev7api__
- Choose the default authorization type for the API: __Cognito User Pool__
- Do you want to configure advanced settings for the GraphQL API: __Yes__
- Choose the additional authorization types you want to configure for the API: __IAM__
- Configure conflict detection: __No__
- Do you have an annotated GraphQL schema?: __N__
- Do you want a guided schema creation? __Y__
- What best describes your project: __One-to-many relationship__
- Do you want to edit the schema now? __Y__

Edit `schema.graphql`: see [schema file](https://github.com/multidis/merchachadev/blob/master/amplify/backend/api/merchachadevapi/schema.graphql). When done, apply changes:

```sh
amplify push
```

First-time api creation prompts:

- Do you want to generate code for your newly created GraphQL API __Yes__
- Choose the code generation language target __typescript__
- Enter the file name pattern of graphql queries, mutations and subscriptions __src/graphql/**/*.ts__ (default choice)
- Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions __Y__
- Enter maximum statement depth (increase from default if your schema is deeply nested) __2__ (default)
- Enter the file name for the generated code __src/API.ts__ (default choice)

**Public access** configuration requires [multi-auth](https://aws-amplify.github.io/docs/cli-toolchain/graphql#public-authorization) support; as mentioned [here](https://github.com/aws-amplify/amplify-cli/issues/2221#issuecomment-531095692), needed to run `amplify update api` and enable **IAM** in "additional authorization types" if that was not configured at the api creation step (see prompts above, "advanced settings").

NOTE: when updating the schema (if all resources were already created with `amplify push` previously):

```sh
amplify api gql-compile

amplify codegen
amplify codegen types

amplify push
```

**IMPORTANT** for any user to be able to read decks via their id-based urls: After the initial api push, include modified resolvers `resolvers/Query.getQuoteBoard.res.vtl` and `resolvers/QuoteBoard.qitems.res.vtl` for deck and connected items as described in the [overwriting resolvers](https://aws-amplify.github.io/docs/cli-toolchain/graphql#overwriting-resolvers) docs: take the resolvers from `build/` (generated on initial push) and replace in the user pool auth checks part `#set( $allowedGroups = ["admin"] )` with `#set( $allowedGroups = ["admin", "users"] )`. Similarly, modify `Shop.sitems.res.vtl` for shop items.

After preparing modified resolver files update the API:

```sh
amplify push
```

**CAUTION**: Security considerations for subscriptions and not using searchable, see [security discussion](https://dev.to/rosswilliams/aws-amplify-s-security-ux-is-insufficient-and-dangerous-378n), and [issue](https://github.com/aws-amplify/amplify-cli/issues/1766). AWS Amplify updated in Sep 2019 with subscription protection: see [authorizing subscriptions](https://aws-amplify.github.io/docs/cli-toolchain/graphql#authorizing-subscriptions) docs.


### Add lambda-functions

Follow [functions setup notes](notes_amplify_funs_setup.md).


### Modify storage settings

#### S3 trigger function

Edit the trigger-function code (as in this repo) and grant it the required permissions (be able to query Cognito to check uploading user sub):

```sh
amplify update function
```

- Please select the Lambda Function you would want to update: __S3Trigger{numbers}__
- Do you want to update permissions granted to this Lambda function to perform on other resources in your project? __Y__
- Select the category: __auth__
- Select the operations you want to permit for merchachadev7auth: __read__

```sh
amplify function build
amplify push
```

**NOTE**: Currently not using the trigger functionality, however keeping it since adding it later interferes with the Cognito pool thus requiiring to replace the entire backend.


#### Bucket access

Allow [public read](https://dev.to/dabit3/graphql-tutorial-how-to-manage-image-file-uploads-downloads-with-aws-appsync-aws-amplify-hga) for the bucket's `/public/` path in S3 console (create that folder-path), Permissions, Bucket Policy (replace with the actual bucket resource):

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::merchachadev7media61056-master/merchmedia/*"
        }
    ]
}
```

**NOTE**: Currently using `public/` with admin-only Storage-access while there is no create/update S3 access for users. If enabling the latter, consider some other mechanism with a different bucket or a different folder (e.g. `merchmedia/`). Preferable to leave the Admin-storage with Amplify, and Amplify Storage does not provide Cognito sub currently (only the identity pool sub that is not straightforward to map to the user pool).


### Create user for AppSync queries during Gatsby build

In the IAM Console, create a new policy "MerchachaDevAppSyncRead" (starting point was "AWSAppSyncInvokeFullAccess" then edited along the lines of begraphql lamnda resolver CloudFormation template); **look up** `"Resource"` ARN in `begraphql` lambda console, "Permissions", "View roleJSON". AppSync ARN structure is `arn:aws:appsync:{region}:{accountId}:apis/{GraphQLApiId}/*`:

- verify `region`;
- find `accountId` is in most ARNs, see e.g. Amplify Console, choose App, General, "App ARN", or `backend/amplify-meta.json`, `AuthRoleArn`;
- locate `GraphQLApiId` in the AppSync Console, Settings, "API ID" field.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "appsync:GraphQL",
                "appsync:List*",
                "appsync:Get*"
            ],
            "Resource": [
                "arn:aws:appsync:us-west-2:692387282546:apis/gtw5kvvsg5ggdi5x7ahfstbrnm/*"
            ]
        }
    ]
}
```

Provide the newly created user credentials to appropriate env vars in the command launching gatsby. Verify the GraphQL endpoint `AWS_APPSYNC_API_URLID` variable vs. AppSync Console (API URL should be `https://${AWS_APPSYNC_API_URLID}.appsync-api.us-west-2.amazonaws.com/graphql`).

**CAUTION**: Do NOT use Gatsby's expected `.env.development`, `.env.production` for those credentials since those files [make their variable available](https://stackoverflow.com/a/47087014/4669368) in the client browser! Use [build time](https://www.gatsbyjs.org/packages/gatsby-source-graphql/#how-to-use) variables only.

Example supplying as develop command-line vars:

```sh
API_ENDPOINT_ID="" API_REGION="us-west-2" ACCESS_KEY_ID="" ACCESS_SECRET_KEY="" gatsby develop
```

Include appropriately with `gatsby build` depending on the deployment setup.

NOTE: If getting errors with a newly created backend that does not yet have any live shop / enabled slider data, perform the following:

- comment-out `gatsby-source-graphql` part in `gatsby-config.js`;
- comment out `createPages`-part in `gatsby-node.js`;
- move out files from `src/templates/`.

Then when the site is running, create a shop that would have a public page, undo all steps above, and build gatsby again.

**Keep in mind** when adding more types/queries in AppSync, `gatsby clean` may be required otherwise stale schema definition file may not list new queries.


## CloudFlare deployment

Install wrangler and [configure](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/) with an API token (generate from the "Edit Cloudflare Workers" template).

Then following [Workers Sites](https://developers.cloudflare.com/workers/sites/start-from-existing/) tutorial. Domain at `workers.dev` (sandbox), unlimited plan AccointID in `wrangler.toml`.


