import { dev } from './environment.dev'
import { Environment } from './environment'

/* eslint-disable */
export const prod: Environment = { ...dev, ...{ production: true, envName: 'prod' } }
