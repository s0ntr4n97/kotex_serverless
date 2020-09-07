const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

exports.admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
