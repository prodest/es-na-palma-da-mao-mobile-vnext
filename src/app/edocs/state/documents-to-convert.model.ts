import { DocumentFile } from "./documents-to-send.model";

// INTERFACES
export interface ConvertToPdfPostBody {
    size: string; 
    landscape: boolean;
    horizontalAlign: HorizontalAlign;
    verticalAlign: VerticalAlign;
    image: DocumentFile;
  }


// ENUNS
export enum HorizontalAlign {
    LEFT='left',
    CENTER='center',
    RIGHT='right'
  }
  
export enum VerticalAlign {
    TOP='top',
    MIDDLE='middle',
    BOTTOM='bottom'
}