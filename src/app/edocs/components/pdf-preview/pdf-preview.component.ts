import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ID } from '@datorama/akita';

import { DocumentsApiService } from '../../state';

@Component({
  selector: 'edocs-pdf-preview',
  templateUrl: './pdf-preview.component.html'
})
export class PdfPreviewComponent implements OnInit, OnChanges {
  /**
   * The URL of the image to load.
   */
  @Input() id: ID;

  /**
   *
   */
  @Input() showAll: boolean = true;

  /**
   *
   */
  @Input() page: number = 1;

  /**
   * Fallback URL to load when the pdf url fails to load or does not exist.
   */
  @Input() fallbackUrl: string;

  /**
   * Whether to show a spinner while the pdf loads
   */
  @Input() spinner: boolean;

  /**
   * Notify on image load..
   */
  @Output() load: EventEmitter<PdfPreviewComponent> = new EventEmitter<PdfPreviewComponent>();

  /**
   * Indicates if the image is still loading
   */
  isLoading: boolean = true;

  element: HTMLElement;

  resolvedUrl: string;

  /*
   *
   */
  constructor(private cd: ChangeDetectorRef, private api: DocumentsApiService) {}

  /**
   *
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('id' in changes) {
      this.resolveUrl(this.id);
    }
  }

  /**
   *
   */
  ngOnInit(): void {
    if (this.fallbackUrl) {
      this.setUrl(this.fallbackUrl, false);
    }

    if (!this.id) {
      // image url was not passed
      // this can happen when [src] is set to a variable that turned out to be undefined
      // one example could be a list of users with their profile pictures
      // in this case, it would be useful to use the fallback image instead
      // if fallback was used as placeholder we do not need to set it again
      if (!this.fallbackUrl) {
        // we're not going to cache the fallback image since it should be locally saved
        this.setUrl(this.fallbackUrl);
      } else {
        this.isLoading = false;
      }
    }
  }

  /**
   *
   */
  private resolveUrl(id: ID) {
    if (id) {
      this.api.generateUrl(id).subscribe(this.setUrl, () => this.setUrl(this.fallbackUrl));
    } else {
      this.setUrl(this.fallbackUrl);
    }
  }

  /**
   * Set the image to be displayed
   */
  private setUrl = (imageUrl: string, stopLoading: boolean = true): void => {
    this.isLoading = !stopLoading;
    this.resolvedUrl = imageUrl;
    this.cd.markForCheck();
    this.load.emit(this);
  };
}
