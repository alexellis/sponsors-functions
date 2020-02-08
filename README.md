# sponsors-functions

## Usage

This function receives and validates a webhook from [GitHub Sponsors](https://github.com/sponsors) using the [node12 template](https://github.com/openfaas/templates/) from [OpenFaaS](https://github.com/openfaas/).

## Development

Seal secrets:

```sh
export WEBHOOK=""
export SLACK=""

faas-cli cloud seal --name alexellis-sponsors \
 --literal webhook-secret=$WEBHOOK \
 --literal slack-url=$SLACK
```
