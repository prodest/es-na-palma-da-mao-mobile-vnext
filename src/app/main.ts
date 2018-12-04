// tslint:disable-next-line
/// <reference path="../module.augmentation.d.ts" />
/// <reference path="../module.declaration.d.ts" />
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';
import { AppModule } from './app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(registerServiceWorker);

persistState({
  key: 'auth-store',
  include: ['auth']
});

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function(registration) {
        registration.onupdatefound = function() {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log('New or updated content is available.');
                } else {
                  console.log('Content is now available offline!');
                }
                break;
              case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
            }
          };
        };
      })
      .catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }
}
