import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class UpdateInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest()
        const {username, password, emailid, firstname, lastname ,age } = request.body
        request.body.username = username || undefined;
        request.body.password = password || undefined;
        request.body.emailid = emailid || undefined;
        request.body.firstname = firstname || undefined;
        request.body.lastname = lastname || undefined;
        request.body.age = +age || undefined;
        
        return next.handle()
    }
}