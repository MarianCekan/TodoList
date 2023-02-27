// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'todo-app-7f332',
    appId: '1:240031175481:web:3450ffb1146cb09f6e8ee8',
    storageBucket: 'todo-app-7f332.appspot.com',
    apiKey: 'AIzaSyA8nc97Z-isFSA9D3uBqTzyyF_35Iv8Lkk',
    authDomain: 'todo-app-7f332.firebaseapp.com',
    messagingSenderId: '240031175481',
  },
  production: false
};

export enum state {
  FALSE,
  TRUE,
  SEARCH,
  ALL,
}

export const baseBackendUrl = "http://nlglife.com"


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
