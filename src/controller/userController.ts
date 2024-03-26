import { Request, Response, NextFunction } from "express";
import { ITranscoderService } from "../interfaces/iTransService";
import { CustomRequest } from "../interfaces/custom";
import fs from 'fs';
import { FFmpegTranscoder } from "../utils/ffmpeg";
import { Transcoder } from "../model/transcoder.entities";


export default class TranscoderController {
  constructor(private service: ITranscoderService) {}

  transcodeData = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const file: any = req.file  
        const instructorId = req?.userId as string;
        const response: any = await this.service.addFileDetails(file?.originalname, instructorId)
        res.json()
        this.service.transcodeMedia(file?.buffer, response?._id);
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
