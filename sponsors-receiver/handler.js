'use strict'

const crypto = require('crypto')
const fs = require('fs')
const fsPromises = fs.promises
const hashMethod = 'sha1'

module.exports = async (event, context) => {
  const payload = {
    'status': 'Input: ' + JSON.stringify(event.body.toString()),
    'headers': event.headers,
    'path': event.path,
    'query': event.query
  }

  console.log(payload)

  let secret = await fsPromises.readFile('/var/openfaas/secrets/webhook-secret', 'utf8')

  let hmac = crypto.createHmac(hashMethod, secret)

  hmac.update(event.body)
  let digest = hmac.digest('hex')
  let payloadDigest = event.headers['x-hub-signature']

  let validDigest = payloadDigest === `sha1=${digest}`
  console.log(`Signature: ${payloadDigest} vs ${digest}, valid: ${validDigest}`)

  return context
    .status(200)
    .succeed({'done': 'OK', 'validDigest': validDigest})
}
