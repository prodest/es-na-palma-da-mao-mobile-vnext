import { DriverLicense, Vehicle, VehicleData } from './../model'

export interface DetranStorageModel {
    vehicles: Vehicle[]
    driverLicense: DriverLicense
    vehiclesData: VehicleData
    clientId: string
    avatarUrl: string
}
