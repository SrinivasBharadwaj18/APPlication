import { Body, Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { DocxDto } from '../auth/dtos/docx.dto';
import { AuthGuard } from './guards/auth.guard';

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
    writePdfFile(@Body() body: DocxDto,@Request() request, @Query() info:info){
        console.log(typeof(info))
        return this.utilService.writePdf(body, request,info)
    }

}
  