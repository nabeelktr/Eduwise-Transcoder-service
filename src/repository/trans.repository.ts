import { ITranscoderRepository } from "../interfaces/iTransRepository";
import TranscoderModel from "../model/schema/transcoder.schema";
import { Status, Transcoder } from "../model/transcoder.entities";


export class TranscoderRepository implements ITranscoderRepository{

    async getData(id: string): Promise<any> {
        try{
            const response = await TranscoderModel.find({instructorId: id});
            return response
        }catch(e:any){
            console.log(e);
        }
    }

    async addFile(fileName: string, instructorId: string): Promise<any> {
        try{
        const response = await TranscoderModel.create({
            fileName,
            status : Status.transcoding,
            instructorId,
        })
        return {success : true}
    }catch(e:any){
        console.log(e);
    }
    }


}