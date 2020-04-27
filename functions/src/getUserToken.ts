import * as functions from 'firebase-functions';
import { jwt, Twilio } from 'twilio';

const AccessToken = jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

export const getUserToken = functions.https.onCall(async (data) => {
  const {
    sid,
    token,
    twilioapikey,
    twilioapisecret,
  } = functions.config().twilio;

  const client = new Twilio(sid, token);
  const services = await client.chat.services.list();
  const coronaChat = services.find((s) => s.friendlyName === 'CoronaBot');

  if (!coronaChat) {
    throw new Error('Chat service is not found');
  }
  const serviceSid = coronaChat.sid;

  const { identity } = data;

  // Create a "grant" which enables a client to use Chat as a given user,
  // on a given device
  const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const chatToken = new AccessToken(sid, twilioapikey, twilioapisecret, {
    identity,
  });

  chatToken.addGrant(chatGrant);

  // Serialize the token to a JWT string
  return chatToken.toJwt();
});
