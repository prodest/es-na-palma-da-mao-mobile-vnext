import { Vehicle } from './../model'

export interface DetranStorageModel {
  vehicles: Vehicle[]
  clientId: string
  avatarUrl: string
}
