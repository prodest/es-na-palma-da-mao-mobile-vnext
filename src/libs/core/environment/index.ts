import { InjectionToken } from '@angular/core'

import { dev } from './environment.dev'
import { prod } from './environment.prod'

const envs = { dev, prod }

export const EnvVariables = new InjectionToken('env.environment')

export * from './environment'

export function environmentFactory() {
  const env = envs[process.env.IONIC_ENV]
  console.log('env: ', env)
  return env
}

// envronment provider
export const EnvironmentProvider = {
  provide: EnvVariables,
  useFactory: environmentFactory
}
