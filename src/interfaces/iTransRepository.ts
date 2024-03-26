import { Transcoder } from "../model/transcoder.entities";


export interface ITranscoderRepository {
  addFile(fileData: string, instructorId: string): Promise<Object | null>;
  getData(id:string):Promise<Transcoder | null>;
}
