import { VehiclesStore } from './vehicle.store';
import { Vehicle, createVehicle } from './vehicle.model';
import { Injectable } from '@angular/core';
import { TranscolOnlineRealTimeService } from '../../providers';
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs/Subscription';

type UpdateOptions = {
  autoReloadInterval?: number,
  vehicleMaxAge?: number
}
@Injectable()
/**
 * Entidade que alimenta a VehiclesStore.
 */
export class VehiclesService {
  private autoReloadSubscription: Subscription;
  private options: UpdateOptions = {
    autoReloadInterval: undefined,
    vehicleMaxAge: undefined
  };

  constructor(
    protected store: VehiclesStore,
    private apiRealtime: TranscolOnlineRealTimeService
  ) {

  }
  /**
   * Atualiza os veículos na Store à partir de um ponto de ônibus dado como referência.
   * @param {number} stopId - ID do ponto que deve ser usado como referência para carregar a Store.
   * @param {UpdateOptions} opts - Modificadores de comportamento.
   * @param opts.autoReloadInterval - Define o intervalo em segundos para atualizar automaticamente a Store com o stopId fornecido. Opcional. Default: false.
   * @param opts.vehicleMaxAge - Define um prazo de expiração para o veículo armazenado.
   */
  updateVehicles(stopId: number, opts?: UpdateOptions) {
    // atualiza as opções de comportamento do update
    if (opts) this.options = {...this.options, opts} as UpdateOptions;

    // checa se há um ponto como referência
    if (stopId === null) return;

    // console.log(stopId);

    // ativa o estado de Loading da Store
    this.store.setLoading(true);
    
    this.apiRealtime.getNextVehicles(stopId)
    .subscribe({
      next: (vehicles: Array<Vehicle>) => {
        
        // marca todos os veículos como "não atualizado"
        this.store.updateAll({
          atualizado: false
        });

        // insere ou atualiza os veículos na store
        vehicles.map(
          (vehicle) => {
            const newVehicle: Vehicle = createVehicle(vehicle);
            if (newVehicle.ignicao) {
              this.store.upsert(
                newVehicle.rotulo, 
                (vehicle: Vehicle): Vehicle => ({
                  ...newVehicle,
                  passou: vehicle.distancia &&
                          vehicle.distancia < 50 && 
                          vehicle.distancia < newVehicle.distancia && 
                          !vehicle.passou
                          ? true : vehicle.passou
                } as Vehicle)
              );
            }
          }
        );

        // remove todos os veículos que não foram atualizados
        this.store.remove(vehicle => !vehicle.atualizado);

        // remove os dados que expiraram
        if (this.options.vehicleMaxAge) this.store.remove(vehicle => Date.now() - vehicle.datahora < opts.vehicleMaxAge);

        // console.log("VehiclesStore loaded!");
        this.store.setLoading(false);

        // se configurado, inicia o reload automático
        if (this.options.autoReloadInterval) this.startAutoReload(this.options.autoReloadInterval, stopId);
      },
      error: (error) => {
        console.error("ERROR", error);
        this.store.setLoading(false);
      }
    });
  }

  /**
   * Inicia o reload automático
   * @param {number} intervalInSeconds - Intervalo, em segundos, que o reload será excutado.
   * @param {number} stopId - ID do ponto que deve ser usado como referência para carregar a Store.
   */
  startAutoReload(intervalInSeconds: number, stopId: number) {
    // checa (e finaliza) se já houver um reload
    this.stopAutoReload();

    // define um novo reload com o stopId informado
    this.autoReloadSubscription = interval(intervalInSeconds * 1000).subscribe(() => this.updateVehicles(stopId));
  }

  /**
   * Finaliza o reload automático
   */
  stopAutoReload() {
    // se houver um reload e não estiver "closed", ele será finalizado
    if (this.autoReloadSubscription !== undefined && !this.autoReloadSubscription.closed) {
      this.autoReloadSubscription.unsubscribe();
    }
  }

  /**
   * Remove todos os veículos da Store.
   */
  clearVehicles() {
    this.store.reset();
  }
}
