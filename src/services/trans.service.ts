import { ITranscoderRepository } from "../interfaces/iTransRepository";
import { ITranscoderService } from "../interfaces/iTransService";
import { Transcoder } from "../model/transcoder.entities";


export class TranscoderService implements ITranscoderService {

    constructor(private repository: ITranscoderRepository){}
    
    transcodeMedia(file: File) {
        throw new Error("Method not implemented.");
    }

    async getData(id: string): Promise<any> {
        try{
            const response = await this.repository.getData(id)
            return response;
        }catch(e:any){
            console.log(e);
        }
    }

    async addFileDetails(fileName: string, instructorId:string): Promise<any> {
        try{
            const response = await this.repository.addFile(fileName, instructorId);
            return response;
        }catch(e:any){
            console.log(e);
        }
    }

}