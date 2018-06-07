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
  @Input() public showStop: boolean;
  @Input() public showLine: boolean;
  @Input() public showTime: boolean;
  @Input() public showText: boolean;
  @Input() public getLocation: boolean;
  @Output() onSendFeedback = new EventEmitter<FeedBack>();
  @Output() onError = new EventEmitter<string>();

  public model: FeedBack;

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
   * @param {*} form
   * @memberof FeedbackFormController
   */
  onSubmit() {
    this.onSendFeedback.emit(this.model);
  }

  /**
   *
   *
   * @readonly
   * @memberof FeedbackFormController
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
