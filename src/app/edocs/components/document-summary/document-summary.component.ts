import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

import { Document, ManifestacaoUsuario } from '../../state';

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
  @Output() open = new EventEmitter<Document>();
  @Output() showDetails = new EventEmitter<Document>();

  ManifestacaoUsuario = ManifestacaoUsuario;

  /**
   *
   */
  constructor(private actionSheetCtrl: ActionSheetController) {}

  /**
   *
   */
  showDocumentOptions = (document: Document) => {
    const buttons = [];

    if (!document.isBloqueadoParaAssinaturas) {
      // só pode recusar se não se manifestou
      // todo
      // if (document.manifestacaoUsuario === ManifestacaoUsuario.NaoSeManifestou) {
      //   buttons.push({
      //     text: 'Recusar',
      //     icon: 'md-thumbs-down',
      //     handler: () => {
      //       this.refuse.emit(document);
      //     }
      //   });
      // }

      buttons.push({
        text: 'Bloquear assinaturas',
        icon: 'md-lock',
        handler: () => {
          this.block.emit(document);
        }
      });
    }

    if (document.isBloqueadoParaAssinaturas) {
      buttons.push({
        text: 'Desbloquear assinaturas',
        icon: 'md-unlock',
        handler: () => {
          this.unblock.emit(document);
        }
      });
    }

    // todo
    // buttons.push({
    //   text: 'Ver detalhes',
    //   icon: 'md-eye',
    //   handler: () => {
    //     this.showDetails.emit(document);
    //   }
    // });

    let actionSheet = this.actionSheetCtrl.create({
      title: `${document.nome}`,
      buttons
    });
    actionSheet.present();
  };
}
