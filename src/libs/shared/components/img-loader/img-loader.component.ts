import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

import { ImageLoaderConfig, IMG_LOADER_CONFIG_TOKEN } from './img-loader.config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'img-loader',
  template:
    '<ion-spinner *ngIf="spinner && isLoading && !fallbackAsPlaceholder" [name]="spinnerName"></ion-spinner>' +
    '<ng-content></ng-content>',
  styles: [
    `
    :host{
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    img {
      width: auto !important;
      height: auto !important;
    }
    ion-spinner { 
      float: none; 
      margin-left: auto; 
      margin-right: auto; 
      display: block;
    }
  `
  ]
})
export class ImgLoaderComponent implements OnInit {
  /**
   * The URL of the image to load.
   */
  @Input()
  set src(imageUrl: string) {
    this._src = imageUrl;
    this.updateImage(this._src);
  }

  get src(): string {
    return this._src;
  }

  private _src: string;

  /**
   * Fallback URL to load when the image url fails to load or does not exist.
   */
  @Input() fallbackUrl: string;

  /**
   * Whether to show a spinner while the image loads
   */
  @Input() spinner: boolean;

  /**
   * Whether to show the fallback image instead of a spinner while the image loads
   */
  @Input() fallbackAsPlaceholder: boolean;

  /**
   * Use <img> tag
   */
  @Input()
  set useImg(val: boolean) {
    this._useImg = val !== false;
  }

  get useImg(): boolean {
    return this._useImg;
  }

  private _useImg: boolean;

  /**
   * Name of the spinner
   */
  @Input() spinnerName: string;

  /**
   * Color of the spinner
   */
  @Input() spinnerColor: string;

  /**
   * Notify on image load..
   */
  @Output() load: EventEmitter<ImgLoaderComponent> = new EventEmitter<ImgLoaderComponent>();

  /**
   * Indicates if the image is still loading
   * @type {boolean}
   */
  isLoading: boolean = true;

  element: HTMLElement;

  /*
   *
   */
  constructor(
    private _element: ElementRef,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(IMG_LOADER_CONFIG_TOKEN) private config: ImageLoaderConfig
  ) {
    this.fallbackUrl = this.config.fallbackUrl;
    this.spinner = this.config.spinnerEnabled;
    this.fallbackAsPlaceholder = this.config.fallbackAsPlaceholder;
    this.spinnerName = this.config.spinnerName;
    this.spinnerColor = this.config.spinnerColor;
  }

  /**
   *
   */
  public ngOnInit(): void {
    if (this.fallbackAsPlaceholder && this.fallbackUrl) {
      this.setImage(this.fallbackUrl, false);
    }

    if (!this.src) {
      // image url was not passed
      // this can happen when [src] is set to a variable that turned out to be undefined
      // one example could be a list of users with their profile pictures
      // in this case, it would be useful to use the fallback image instead
      // if fallback was used as placeholder we do not need to set it again
      if (!this.fallbackAsPlaceholder && this.fallbackUrl) {
        // we're not going to cache the fallback image since it should be locally saved
        this.setImage(this.fallbackUrl);
      } else {
        this.isLoading = false;
      }
    }
  }

  /**
   *
   */
  private updateImage(imageUrl: string) {
    if (typeof imageUrl !== 'string' || imageUrl.length <= 0) {
      this.setImage(this.fallbackUrl || imageUrl);
    } else {
      this.setImage(imageUrl, false);
    }
  }

  /**
   * Set the image to be displayed
   */
  private setImage = (imageUrl: string, stopLoading: boolean = true): void => {
    this.isLoading = !stopLoading;

    // Using <img> tag
    if (!this.element) {
      // create img element if we dont have one
      this.element = this.renderer.createElement('img');
      this.renderer.appendChild(this._element.nativeElement, this.element);
    }

    // set it's src
    this.renderer.setAttribute(this.element, 'src', imageUrl);

    if (this.fallbackUrl) {
      this.renderer.listen(this.element, 'error', () => {
        this.cd.detectChanges();
        this.renderer.setAttribute(this.element, 'src', this.fallbackUrl);
      });
    }

    this.renderer.listen(this.element, 'load', () => {
      this.isLoading = false;
      this.cd.detectChanges();
      this.load.emit(this);
    });
  };
}
