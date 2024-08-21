import { Body, Controller, HttpException, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ReportDto } from './dtos/report.dto';
import { AuthGuard } from './guards/auth.guard';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cron } from '@nestjs/schedule';
import { BotDto } from './dtos/bot.dto';
import { info } from './types/util.types';
import { JwtGuard } from '../auth/guards/jwt.guard';



@Controller('utils')
export class UtilsController {
    constructor(
        private utilService: UtilsService,
    ){}
    

    @UseGuards(AuthGuard)
    @Post('/pdf')
    writePdfFile(@Body() body: ReportDto,@Request() request, @Query() info:info){
        return this.utilService.writePdf(body, request,info)
    }

    @UseGuards(JwtGuard)
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
  