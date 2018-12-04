import { InjectionToken } from '@angular/core';

export interface ImageLoaderConfig {
  spinnerEnabled?: boolean;
  fallbackAsPlaceholder?: boolean;
  fallbackUrl?: string;
  spinnerName?: string;
  spinnerColor?: string;
}

export const defaultImageLoaderConfig: ImageLoaderConfig = {
  spinnerEnabled: true,
  fallbackAsPlaceholder: false,
  spinnerName: '',
  spinnerColor: '',
  fallbackUrl: ''
};

export const IMG_LOADER_CONFIG_TOKEN = new InjectionToken<ImageLoaderConfig>('IMG_LOADER_CONFIG_TOKEN');
