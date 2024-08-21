import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { ReportDto } from './dtos/report.dto';
import pdf from 'pdf-creator-node';
import { info } from './types/util.types';
import { promisify } from 'util';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schema';
import { BotDto } from './dtos/bot.dto';

const BASE_PATH = `././apps/NestBackend/public/`
const writeFile = promisify(fs.writeFile)

@Injectable()
export class UtilsService {

    constructor(
        @InjectModel(Chat.name)
        private ChatModel: Model<Chat>
    ){}


    getReportData(template:string,body: ReportDto){
        let match:RegExpExecArray;
        const regex = /\{\{(\w+)\}\}/g;
        const wordsArray:string[]= [];
        
        while ((match = regex.exec(template)) !== null) {
            wordsArray.push(match[1]);
          }

          const fieldObj:{[key:string]:string} = {}

          wordsArray.forEach((field) =>{
              fieldObj[field] = body[field]
          })
        
        return fieldObj
    }

    async generateReport(template:string,body:ReportDto,id:string, info: info){

        const currentTime = new Date().toISOString().replace(/[-:.]/g, '_')
        const fieldObj = this.getReportData(template,body)
        const {device_id, report_type,device_type} = info

          const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
        };

        const document = {
            html: template,
            data: fieldObj,
            path:`${BASE_PATH}${id}/reports/${device_id}_${device_type}${report_type}_${currentTime}.pdf`,
            type: '',
        };
        
        pdf.create(document, options)
            .catch(() => {
                throw new HttpException("The report is not generated",400 )
            });

            return "report created"


    }

    async writePdf(body: ReportDto, request, info:info){


        const {id} = request.user
        const{template_name,device_type} = info
        
        const htmlTemplate = fs.readFileSync(`${BASE_PATH}${device_type}/${template_name}.html`,'utf-8')

        if(!fs.existsSync(`${BASE_PATH}${request.user.id}`))
            fs.mkdirSync(`${BASE_PATH}${request.user.id}`)
        
        return await this.generateReport(htmlTemplate,body,id, info)
    }

    async getBotMessage(info:BotDto){
        const {message , id, source, timestamp} = info
        const findId = await this.ChatModel.findOne({userId: id})
        const livechat = [{source, timestamp, message}]
        const chat = livechat[0] 
        const userID = new mongoose.Types.ObjectId(id)
        if (!findId){
            await this.ChatModel.create({livechat:livechat,userId:userID})
            return message
        }
        else{
            await this.ChatModel.findOneAndUpdate({userId: id},{$push: {livechat:chat}},{new:true})   
            return message
        } 

    }
//
    async saveFile(){
        const document = await this.ChatModel.find()
        document.map((userlog)=>{
            const {_id, livechat} = userlog
            const currentDate = new Date().toDateString()

            const chatLog = {[currentDate]:livechat}
            const file=JSON.stringify(chatLog)
            writeFile(`${BASE_PATH}${_id}.json`,file,'utf-8')
        })
    }

}
