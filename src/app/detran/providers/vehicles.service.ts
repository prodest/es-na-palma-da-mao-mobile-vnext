import { Injectable } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { catchError, finalize, flatMap, map, pluck } from 'rxjs/operators';

import { Ticket, Vehicle, VehiclesData, Debit } from '../model';
import { DetranApiService } from './detran-api.service';
import { DetranStorage } from './detran-storage.service';

/**
 *
 *
 */
@Injectable()
export class VehiclesService {
  loading: Loading;

  get vehicles$(): Observable<Vehicle[]> {
    return this.storage.all$.pipe(pluck('vehicles'));
  }

  /**
   *
   *
   */
  get ready(): Promise<any> {
    return this.storage.ready;
  }

  /**
   *
   *
   */
  constructor(
    private api: DetranApiService,
    private storage: DetranStorage,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  /**
   *
   *
   */
  add = (vehicle: Vehicle): Observable<Vehicle[]> => {
    if (this.storage.containsVehicle(vehicle)) {
      this.showMessage('Placa ou RENAVAM já cadastrados');
      return of(this.storage.getValue('vehicles'));
    }

    this.showLoading();

    return this.api.getVehicleInfo(vehicle).pipe(
      map((extra: Partial<Vehicle>) => ({ ...vehicle, ...extra })),
      flatMap(this.syncVehicle),
      finalize(this.dismissLoading),
      catchError(error => {
        if (error.status === 404) {
          this.showMessage('Veículo não encontrado na base do DETRAN.');
        } else {
          this.showMessage('Erro ao salvar veículo. Tente novamente.');
        }
        return _throw(error);
      })
    );
  };

  /**
   *
   *
   */
  remove(vehicle: Vehicle): Observable<Vehicle[]> {
    let vehicles = this.storage.getValue('vehicles');

    // remove veículo e sincroniza altrações com o servidor
    vehicles = vehicles.filter((v1: Vehicle) => {
      return v1.plate !== vehicle.plate && v1.renavam !== vehicle.renavam;
    });

    this.showLoading();

    return this.syncVehicles(vehicles).pipe(
      finalize(this.dismissLoading),
      catchError(error => {
        this.showMessage('Erro ao remover veículo.');
        return _throw(error);
      })
    );
  }

  /**
   *
   *
   */
  load = (): Observable<Vehicle[]> => {
    // sincroniza veículos do servidor com armazenamento local
    this.showLoading();
    return this.syncVehicles().pipe(finalize(this.dismissLoading));
  };

  /**
   *
   *
   */
  getTickets = (vehicle: Vehicle): Observable<Ticket[]> => {
    this.showLoading();
    return this.api.getVehicleTickets(vehicle).pipe(finalize(this.dismissLoading));
  };

  getDebits = (vehicle: Vehicle): Observable<Debit[]> => {
    this.showLoading();
    return this.api.getVehicleDebits(vehicle).pipe(finalize(this.dismissLoading));
  };

  /**
   *
   *
   */
  private syncVehicle = (vehicle: Vehicle): Observable<Vehicle[]> => {
    return this.syncVehicles([...this.storage.getValue('vehicles'), vehicle]);
  };

  /**
   *
   *
   */
  private syncVehicles = (vehicles?: Vehicle[]): Observable<Vehicle[]> => {
    const syncData: VehiclesData = { vehicles: [], date: null };

    if (vehicles) {
      syncData.vehicles = vehicles;
      syncData.date = new Date().toISOString();
    }

    return this.api
      .syncVehicles(syncData)
      .pipe(flatMap((vehiclesData: VehiclesData) => this.storage.mergeValue('vehicles', this.normalizeVehicle(vehiclesData.vehicles))));
  };

  /**
   *
   *
   */
  private showLoading = (message: string = 'Aguarde') => {
    if (this.loading) {
      this.loading.setContent(message);
    } else {
      this.loading = this.loadingCtrl.create({ content: message, dismissOnPageChange: true });
      this.loading.present();
    }
  };

  /**
   *
   *
   */
  private dismissLoading = () => {
    if (this.loading) {
      this.loading.dismiss().catch(console.log);
      this.loading = null;
    }
  };

  /**
   *
   *
   */
  private showMessage = (message: string) => {
    this.toastCtrl.create({ message, duration: 4000 }).present();
  };

  /**
   *
   */
  private normalizeVehicle = (data: any) => {
    return data.map((vehicle: any) => {
      if (vehicle.info) {
        return {
          color: vehicle.info.color,
          model: vehicle.info.model,
          plate: vehicle.plate,
          renavam: vehicle.renavam
        };
      } else {
        return vehicle;
      }
    });
  };
}
