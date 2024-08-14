// import { HttpException, Injectable } from '@nestjs/common';
// import * as fs from 'fs'
// import { DocxDto } from '../auth/dtos/docx.dto';
// import pdf from 'pdf-creator-node';
// import { info } from './utils.controller';

// const BASE_PATH = `././apps/NestBackend/public/`

// @Injectable()
// export class UtilsService {


//     getReportData(template:string,body: DocxDto){
//         let match:RegExpExecArray;
//         const regex = /\{\{(\w+)\}\}/g;
//         const wordsArray:string[]= [];
        
//         while ((match = regex.exec(template)) !== null) {
//             wordsArray.push(match[1]);
//           }

//           const fieldObj:{[key:string]:string} = {}

//           wordsArray.forEach((field) =>{
//               fieldObj[field] = body[field]
//           })
        
//         return fieldObj
//     }

//     generateReport(template:string,body:DocxDto,id:string, info: info){

//         const currentTime = new Date().toISOString().replace(/[-:.]/g, '_')
//         const fieldObj = this.getReportData(template,body)
//         const {device_id, report_type,device_type} = info

//           const options = {
//             format: 'A4',
//             orientation: 'portrait',
//             border: '10mm',
//         };

//         const document = {
//             html: template,
//             data: fieldObj,
//             path:`${BASE_PATH}${id}/reports/${device_id}_${device_type}${report_type}_${currentTime}.pdf`,
//             type: '',
//         };
        
//         pdf.create(document, options)
//             .then(() => {
//                 return "report created"
//             })
//             .catch(() => {
//                 throw new HttpException("The report is not generated",400 )
//             });


//     }

//     writePdf(body: DocxDto, request, info:info){


//         const {id} = request.user
//         const{template_name,device_type} = info
        
//         const htmlTemplate = fs.readFileSync(`${BASE_PATH}${device_type}/${template_name}.html`,'utf-8')

//         if(!fs.existsSync(`${BASE_PATH}${request.user.id}`))
//             fs.mkdirSync(`${BASE_PATH}${request.user.id}`)
        
//         return this.generateReport(htmlTemplate,body,id, info)
//     }

// }


// // public> template>>> reports>>> template1, 2, 3
// /// type(reports/logs) :enum
// /// template number
// ///file should be saved as time_template.docx
// /// {device_id}{report_type}





