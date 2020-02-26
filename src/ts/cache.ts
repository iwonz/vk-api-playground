const CACHE_KEY = 'VK_API_PLAYGROUND';

export interface Cache {
  clientId?: string;
  accessToken?: string;
  scopes?: string[];
}

export function getCache(): Cache {
  const cache = localStorage.getItem(CACHE_KEY);

  return cache
    ? JSON.parse(cache)
    : {
        clientId: '',
        accessToken: '',
        scopes: null,
      };
}

export function setCache(cache: Cache) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}
