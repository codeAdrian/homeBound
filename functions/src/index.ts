import admin = require('firebase-admin');

admin.initializeApp();

export * from './incrementUserScore';
export * from './sendSMSMessage';
