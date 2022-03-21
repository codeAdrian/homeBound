## About

A delightful app for not-so-delightful times that helps people develop healthy routines, keep them informed and keep track of close contacts. Built for DEV x Twilio hackaton 2020.

-   **Activity tracker with gamification elements** - Users earn points by completing tasks (custom or suggested tasks). That way they're encouraged to find new and healthy activities while indoors.
-   **Close contacts list** - users can maintain list their close contacts with contact details. They can also use Twilio's programmable SMS to send a message to them in an emergency.
-   **Tailored experience dependant on the situation** - Recommend different activities for users based on the following criteria: if they are in a mandatory self-isolation or not and if they live alone or not.
-   **Chatbot assistance** - Users can get informed about self-isolation rules. Currently with very basic chatbot flow, but with wide possibilities for extending it, depending on the config in the Twilio console.

## Installation

### Pre-requisites

-   Firebase Firestore (with Blaze account)
-   Twilio account (trial or fully activated)

### Project setup

Clone the repository (develop or master branch)

Run `yarn install` on cloned project on a local machine.

Create `.env` in project root based on `.env.sample` file. Add Firebase API keys, Twilio phone number there and test phone number (for trial account).

Deploy Twilio api keys to firebase

```
node_modules/.bin/firebase functions:config:set twilio.sid="..." twilio.token="..." twilio.twilioapikey="..." twilio.twilioapisecret="..."
```

Run the project with

```
yarn start
```

Build and deploy project to production

```
yarn build && firebase deploy
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.
