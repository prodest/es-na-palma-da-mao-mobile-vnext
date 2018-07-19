import { DetranApiService } from './detran-api.service';
import { DetranStorage } from './detran-storage.service';
import { DriverService } from './driver.service';
import { VehiclesService } from './vehicles.service';

export { DetranStorage, DetranApiService, DriverService, VehiclesService };

export const DetranProviders = [DetranStorage, DetranApiService, DriverService, VehiclesService];
