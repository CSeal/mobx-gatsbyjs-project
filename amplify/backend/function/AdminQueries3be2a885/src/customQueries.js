/* eslint-disable */
const axios = require('axios')
const AWS = require('aws-sdk')
const secretsManager = new AWS.SecretsManager()
// "merch/services/ASI" secret
const secretASIarn = 'arn:aws:secretsmanager:us-west-2:692387282546:secret:merch/services/ASI-SS2HS9'

async function queryProductASI(productId) {
  // ASI credentials from Secret manager
  // https://github.com/aws-amplify/amplify-cli/issues/684#issuecomment-453639271
  const secret = await secretsManager.getSecretValue({ SecretId: secretASIarn }).promise()
  if (!secret) {
    throw new Error('Secret not available for ASI credentials')
  }
  const { CLIENT, SECR } = JSON.parse(secret.SecretString);

  // product details get-endpoint, authenticated
  const apiUrl = `http://api.asicentral.com/v1/products/${productId}.json`
  const requestHeaders = {
    'Content-Type' : 'application/json',
    Authorization: `AsiMemberAuth client_id=${CLIENT}&client_secret=${SECR}`
  }
  
  try {
    resp = await axios.get(apiUrl, { headers: requestHeaders });
    return resp.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  queryProductASI,
};
