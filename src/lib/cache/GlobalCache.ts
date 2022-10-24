import Cache, { CacheClass } from 'memory-cache';
import { getCacheKey } from './getCacheKey';

export abstract class GlobalCache {
  static Cache: null | CacheClass<string, unknown> = null;
  private static memoryClearScheduler: null | NodeJS.Timer = null;
  static readonly CACHE_TIMEOUT_MS = 600000;
  static readonly CACHE_MEM_LIMIT = 150;
  private static readonly CACHE_CHECK_MEMORY_LOOP_TIME_MS = 1200000;
  static readonly CachePrefixes = {
    user: 'user:',
    recruit: 'recruit:',
    enlist: 'enlist:',
    announce: 'announce:',
  };
  static getCache(): CacheClass<string, unknown> {
    if (this.noCache()) {
      this.Cache = Cache;
      this.clearMemSchedule();
      this.startMemSchedule();
    }
    return this.Cache as CacheClass<string, unknown>;
  }
  static getKey(key: string, prefix?: keyof typeof this.CachePrefixes) {
    return getCacheKey(key, prefix ? this.CachePrefixes[prefix] : undefined);
  }
  private static noCache() {
    return this.Cache === null;
  }
  private static clearMemSchedule() {
    if (this.memoryClearScheduler !== null) {
      clearInterval(this.memoryClearScheduler);
    }
  }
  private static startMemSchedule() {
    this.memoryClearScheduler = setInterval(() => {
      this.memLimitCheckAndClear();
    }, this.CACHE_CHECK_MEMORY_LOOP_TIME_MS);
  }
  private static memLimitCheckAndClear() {
    if (this.noCache()) return;
    if (this.checkMem()) this.getCache()?.clear();
  }
  private static checkMem() {
    if (this.noCache()) return false;
    return (this.Cache as typeof Cache).size() > this.CACHE_MEM_LIMIT;
  }
}
