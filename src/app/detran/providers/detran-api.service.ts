import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { EnvVariables } from '@espm/core'
import { Observable } from 'rxjs/Observable'
import { share } from 'rxjs/operators'

import { DriverLicense } from '../model'

/**
 *
 *
 */
@Injectable()
export class DetranApiService {
    /**
     *
     *
     */
    constructor ( private http: HttpClient, @Inject( EnvVariables ) private env ) { }

    /**
     *
     */
    saveCNH = ( license: DriverLicense ): Observable<any> => {
        const model = { numero: license.registerNumber, cedula: license.ballot }
        return this.http.post<any>( `${ this.env.api.acessocidadaoApi }/Perfil/SalvarCNH`, model ).pipe( share() )
    }
}
