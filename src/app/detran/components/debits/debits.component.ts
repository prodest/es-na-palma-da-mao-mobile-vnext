import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Debit, Vehicle } from '../../model';
import { AlertController, LoadingController, ToastController, Loading } from 'ionic-angular';
import { DetranApiService } from '../../providers';
import { Clipboard } from '@ionic-native/clipboard';
//import { FileOpener } from '@ionic-native/file-opener';
import { DocumentViewer } from '@ionic-native/document-viewer';
//import { File } from '@ionic-native/file/ngx';
//declare var cordova: any;

@Component({
  selector: 'espm-debits',
  templateUrl: 'debits.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class DebitsComponent {   
  constructor(
    private alertCtrl: AlertController,
    private api: DetranApiService,
    private loadingCtrl: LoadingController,
    private clipboard: Clipboard,
    private toastCtrl: ToastController,
    //private opener: FileOpener,    
    //private platform: Platform,    
    //private file: File,
    private document: DocumentViewer,
  ) {}  

  @Input() vehicle: Vehicle;
  @Input() debits: Debit[];
  ids = [];
  loading: Loading;

  saveAndOpenPdf(pdf: string, filename: string) {
    //const writeDirectory = this.platform.is('ios') ? cordova.file.documentsDirectory : cordova.file.dataDirectory;
    this.dismissLoading()
    this.document.viewDocument('http://www.africau.edu/images/default/sample.pdf', 'application/pdf', {})
    
  }

  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  /*saveAndOpenPdf(pdf: string, filename: string){

    let downloadPDF: any = pdf;
    let base64pdf = downloadPDF;
    var binary = atob(base64pdf.replace(/\s/g, ''));
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }

    var blobPdf = new Blob([view], { type: "application/pdf" });
    cordova.file.writeFile(cordova.file.externalRootDirectory, filename, blobPdf, { replace: true })
      .then(res => {
        console.log('wres', res);
        cordova.fileOpener.open(res.toInternalURL(), 'application/pdf').then((ores) => {
          console.log('ores', ores)
        }).catch(err => {
          console.log('open error');
        });
      }).catch(err => {
        console.log('save error');
      });
  }
  */
  
  
  generateBillet = () => {
    this.showLoading();
    /* let ids = [];
    for (let i = 0; i < this.debits.length; i++) {
      ids.push(this.debits[i].idDebito)
    }*/
    // this.api.generateGRU(this.vehicle, ids).subscribe(req => {
    this.api.generateGRU(this.vehicle, String(this.ids.join())).subscribe(req => {
      this.dismissLoading();
      console.log('GUIA_PDF >>>>>> ', req["guiaPDF"]);
      console.log("guia_" + String(Date.now()) + ".pdf");
      console.log("Info", req["itensGuia"][0]);      
      this.saveAndOpenPdf(req["guiaPDF"], "guia_" + String(Date.now()) + ".pdf");
      /*try {        
        this.saveAndOpenPdf(req["guiaPDF"], String(Date.now() + ".pdf"))
        this.showGRUCode(req["itensGuia"][0]["linhaDigitavel"], "Valor: " + this.getFormattedPrice(req["itensGuia"][0]["valorGuia"]))        
      } catch {
        this.showGRUCode("Não foi possível recuperar o código de barras", "Código de barras")
      }*/   
    });

  };

  getFormattedPrice(price: number) {    
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

  showGRUCode = (str: string, title: string) => {
    let alert = this.alertCtrl.create({
      title: title,
      message: str,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (str.match(/\d+/g)) {
              this.clipboard.copy(str);
              this.showMessage("Código de barras copiado!");
            }
            return true;
          }
        }
      ]
    });
    alert.present();
  }

  totalAmount = () => {
    let total = 0.0
    for (let i = 0; i < this.debits.length; i++) {      
      if (!(this.debits[i].parcela > 0)){
        total += Number(this.debits[i].valorAtualizadoFranquia)
      }      
    }
    return total;
  }

  ensureDebits = () => {
    return this.debits.filter(debit => !this.checkInstallment(debit));
  }

  checkInstallment = (debit) => {
    return debit.parcela > 0;
  }

  countDebits = () => {
    return this.ensureDebits().length;
  }

  addOrRemoveDebitsIdsToArray = () => {
    this.ids = [];    
    console.log(this.debits)
    for (let i = 0; i < this.debits.length; ++i) {
      if (this.debits[i].isChecked) {
        this.ids.push(this.debits[i].idDebito);
      }
    }
    console.log(this.ids)
  }
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };

  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };
}