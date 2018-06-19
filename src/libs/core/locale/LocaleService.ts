import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';

declare var System;

export function localeIdFactory(localeService: LocaleService) {
  return localeService.getLocale();
}

export function localeInitializer(localeId: string) {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      System.import(`@angular/common/locales/${localeId}.js`).then(module => {
        registerLocaleData(module.default);
        resolve();
      }, reject);
    });
  };
}

@Injectable()
export class LocaleService {
  getLocale(): string {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return undefined;
    }

    let browserLang: any = window.navigator['languages'] ? window.navigator['languages'][0] : null;
    browserLang =
      browserLang || window.navigator.language || window.navigator['browserLanguage'] || window.navigator['userLanguage'];

    if (browserLang.indexOf('-') !== -1) {
      browserLang = browserLang.split('-')[0];
    }

    if (browserLang.indexOf('_') !== -1) {
      browserLang = browserLang.split('_')[0];
    }

    return browserLang;
  }
}
