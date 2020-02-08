# sponsors-functions

## Usage

This function receives and validates a webhook from [GitHub Sponsors](https://github.com/sponsors) using the [node12 template](https://github.com/openfaas/templates/) from [OpenFaaS](https://github.com/openfaas/).

Each message is verified using the [crypto library](https://nodejs.org/api/crypto.html) and HMAC.

Messages that pass HMAC are then sent over to a secret webhook URL and appear in Slack

It is triggered by any event from [GitHub Sponsors](https://github.com/sponsors/alexellis)

## Next tasks

Switch on each event, and send a "pretty" string such as Person X just sponsored you, or Person X cancelled their sponsorship.

## Development

Seal secrets:

```sh
export WEBHOOK=""
export SLACK=""

faas-cli cloud seal --name alexellis-sponsors \
 --literal webhook-secret=$WEBHOOK \
 --literal slack-url=$SLACK
```
