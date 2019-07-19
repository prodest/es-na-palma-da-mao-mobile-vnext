import { Injectable } from "@angular/core";
import { DocumentsToSendApiService } from "./documents-to-send.api.service";
import { Destination } from "./documents.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class DocumentsToSendService {

    constructor(private api: DocumentsToSendApiService){}

    getDestinations(): Observable<Destination[]> {
        return this.api.getDestinations();
    } 
}