import {Injectable, Logger, CanActivate, ExecutionContext} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGaurd implements CanActivate{
    private readonly logger = new Logger(AuthGaurd.name)
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //implement authentication
        this.logger.log(`Auth gaurd called`)
        return true
    }
}