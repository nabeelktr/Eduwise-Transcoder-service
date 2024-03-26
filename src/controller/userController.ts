import { Request, Response, NextFunction } from "express";
import { ITranscoderService } from "../interfaces/iTransService";
import { CustomRequest } from "../interfaces/iRequest";
import fs from 'fs';
import { FFmpegTranscoder } from "../utils/ffmpeg";


export default class TranscoderController {
  constructor(private service: ITranscoderService) {}

  transcodeData = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const file: any = req.file  
        const instructorId = req?.userId as string;
        const response = await this.service.addFileDetails(file?.originalname, instructorId)
        res.json()
        FFmpegTranscoder(file?.buffer);

    } catch (e: any) {
        next(e)
    }
  };

  getData = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const instructorId = req?.userId as string;
        const response = await this.service.getData(instructorId)
        res.status(201).json(response)
    }catch(e:any){
        next(e)
    }
}
}
