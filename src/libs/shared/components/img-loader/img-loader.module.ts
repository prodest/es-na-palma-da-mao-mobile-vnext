import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { ImgLoaderComponent } from './img-loader.component';
import { defaultImageLoaderConfig, ImageLoaderConfig, IMG_LOADER_CONFIG_TOKEN } from './img-loader.config';

@NgModule({
  declarations: [ImgLoaderComponent],
  imports: [IonicModule],
  exports: [ImgLoaderComponent]
})
export class ImageLoaderModule {
  static forRoot(config: ImageLoaderConfig = defaultImageLoaderConfig): ModuleWithProviders {
    return {
      ngModule: ImageLoaderModule,
      providers: [
        {
          provide: IMG_LOADER_CONFIG_TOKEN,
          useValue: config
        }
      ]
    };
  }
}
