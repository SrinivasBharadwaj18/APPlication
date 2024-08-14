import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { AnyObject, Model } from 'mongoose';
import { SignUpUserDto } from './dtos/SignUpUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../users/dtos/UpdateUser.dto';
import { Users } from '../users/schemas/users.schema';
import { Roles } from '../users/schemas/roles.schema';
import * as fs from 'fs'
import { promisify } from 'util';
import { Chat } from './schemas/chat.schema';
import { BotDto } from './dtos/bot.dto';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { DocxDto } from './dtos/docx.dto';
import WordExtractor from "word-extractor"; 
import pdf from 'pdf-creator-node';

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

interface restrictedFeatures{

    restrictedFeatures: string[] | []
        
}

@Injectable()
export class AuthService {

    constructor(
        private JwtService : JwtService,
        @InjectModel(Users.name)
        private UsersModel: Model<Users>,
        @InjectModel(Roles.name)
        private RolesModel: Model<Roles>,
        @InjectModel(Chat.name)
        private ChatModel: Model<Chat>
    ){}

    checkRole(role: string):restrictedFeatures{
        if(role === "basic user"){
            console.log(role)
            const ResFeatures:restrictedFeatures = {
                restrictedFeatures: ['test', 'create user']
            }
            return ResFeatures   
        }
        else if(role === "admin"){
            const ResFeatures:restrictedFeatures = {
                restrictedFeatures: []
            }
            return ResFeatures
        }    

    }


       async signup(signupUser: SignUpUserDto): Promise<Users>{ 
        const {username,password, role}  = signupUser
        const user = await this.UsersModel.findOne({username})
        signupUser.password =await bcrypt.hash(password,10)
        if(user){
            throw new UnauthorizedException("user already present")
        }
        const ResFeatures = this.checkRole(role)
        console.log(ResFeatures)
        const presentrole = await this.RolesModel.findOne({rolename: role})
        console.log("role: ",presentrole)

        if(!presentrole){
            const roles = new this.RolesModel({rolename: role, restrictedFeatures:ResFeatures.restrictedFeatures})
            console.log(roles)
            const savedRoles = await roles.save()
            const createdUser = await this.UsersModel.create({...signupUser, role: savedRoles._id})
            await createdUser.save()
            return createdUser
        }  
        const createdUser = await this.UsersModel.create({...signupUser,role: presentrole._id})
        await createdUser.save()
        return createdUser
    }




    async getData(fileName: string, body:any){
        const FOLDER_NAME = '././apps/NestBackend/public'
        const actions:string = await readFile(`${FOLDER_NAME}/ ${fileName}`,'utf-8')
        const data:string = await readFile('././apps/NestBackend/public/data.json','utf-8')
        const myArr:unknown = JSON.parse(data)
        const actionArr:unknown = JSON.parse(actions)
        myArr["actions"] = actionArr
        const resData:string = JSON.stringify(myArr)
        await writeFile('././apps/NestBackend/public/data.json',resData,'utf-8')
    }


    async login(loginUser: LoginUserDto): Promise<{token: string}>{
        const { username } = loginUser
        const user = await this.UsersModel.findOne({username})      
        const token = this.JwtService.sign({id:user._id})
        return {token}
        }

    async findOne(username:string){
        const user = await this.UsersModel.findOne({username})
        return user
    }

    async validateUser(username : string, password: string):Promise<Users>{
        const user = await this.UsersModel.findOne({username})
        if (!user){
            throw new UnauthorizedException("signup first")
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException("invalid password")
        }
        return user
    }

    async finduser(userId: string){
        return this.UsersModel.findById(userId)

    }


    async updateUser(id: string, UpdateUser: UpdateUserDto){
        const validate = mongoose.Types.ObjectId.isValid(id)

        if(!validate){
            throw new HttpException("invalid user", 400)
        }
        const {password} = UpdateUser
        if(password === undefined){
            const user = await this.UsersModel.findByIdAndUpdate(id,UpdateUser, {new: true})
            return user
        }
        UpdateUser.password = await bcrypt.hash(password,10)
        const user = await this.UsersModel.findByIdAndUpdate(id,UpdateUser, {new: true})
        if(!user){
            throw new HttpException("user not found",400)
        }
        return user
    }

    async getAllUsers(): Promise<(mongoose.Document<unknown, AnyObject, Users> & Users & {
        _id: mongoose.Types.ObjectId;
    })[]>{
        const users = await this.UsersModel.find()
        console.log(users)
        return this.UsersModel.find()
    }

    async getBotMessage(info:BotDto){
        const {message , id, source, timestamp} = info
        const findId = await this.ChatModel.findOne({userId: id})
        const livechat = [{source, timestamp, message}]
        const chat = livechat[0] 
        const userID = new mongoose.Types.ObjectId(id)
        if (!findId){
            const chatLog = await this.ChatModel.create({livechat:livechat,userId:userID})
            console.log("created chat: ",chatLog)
            return message
        }
        else{
            const chatlog = await this.ChatModel.findOneAndUpdate({userId: id},{$push: {livechat:chat}},{new:true})   
            console.log("updated chat: ",chatlog)
            return message
        } 

    }

    async saveFile(){
        const document = await this.ChatModel.find()
        document.map((userlog)=>{
            const {_id, livechat} = userlog
            const currentDate = new Date().toDateString()

            const chatLog = {[currentDate]:livechat}
            const file=JSON.stringify(chatLog)
            writeFile(`././apps/NestBackend/public/${_id}.json`,file,'utf-8')
        })
    }

    async writeWord(body: DocxDto){
        const extractor = new WordExtractor();
        const extracted = await extractor.extract(`././apps/NestBackend/public/Sample_template.docx`);
        const wordText:string = extracted.getBody()
        const regex = /\{([^}]+)\}/g;
        let match:RegExpExecArray;
        const wordsArray:string[]= [];
      
        while ((match = regex.exec(wordText)) !== null) {
          wordsArray.push(match[1]);
        }
        const template = fs.readFileSync(`././apps/NestBackend/public/Sample_template.docx`)
        const zip = new PizZip(template) 
        const doc = new Docxtemplater(zip,{
            paragraphLoop: true,
            linebreaks: true,
        })

        const fieldObj:{[key:string]:string} = {}
        wordsArray.forEach((field) =>{
            fieldObj[field] = body[field]
        })
        doc.render(fieldObj)
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        fs.writeFileSync(`././apps/NestBackend/public/output.docx`,buf)
    }



    writePdf(data,body: DocxDto){
        const path = `././apps/NestBackend/public`
        const template = data.template
        const htmlTemplate = fs.readFileSync(`${path}template/${template}`,'utf-8')
        const regex = /\{\{(\w+)\}\}/g;
        let match:RegExpExecArray;
        const currentTime = new Date().getTime().toLocaleString()
        const wordsArray:string[]= [];
        if(!fs.existsSync(data.userid))
            fs.mkdirSync(data.userid)
      
        while ((match = regex.exec(htmlTemplate)) !== null) {
          wordsArray.push(match[1]);
        }
        console.log(wordsArray)
        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
        };

        const fieldObj:{[key:string]:string} = {}
        wordsArray.forEach((field) =>{
            fieldObj[field] = body[field]
        })
        
        const document = {
            html: htmlTemplate,
            data: fieldObj,
            path:`${path}/${data.userid}/${currentTime}.pdf`,
            type: '',
        };
        
        pdf.create(document, options)
            .then((res) => {
                console.log('PDF generated successfully:', res.filename);
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    }

}
