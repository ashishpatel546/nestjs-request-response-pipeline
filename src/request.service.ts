import {Injectable, Scope} from  '@nestjs/common'

@Injectable({scope: Scope.REQUEST})
export class RequestService{
    private userId:string;

    set setUserId(userId: string){
        this.userId = userId
    }

    get getUserId(){
        return this.userId
    }
}