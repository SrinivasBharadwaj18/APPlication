import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";


@Injectable()
export class TokenInterceptor implements NestInterceptor{
    constructor(
        private AuthService: AuthService
    ){}
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest()
        const { username, password } = request.body
        if (!password){
            throw new BadRequestException("no password")
        }
        const token  = this.AuthService.validateGetToken({username,password})

        const response = context.switchToHttp().getResponse()
        response.setHeader('Authorization', `Bearer ${token}`)
        
        return next.handle()
    }
}