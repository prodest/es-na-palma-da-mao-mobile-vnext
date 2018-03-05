import { Token } from './models/token'
import { User } from './models/user'

export interface AuthStorageModel {
  user: User
  accessToken: Token
  refreshToken: any
  clientId: string
  avatarUrl: string
}
