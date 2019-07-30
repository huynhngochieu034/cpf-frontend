import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { each } from 'lodash';

const cachePersistenceKey = 'httpCache';
const maxAge = 30000; // maximum cache age (ms)

export interface HttpCacheEntry {
  lastUpdated: number;
  data: HttpResponse<any>;
}

@Injectable()
export class HttpCacheService {
  private cachedData: { [key: string]: HttpCacheEntry } = {};
  private storage: Storage | null = null;
  constructor(private logger: NGXLogger) {
    this.loadCacheData();
  }

  setCacheData(url: string, data: HttpResponse<any>, lastUpdated?: number) {
    this.cachedData[url] = {
      lastUpdated: lastUpdated || Date.now(),
      data: data
    };
    this.logger.debug(`Cache set for key: "${url}"`);
    this.saveCacheData();
  }

  getCacheData(url: string): HttpResponse<any> | null {
    this.cleanCache(Date.now() - maxAge);
    const cacheEntry = this.cachedData[url];
    if (cacheEntry) {
      this.logger.debug(`Cache hit for key: "${url}"`);
      return cacheEntry.data;
    }

    return null;
  }

  getHttpCacheEntry(url: string): HttpCacheEntry | null {
    return this.cachedData[url] || null;
  }

  clearCache(url: string): void {
    delete this.cachedData[url];
    this.logger.debug(`Cache cleared for key: "${url}"`);
    this.saveCacheData();
  }

  cleanCache(expirationDate?: number) {
    if (expirationDate) {
      each(this.cachedData, (value: HttpCacheEntry, key: string) => {
        if (expirationDate >= value.lastUpdated) {
          delete this.cachedData[key];
        }
      });
    } else {
      this.cachedData = {};
    }
    this.saveCacheData();
  }

  setPersistence(persistence?: 'local' | 'session') {
    this.cleanCache();

    switch (persistence) {
      case 'local':
        this.storage = localStorage;
        break;
      case 'session':
        this.storage = sessionStorage;
        break;
      default:
        this.storage = null;
        break;
    }

    this.loadCacheData();
  }

  private saveCacheData() {
    if (this.storage) {
      this.storage[cachePersistenceKey] = JSON.stringify(this.cachedData);
    }
  }

  private loadCacheData() {
    let data = null;
    if (this.storage) {
      data = this.storage[cachePersistenceKey];
    }

    if (data) {
      this.cachedData = JSON.parse(data);
    } else {
      this.cachedData = {};
    }
  }
}
