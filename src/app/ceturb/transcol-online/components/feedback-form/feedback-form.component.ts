import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FeedBack } from './../../model';

/**
 * Generated class for the FeedbackFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feedback-form',
  templateUrl: 'feedback-form.component.html'
})
export class FeedbackFormComponent {
  @Input() showStop: boolean;
  @Input() showLine: boolean;
  @Input() showTime: boolean;
  @Input() showText: boolean;
  @Input() getLocation: boolean;
  @Output() onSendFeedback = new EventEmitter<FeedBack>();
  @Output() onError = new EventEmitter<string>();

  model: FeedBack;

  /**
   *
   *
   */
  constructor() {
    this.model = {
      line: null,
      stop: null,
      time: null,
      text: null,
      type: null,
      user: null
    };
  }

  /**
   *
   *
   */
  onSubmit() {
    this.onSendFeedback.emit(this.model);
  }

  /**
   *
   *
   */
  get description() {
    let desc = 'Favor informar ';
    if (this.showText) {
      desc += 'uma descrição';
    } else {
      if (this.showLine) {
        desc += 'a linha';
        if (this.showStop) {
          desc += ', o ponto';
          if (this.showTime) {
            desc += ' e o horário';
          }
        } else {
          if (this.showTime) {
            desc += ' e o horário';
          }
        }
      } else {
        if (this.showStop) {
          desc += 'o ponto';
          if (this.showTime) {
            desc += ' e o horário';
          }
        } else {
          if (this.showTime) {
            desc += 'o horário';
          }
        }
      }
    }
    desc += ' do ocorrido abaixo:';
    return desc;
  }
}
