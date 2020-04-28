## About

## Installation

### Pre-requisites

-   Firebase Firestore (with Blaze account)
-   Twilio account (trial or fully activated)

### Firebase setup

Run `yarn install` on cloned project on a local machine.

Deploy Twilio api keys to firebase

```
node_modules/.bin/firebase functions:config:set twilio.sid="..." twilio.token="..." twilio.twilioapikey="..." twilio.twilioapisecret="..."
```

Create `.env` in project root based on `.env.sample` file. Add Firebase API keys, Twilio phone numberthere and test phone number (for trial account).

Run the project with

```
yarn start
```

Build and deploy project to production

```
yarn build && firebase deploy
```

## Contributors

Team PROTOTYP:

-   Adrian Bece
-   Vlatko Vlahek
-   Josip Ravas
-   Igor Plac
-   Valentina Bermanec

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.
