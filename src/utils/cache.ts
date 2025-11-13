enum CacheType {
  local,
  session,
}

class Cache {
  storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  // 关键修改：添加 try-catch 容错
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      try {
        // 尝试解析 JSON，失败则返回原始字符串
        return JSON.parse(value)
      } catch (error) {
        return value // Token 非 JSON 格式时，直接返回字符串
      }
    }
  }

  removeCache(key: any) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.local)
const sessionCache = new Cache(CacheType.session)

export { localCache, sessionCache }
