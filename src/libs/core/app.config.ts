import { Inject, Injectable } from '@angular/core'

import { EnvVariables } from './environment'
import { Environment } from './environment/environment'

@Injectable()
export class Config {
    /**
     *
     *
     */
    public get tokenName(): string {
        return `espm-app-jwt-token-${ this.environment.envName }`
    }

    /**
     *
     */
    constructor ( @Inject( EnvVariables ) public environment: Environment ) { }
}
