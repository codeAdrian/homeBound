const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
    process.env.TWILIO_ACCOUT_SID,
    process.env.TWILIO_AUTH_TOKEN,
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/messages', (req, res) => {
    const { APP_MODE, TWILIO_PHONE_NUMBER, TEST_PHONE_NUMBER } = process.env;
    const from =
        APP_MODE === 'production' ? req.body.from : TWILIO_PHONE_NUMBER;
    const to = APP_MODE === 'production' ? req.body.to : TEST_PHONE_NUMBER;
    res.header('Content-Type', 'application/json');
    client.messages
        .create({
            from,
            to,
            body: req.body.body,
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch((err) => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001'),
);
