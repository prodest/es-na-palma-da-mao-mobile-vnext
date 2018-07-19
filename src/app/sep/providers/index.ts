import { SepApiService } from './sep-api.service';
import { SepStorage } from './sep-storage.service';
import { SepService } from './sep.service';

export { SepApiService, SepStorage, SepService };

export const SepProviders = [SepApiService, SepStorage, SepService];
