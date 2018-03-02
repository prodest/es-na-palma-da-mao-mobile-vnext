import { DriverStatusName } from './driver-status-name'

export interface DriverStatus {
    status: DriverStatusName
    blockMotive?: string
    expirationDate: string
    hasTickets: boolean
    acquiringLicense: boolean
    hasAdministrativeIssues: boolean
}
