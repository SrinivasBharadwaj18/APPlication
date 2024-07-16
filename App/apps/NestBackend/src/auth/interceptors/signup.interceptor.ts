import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor} from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class SignupInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>{
        const request = context.switchToHttp().getRequest()
        let { age } = request.body
        if (age === ""){
            throw new HttpException("age not provided", 400)
        }
        age = +age 
        request.body.age = age
        return next.handle()
    }
}