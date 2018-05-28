import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackFormComponent } from './feedback-form.component';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [FeedbackFormComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [FeedbackFormComponent]
})
export class FeedbackFormComponentModule {}
