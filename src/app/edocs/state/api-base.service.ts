import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

export type Params = { [key: string]: any };

export interface EntityEnhancer<E> {
  enhance(e: E): E;
}

@Injectable()
export class ApiBaseService<T extends { id: string | number | ID }> {
  private currentEnhancers = [];

  /**
   *
   */
  setEnhancers = (enhancers: EntityEnhancer<T> | EntityEnhancer<T>[]) => {
    this.currentEnhancers = Array.isArray(enhancers) ? enhancers : [enhancers];
  };

  /**
   *
   */
  resetEnhancer = () => this.setEnhancers([]);

  /**
   * Creates an instance of ApiBaseService.
   */
  constructor(protected api: string) {}

  /**
   *
   *
   */
  protected endpoint(route: number | string): string {
    return !route ? this.api : `${this.api}/${route}`.trim();
  }

  /**
   *
   *
   */
  protected toParams(params: Params = {}) {
    let httpParams = new HttpParams();
    Object.keys(params)
      .filter(key => params[key] != null)
      .forEach(key => (httpParams = httpParams.append(key, params[key])));
    return httpParams;
  }

  /**
   *
   */
  protected enhance(entity: T): T;
  protected enhance(entities: T[]): T[];
  protected enhance(entities: T | T[]): T | T[] {
    return Array.isArray(entities) ? entities.map(this.applyEnhancers) : this.applyEnhancers(entities);
  }

  /**
   *
   */
  protected applyEnhancers = (e: T) => {
    let entity = e;
    this.currentEnhancers.forEach(enhancer => (entity = enhancer.enhance(entity)));
    return entity;
  };
}
