// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: 'AIzaSyAvOMBt8ZAP2bz_O4MDB9W8vglfqYSGpLY',
      authDomain: 'medlink-43c79.firebaseapp.com',
      databaseURL: 'https://medlink-43c79.firebaseio.com',
      projectId: 'medlink-43c79',
      storageBucket: 'medlink-43c79.appspot.com',
      messagingSenderId: '575898077779'
  }
};
