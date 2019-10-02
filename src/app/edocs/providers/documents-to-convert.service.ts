import { Injectable } from "@angular/core";
import { ConvertToPdfPostBody } from "../state";
import { Observable } from "rxjs/Observable";
import { DocumentsToConvertApiService } from './documents-to-convert.api.service';

@Injectable()
export class DocumentsToConvertService {
  constructor(private api: DocumentsToConvertApiService) {}

  convertTopdf(body: ConvertToPdfPostBody): Observable<ArrayBuffer> {
    return this.api.convertToPdf(body);
  }

}