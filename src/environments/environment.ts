// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBGjqtpvYwQesyUNXiZ4nktNprvnKYMWEg',
    authDomain: 'todohogar-10387.firebaseapp.com',
    databaseURL: 'https://todohogar-10387.firebaseio.com',
    projectId: 'todohogar-10387',
    storageBucket: 'todohogar-10387.appspot.com',
    messagingSenderId: '687651680270'
  },
  emailConfig: {
    key: 'user_CNGJS3C30x3t5cljI0jQR'
  }
};
