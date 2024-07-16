import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class UpdateInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest()
        const {username, password, emailid, firstname, lastname} = request.body
        let { age } = request.body
        
        if (username === '') {
            request.body.username = undefined;
        }
        if (password === '') {
            request.body.password = undefined;
        }
        if (emailid === '') {
            request.body.emailid = undefined;
        }
        if (firstname === '') {
            request.body.firstname = undefined;
        }
        if (lastname === '') {
            request.body.lastname = undefined;
        }
        if (age === '') {
            request.body.age = undefined;
        }
        if (age !== ''){
            age = +age 
            request.body.age = age
        }
        
        return next.handle()
    }
}