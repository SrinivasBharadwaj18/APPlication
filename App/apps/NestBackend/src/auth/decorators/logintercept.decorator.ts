import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const intercept = createParamDecorator((data: never, context: ExecutionContext) =>{
    // watch the udemy video on how to do this
    const request = context.switchToHttp().getRequest()
    // request.header = 
})