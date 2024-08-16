import { Body, Controller, HttpException, Patch, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ReportDto } from './dtos/docx.dto';
import { AuthGuard } from './guards/auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cron } from '@nestjs/schedule';
import { BotDto } from './dtos/bot.dto';

export interface info {
    device_id:string
    device_type:string
    report_type:string
    template_name:string
}


@Controller('utils')
export class UtilsController {
    constructor(
        private utilService: UtilsService,
    ){}
    

    @UseGuards(AuthGuard)
    @Post('/pdf')
    writePdfFile(@Body() body: ReportDto,@Request() request, @Query() info:info){
        console.log(typeof(info))
        return this.utilService.writePdf(body, request,info)
    }


    
    @Patch('update/json')
    private async update(@Query() fileName: string, @Body() body: any){
        return this. utilService.getData(fileName, body)
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './uploadedFiles',
            filename(req, file, callback) {
                const filename = file.originalname
                callback(null,filename)
            },
        })
    }))
    uploadFile(@UploadedFile() file:Express.Multer.File){
        if(!file) throw new HttpException("no file submitted",400)
        console.log("file:", file)
        return "we have the file"
    }


    @Post('/bot')
    async Bot(@Body() input:BotDto){
        const botMessage = await this.utilService.getBotMessage(input)
        return botMessage
    }

    @Cron('0 30 19 * * 1-5')
    async handleSaveFile(){
        return await this.utilService.saveFile()
    }
}
  