import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, ToastController } from 'ionic-angular';
import { FeedBack, feedbackList } from './../../model';
import { FeedBackApiService } from './../../providers/feedback-api.service';

/**
 * Generated class for the TranscolOnlineFeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transcol-online-feedback',
  templateUrl: 'transcol-online-feedback.html',
  providers: [FeedBackApiService]
})
export class TranscolOnlineFeedbackPage {
  feedbackList: any[];

  activePanel: number;

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private feedBackApiService: FeedBackApiService
  ) {
    this.feedbackList = feedbackList;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranscolOnlineFeedbackPage');
  }

  /**
   *
   * @param {number} type
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
   * @param {any} form
   */
  saveFeedback(form: FeedBack) {
    form.type = this.activePanel;
    this.feedBackApiService.saveFeedBack(form).subscribe(() => {
      this.goBack();
      setTimeout(() => this.showMessage('Mensagem enviada com sucesso'), 600);
    });
  }

  goBack = () => {
    this.navCtrl.pop();
  };

  showDialog(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: message,
      buttons: ['ENTENDI']
    });
    alert.present();
  }

  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}
