import * as functions from 'firebase-functions';
import { Twilio } from 'twilio';

export const getUserMessages = functions.https.onCall(async (data) => {
  const { sid, token } = functions.config().twilio;
  const client = new Twilio(sid, token);

  const services = await client.chat.services.list();
  const coronaChat = services.find((s) => s.friendlyName === 'CoronaBot');

  if (!coronaChat) {
    throw new Error('Chat service is not found');
  }

  try {
    const { userId } = data;
    const messageResponse = await client.chat
      .services(coronaChat.sid)
      .channels(userId)
      .messages.list();

    return JSON.stringify(messageResponse.map((m) => m));
  } catch (e) {
    console.log(e);
    return [];
  }
});
