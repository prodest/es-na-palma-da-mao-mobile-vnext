import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, ToastController } from 'ionic-angular';

import { FeedBack, feedbackList } from './../../model';
import { FeedBackApiService } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-transcol-online-feedback',
  templateUrl: 'transcol-online-feedback.html'
})
export class TranscolOnlineFeedbackPage {
  feedbackList: any[];
  activePanel: number;

  /**
   *
   *
   */
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private feedBackApiService: FeedBackApiService
  ) {
    this.feedbackList = feedbackList;
  }

  /**
   *
   *
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad TranscolOnlineFeedbackPage');
  }

  /**
   *
   *
   */
  showDetails(type: number) {
    if (this.activePanel === type) {
      this.activePanel = undefined;
    } else {
      this.activePanel = type;
    }
  }

  /**
   *
   *
   */
  saveFeedback(form: FeedBack) {
    form.type = this.activePanel;
    this.feedBackApiService.saveFeedBack(form).subscribe(() => {
      this.goBack();
      setTimeout(() => this.showMessage('Mensagem enviada com sucesso'), 600);
    });
  }

  /**
   *
   *
   */
  goBack = () => {
    this.navCtrl.pop();
  };

  /**
   *
   *
   */
  showDialog(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: message,
      buttons: ['ENTENDI']
    });
    alert.present();
  }

  /**
   *
   *
   */
  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
