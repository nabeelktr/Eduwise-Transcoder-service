import { Transcoder } from "../model/transcoder.entities"

export interface ITranscoderService {
  addFileDetails(fileName: string, instructorId: string): Promise<Object | null>
  getData(id:string):Promise<Transcoder | null>;
  transcodeMedia(file: File): any;
}
