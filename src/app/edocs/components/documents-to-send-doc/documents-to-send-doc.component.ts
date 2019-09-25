import { ChangeDetectionStrategy, Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBase } from '@espm/core';
import { AlertController } from 'ionic-angular';
import { FileOpener } from '@ionic-native/file-opener';
import { WizardStep } from '../../providers';
import { IDocStepOutput } from '../../interfaces';
import { DocumentFile } from '../../state';

@Component({
  selector: 'edocs-documents-to-send-doc',
  templateUrl: './documents-to-send-doc.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DocumentsToSendDocComponent extends WizardStep<IDocStepOutput> implements OnInit {

  @Input() file: DocumentFile;
  @ViewChild('docForm') protected form: FormBase;

  constructor(private fileOpener: FileOpener, private alertCtrl: AlertController) {
    super();
  }

  ngOnInit(): void { }

  refresh(): void { }

  fileSelect(file: DocumentFile): void {
    this.file = file;
  }

  dismissFile(): void {
    this.file = undefined;
  }

  async viewFile() {
    try {
      await this.fileOpener.open(this.file.url, this.file.type);
    } catch (e) {
      const alert = this.alertCtrl.create({
        title: 'Falha ao abrir arquivo',
        message: 'Ocorreu algum problema na tentativa de abrir o documento atual. Certifique-se de que o documento ainda existe em seu aparelho.',
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }]
      });
      alert.present();
      console.log('error on try open PDF file');
      console.error(e);
    }
  }

}
