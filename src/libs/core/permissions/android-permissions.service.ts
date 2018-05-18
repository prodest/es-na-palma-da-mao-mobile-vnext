import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/**
 *
 * @export
 * @class CordovaPermissions
 */
@Injectable()
export class AndroidPermissionsService {
  PERMISSION: any;

  /**
   * Creates an instance of CordovaPermissions.
   *
   */
  constructor(private androidPermissions: AndroidPermissions) {
    this.PERMISSION = this.androidPermissions.PERMISSION;
  }

  /**
   *
   */
  requestCoarseLocationPermission() {
    this.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION]);
  }

  checkCoarseLocationPermission(): Promise<any> {
    return this.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION);
  }

  requestPermissions(permissions: string[]): void {
    this.androidPermissions.requestPermissions(permissions);
  }

  requestPermission(permission: string): Promise<any> {
    return this.androidPermissions
      .checkPermission(permission)
      .then(result => {
        if (!result.hasPermission) {
          return this.androidPermissions.requestPermission(permission);
        }
        return result;
      })
      .catch(() => this.androidPermissions.requestPermission(permission));
  }

  checkPermission(permission: string): Promise<any> {
    return this.androidPermissions.checkPermission(permission);
  }
}
