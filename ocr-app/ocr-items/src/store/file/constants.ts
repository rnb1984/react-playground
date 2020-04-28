
export const API_ENDPOINT = 'http://127.0.0.1:5000/upload-image';


export enum FileFormypeEnum {
    FILE_FORM = 'file/file-form'
  }
  
 export interface IFileForm {
   form?: FormData;
 } 