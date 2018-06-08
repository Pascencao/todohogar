export const environment = {
  production: true,
  firebase: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.DOMAIN,
    databaseURL: process.env.URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.BUCKET,
    messagingSenderId: process.env.SENDER_ID
  }
};
