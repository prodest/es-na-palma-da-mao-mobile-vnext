import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, Slides} from 'ionic-angular';

@IonicPage({
  segment: 'documentos-para-enviar'
})
@Component({
  selector: 'documents-to-send',
  templateUrl: './documents-to-send.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendPage implements OnInit {

  @ViewChild(Slides) slides: Slides;
  constructor() { }

  nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

  ngOnInit(): void {
  }

  refresh(): void { }
}
