'use strict'

const crypto = require('crypto')
const fs = require('fs')
const fsPromises = fs.promises
const hashMethod = 'sha1'

const axios = require('axios')

module.exports = async (event, context) => {
  let secret = await fsPromises.readFile('/var/openfaas/secrets/sponsors-webhook-secret', 'utf8')

  let hmac = crypto.createHmac(hashMethod, secret)
  hmac.update(event.body)

  let digest = hmac.digest('hex')

  let payloadDigest = event.headers['x-hub-signature']

  let validDigest = payloadDigest === `sha1=${digest}`
  console.log(`Signature: ${payloadDigest} vs ${digest}, valid: ${validDigest}`)

  const payload = {
    'body': event.body.toString(),
    'headers': event.headers,
    'path': event.path,
    'query': event.query,
    'validDigest': validDigest
  }

  console.log(payload)

  if (validDigest) {
    let body = JSON.parse(event.body)

    if (body.action) {
      let emoticon = ':thumbsup:'
      switch (body.action) {
        case 'cancelled':
        case 'pending_cancellation':
          emoticon = ':thumbsdown:'
          break
        case 'edited':
        case 'tier_changed':
        case 'pending_tier_change':
          emoticon = ':warning:'
          break
      }

      let oneTime = ""
      if(body.sponsorship.tier["is_one_time"] && body.sponsorship.tier["is_one_time"] == "true") {
        oneTime = " (one time)"
      }

      let text = `Sponsorship ${body.action} of ${body.sponsorship.sponsorable.login} ${emoticon} by ${body.sponsorship.sponsor.login} - ${body.sponsorship.tier.name}${oneTime}`

      let slackPayload = { 'content': text }
      let slackURL = await fsPromises.readFile('/var/openfaas/secrets/discord-sponsors-url', 'utf8')
      let options = {
        'method': 'POST',
        'headers': { 'content-type': 'application/json' },
        'data': slackPayload,
        'url': slackURL
      }
      axios(options)
    }
  }

  return context
    .status(200)
    .succeed({'done': 'OK', 'validDigest': validDigest})
}
