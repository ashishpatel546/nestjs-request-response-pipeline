import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { RequestService } from "src/request.service";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware{
    private readonly logger= new Logger(AuthenticationMiddleware.name, {timestamp: true});

    constructor(private readonly requestService: RequestService){}

    use(req: Request, res: Response, next:NextFunction) {
        //Authenticate Request
        this.logger.log(AuthenticationMiddleware.name)
        const userId = '123';
        this.requestService.setUserId = userId
        next()
    }
}