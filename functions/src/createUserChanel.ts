import * as functions from 'firebase-functions';
import { Twilio } from 'twilio';

export const createUserChannel = functions.https.onCall(async (data) => {
  const { sid, token } = functions.config().twilio;
  const client = new Twilio(sid, token);

  const services = await client.chat.services.list();
  const coronaChat = services.find((s) => s.friendlyName === 'CoronaBot');

  if (!coronaChat) {
    throw new Error('Chat service is not found');
  }

  try {
    const { userId } = data;
    const channel = await client.chat
      .services(coronaChat.sid)
      .channels.create({ friendlyName: userId, uniqueName: userId });

    await client.chat
      .services(coronaChat.sid)
      .channels(channel.sid)
      .webhooks.create({
        type: 'webhook',
        configuration: {
          filters: ['onMessageSent'],
          method: 'POST',
          url:
            'https://channels.autopilot.twilio.com/v1/ACb57077d04b3c7e514a7f26f8cfc9c28a/UA5d7e5d90dde8b6c82e8395bc5eaa9425/twilio-chat',
        },
      });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
});
