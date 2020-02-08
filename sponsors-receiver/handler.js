'use strict'

const crypto = require('crypto')
const fs = require('fs')
const fsPromises = fs.promises

module.exports = async (event, context) => {
  const payload = {
    'status': 'Input: ' + JSON.stringify(event.body),
    'headers': event.headers,
    'path': event.path,
    'query': event.query
  }

  console.log(payload)

  let secret = await fsPromises.readFile('/var/openfaas/secrets/webhook-secret', 'utf8')

  let hmac = crypto.createHmac('sha256', secret)

  hmac.update(event.body)
  let digest = hmac.digest('hex')

  console.log(`Signature: ${event.headers['x-hub-signature']} vs ${digest}`)

  return context
    .status(200)
    .succeed({'done': 'OK'})
}
