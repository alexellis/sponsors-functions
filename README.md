# sponsors-functions

GitHub Sponsors webhook receiver and Slack forwarder, written in Node.js

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![OpenFaaS](https://img.shields.io/badge/openfaas-serverless-blue.svg)](https://www.openfaas.com)

This function is hosted on [OpenFaaS Cloud](https://docs.openfaas.com/openfaas-cloud/community-cluster/), see the [commits page for the build logs](https://github.com/alexellis/sponsors-functions/commits/master). The dashboard is private, but contains runtime logs and metrics.

Subscribe to my Insiders Updates by Sponsoring me via GitHub:

* 🐳 [Sponsor now](https://github.com/sponsors/alexellis/) 
* ⭐️ Show support and [Star OpenFaaS](https://github.com/openfaas/faas)

## Usage

This function receives and validates a webhook from [GitHub Sponsors](https://github.com/sponsors) using the [node12 template](https://github.com/openfaas/templates/) from [OpenFaaS](https://github.com/openfaas/).

Each message is verified using the [crypto library](https://nodejs.org/api/crypto.html) and HMAC.

Messages that pass HMAC are then sent over to a secret webhook URL and appear in Slack

It is triggered by any event from [GitHub Sponsors](https://github.com/sponsors/alexellis)

There's a switch statement on each event, which sends send a "pretty" string such as Person X just sponsored you, or Person X cancelled their sponsorship including an appropriate emoticon for the action taken by the user.

![Example](https://user-images.githubusercontent.com/6358735/74099171-b4a17580-4b18-11ea-8fd9-7139b6a4a05c.png)

## Deployment

You can pick between [self-hosted OpenFaaS](https://github.com/openfaas/faas) or [OpenFaaS Cloud](https://github.com/openfaas/openfaas-cloud).

### With OpenFaaS Cloud

* Fork the repo

* [Add OpenFaaS Cloud integration to your repo, the community cluster](https://github.com/openfaas/community-cluster) is free to use for hosting.

* Create a channel and add an [incoming webhook integration on Slack](https://api.slack.com/messaging/webhooks)

* Create the webhook on GitHub for your URL and enter a webhook secret

* Seal your own secrets, change `alexellis` for your own username.

 ```sh
 export WEBHOOK=""
 export SLACK=""

 faas-cli cloud seal --name alexellis-sponsors \
  --literal webhook-secret=$WEBHOOK \
  --literal slack-url=$SLACK
 ```

* Fire a test event from your sponsors page

### With OpenFaaS or faasd

You can also host a simpler version of OpenFaaS and deploy the function there:

* [OpenFaaS on Kubernetes](https://docs.openfaas.com/deployment/#kubernetes-recommended-for-production-and-for-work)

* [OpenFaaS with containerd (faasd)](https://docs.openfaas.com/deployment/#faasd-with-containerd)

See also: [SponsorshipEvent](https://developer.github.com/v3/activity/events/types/#sponsorshipevent)
