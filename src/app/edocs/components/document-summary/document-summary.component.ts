import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionSheetController, AlertController } from 'ionic-angular';

import { Document } from '../../state';

@Component({
  selector: 'edocs-document-summary',
  templateUrl: 'document-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentSummaryComponent {
  @Input() document: Document;
  @Output() refuse = new EventEmitter<Document>();
  @Output() block = new EventEmitter<Document>();
  @Output() unblock = new EventEmitter<Document>();
  @Output() sign = new EventEmitter<Document>();
  @Output() donwload = new EventEmitter<Document>();
  @Output() showDetails = new EventEmitter<Document>();

  /**
   *
   */
  constructor(private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {}

  /**
   *
   */
  showDocumentOptions = (document: Document) => {
    const buttons = [];

    if (!document.isBloqueadoParaAssinaturas) {
      buttons.push({
        text: 'Recusar',
        icon: 'md-thumbs-down',
        handler: () => {
          this.refuse.emit(document);
        }
      });

      buttons.push({
        text: 'Bloquear assinaturas',
        icon: 'md-lock',
        handler: () => {
          this.tryBlockDocument(document);
        }
      });
    }

    if (document.isBloqueadoParaAssinaturas) {
      buttons.push({
        text: 'Desbloquear assinaturas',
        icon: 'md-unlock',
        handler: () => {
          this.tryUnblockDocument(document);
        }
      });
    }

    buttons.push({
      text: 'Ver detalhes',
      icon: 'md-eye',
      handler: () => {
        this.showDetails.emit(document);
      }
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: `${document.nome}`,
      buttons
    });
    actionSheet.present();
  };

  /**
   *
   *
   */
  tryBlockDocument = (document: Document): void => {
    let alert = this.alertCtrl.create({
      title: 'Bloquear assinaturas',
      message: `Ao bloquear o documento, não será possível assiná-lo ou recusá-lo enquanto o documento estiver bloqueado. Deseja bloquear assinaturas do documento ${
        document.nome
      }?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Bloquear',
          handler: () => {
            this.block.emit(document);
          }
        }
      ]
    });
    alert.present();
  };

  /**
   *
   *
   */
  tryUnblockDocument = (document: Document): void => {
    let alert = this.alertCtrl.create({
      title: 'Desbloquear assinaturas',
      message: `Ao desbloquear o documento, ele estará liberado para receber novas assinaturas ou recusas. Deseja desbloquear assinaturas do documento ${
        document.nome
      }?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Desbloquear',
          handler: () => {
            this.unblock.emit(document);
          }
        }
      ]
    });
    alert.present();
  };
}
