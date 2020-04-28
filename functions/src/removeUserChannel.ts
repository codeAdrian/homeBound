import * as functions from 'firebase-functions';
import { Twilio } from 'twilio';

export const removeUserChannel = functions.https.onCall(async (data) => {
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
      .channels(userId)
      .fetch();

    return await channel.remove();
  } catch (e) {
    console.log(e);
    return null;
  }
});
