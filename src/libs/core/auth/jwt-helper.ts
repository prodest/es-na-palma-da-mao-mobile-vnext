import { Injectable } from '@angular/core'

import { Token } from './models'

/**
 * Extraído de https://github.com/auth0/angular2-jwt/blob/master/angular2-jwt.ts
 */
@Injectable()
export class JwtHelper {
  /**
   *
   *
   */
  private urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/')

    // tslint:disable:no-switch-case-fall-through
    switch (output.length % 4) {
      case 0: {
        break
      }
      case 2: {
        output += '=='
        break
      }
      case 3: {
        output += '='
        break
      }
      default: {
        throw new Error('Illegal base64url string!')
      }
    }
    return this.b64DecodeUnicode(output)
  }

  /**
   *  // credits for decoder goes to https://github.com/atk
   *
   */
  private b64decode(str: string): string {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let output: string = ''

    str = String(str).replace(/=+$/, '')

    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.")
    }

    // tslint:disable:no-conditional-assignment
    // tslint:disable:one-variable-per-declaration
    for (
      // initialize result and counters
      let bc: number = 0, bs: any, buffer: any, idx: number = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer)
    }
    return output
  }

  /**
   *  https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
   *
   */
  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(
      Array.prototype.map
        .call(this.b64decode(str), (c: any) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  }

  /**
   *
   *
   */
  public decodeToken(token: Token): any {
    let parts = token.split('.')

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts')
    }

    let decoded = this.urlBase64Decode(parts[1])
    if (!decoded) {
      throw new Error('Cannot decode the token')
    }

    return JSON.parse(decoded)
  }

  /**
   *
   *
   */
  public getTokenExpirationDate(token: Token): Date {
    let decoded: any
    decoded = this.decodeToken(token)

    if (!decoded.hasOwnProperty('exp')) {
      return null
    }

    let date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp)

    return date
  }

  /**
   *
   *
   */
  public getNotBeforeDate(token: Token): Date {
    let decoded: any
    decoded = this.decodeToken(token)

    if (!decoded.hasOwnProperty('nbf')) {
      return null
    }

    let date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.nbf)

    return date
  }

  /**
   *
   *
   */
  public isTokenExpired(token: Token, date: Date = new Date()): boolean {
    const exp = this.getTokenExpirationDate(token)

    if (exp == null) {
      return false
    }

    // Token expired?
    return date.valueOf() >= exp.valueOf()
  }

  /**
   *
   *
   */
  public isTokenIsExpiringIn(token: Token, date: Date = new Date()) {
    const exp = this.getTokenExpirationDate(token).valueOf() // data de expiração do token (em ms)
    const nbf = this.getNotBeforeDate(token).valueOf() // data  de início de validade do token (em ms)

    const expiresIn = exp - nbf // duração do token (em ms)

    return (
      !this.isTokenExpired(token, date) && exp - date.valueOf() < expiresIn / 2 // se já passou mais da metade da duraão do token
    )
  }
}

/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */
export function tokenNotExpired(jwt?: Token): boolean {
  const token: Token = jwt

  const jwtHelper = new JwtHelper()

  return token != null && !jwtHelper.isTokenExpired(token)
}
