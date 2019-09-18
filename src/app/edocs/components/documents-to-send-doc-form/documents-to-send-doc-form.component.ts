import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { AlertController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { FormBase } from '@espm/core';
import { DocumentoNatureza } from '../../state';

@Component({
  selector: 'edocs-documents-to-send-doc-form',
  templateUrl: './documents-to-send-doc-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsToSendBasicFormComponent extends FormBase implements OnInit, OnChanges, OnDestroy {

  validationMessages = {
    file: {
      required: 'Obrigatório'
    },
    name: {
      required: 'Obrigatório'
    },
    documentType: {
      required: 'Obrigatório'
    },
    documentPaperType: {
      required: 'Obrigatório'
    },
    documentAssignType: {
      required: 'Obrigatório'
    }
  };

  @Input() file: string;
  @Output() onFileSelect: EventEmitter<string> = new EventEmitter();

  roleOptions = {
    title: 'Cargo / Função',
    subTitle: 'Selecione o cargo ou a função que deseja capturar e encaminhar o documento atual'
  }
  documentTypeOptions = {
    title: 'Tipo de documento',
    subTitle: 'Selecione o tipo do documento atual'
  }
  documentPaperTypeOptions = {
    title: 'Documento em papel',
    subTitle: 'Selecione como o documento em papel foi tirado foto ou escaneado'
  }
  documentAssignTypeOptions = {
    title: 'Tipo de assinatura',
    subTitle: 'Selecione o tipo de assinatura para o documento atual'
  }
  name: string = '';
  role: string = '';
  documentType: number = NaN;
  documentPaperType: number = NaN;
  documentAssignType: number = NaN;

  private subscription: Subscription;

  constructor(formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private fileChooser: FileChooser,
    private filePicker: IOSFilePicker,
    private filePath: FilePath,
    private alertCtrl: AlertController,
    private platform: Platform) {
    super(formBuilder);
  }

  ngOnInit(): void {
    this.subscription = this.form.get('documentType').valueChanges
      .subscribe((value: number) => {
        const documentPaperType = this.form.get('documentPaperType');
        const documentAssignType = this.form.get('documentAssignType');
        documentPaperType.clearValidators();
        documentAssignType.clearValidators();
        documentPaperType.reset(null);
        documentAssignType.reset(null);
        if (value === DocumentoNatureza.Natodigital) { // Documento Eletrônico
          documentAssignType.setValidators([Validators.required]);
        } else if (value === DocumentoNatureza.Digitalizado) { // Documento Escaneado
          documentPaperType.setValidators([Validators.required]);
        }
        this.selectChange();
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('file' in changes) {
      const file: string = changes['file'].currentValue;
      this.form.reset({ file });
      this.cdr.detectChanges();
    }
  }

  isValidNumber(value: any) {
    return typeof value === 'number' && !isNaN(value)
  }

  selectChange(): void {
    this.cdr.detectChanges()
  }

  async chooser(): Promise<void> {
    try {
      const uri = this.platform.is('ios') ? await this.filePicker.pickFile() : await this.fileChooser.open();
      const path = await this.filePath.resolveNativePath(uri)
      this.form.get('file').setValue(path);
      this.onFileSelect.next(path);
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Error catch file chooser', e);
      const alert = this.alertCtrl.create({
        title: 'Erro inesperado',
        message: 'Não foi possível selecionar um arquivo. Tente novamente mais tarde.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  protected createFormModel(): FormGroup {
    return this.formBuilder.group({
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
      documentType: [null, [Validators.required]],
      documentPaperType: [null, []],
      documentAssignType: [null, []]
    });
  }

  protected prepareFormModel(formModel: any) {
    const model = super.prepareFormModel(formModel);
    if (model.documentType === 0) {
      delete model.documentPaperType;
    } else if (model.documentType === 1) {
      delete model.documentAssignType;
    }
    return model;
  }
}
