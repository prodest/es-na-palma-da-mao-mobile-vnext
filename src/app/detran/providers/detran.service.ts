import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { flatMap } from 'rxjs/operators'

import { DriverLicense } from './../model/driverLicense'
import { DetranApiService } from './detran-api.service'
import { DetranStorage } from './detran-storage.service'

/**
 *
 *
 */
@Injectable()
export class DetranService {
    /**
     *
     *
     */
    get cnh(): DriverLicense {
        return this.storage.getValue( 'driverLicense' )
    }

    /**
     *
     *
     */
    constructor ( private storage: DetranStorage, private api: DetranApiService ) { }

    /**
     *
     *
     */
    saveCNH = ( cnh: DriverLicense ): Observable<DriverLicense> => {
        return this.api.saveCNH( cnh ).pipe( flatMap(() => this.storage.setValue( 'driverLicense', cnh ) ) )
    }
}
