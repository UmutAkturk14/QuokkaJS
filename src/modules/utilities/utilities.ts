/**
 * Utilities module for common helper methods.
 */
class Utilities {
  // Check if the given value is truthy
  isTruthy(value: unknown): boolean {
    return !!value;
  }

  // Check if the given value is falsy
  isFalsy(value: unknown): boolean {
    return !value;
  }

  // Debounce function to limit how frequently a function can be invoked
  debounce(
    func: (...args: unknown[]) => void,
    delay: number,
    immediate: boolean = false
  ): ((...args: unknown[]) => void) & { cancel: () => void } {
    let timeout: NodeJS.Timeout | null = null;

    function debounced(...args: unknown[]): void {
      const callNow: boolean = immediate && !timeout;

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        timeout = null;
        if (!immediate) func(...args);
      }, delay);

      if (callNow) func(...args);
    }

    debounced.cancel = (): void => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };

    return debounced;
  }

  // Throttle function to limit how frequently a function can be invoked (at most once every "limit" milliseconds)
  throttle<T extends unknown[]>(func: (...args: T) => void, limit: number): (...args: T) => void {
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;

    return function (...args: T) {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  deepClone<T>(obj: T): T {
    return structuredClone(obj);
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r:number = (Math.random() * 16) | 0;
      const v:number = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  flatten<T>(arr: (T | T[])[]): T[] {
    return arr.reduce<T[]>((acc, val) => acc.concat(Array.isArray(val) ? this.flatten(val) : val), []);
  }

  isArray(value: unknown): boolean {
    return Array.isArray(value);
  }

  isObject(value: unknown): boolean {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  randomInt(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  mergeObjects<T extends object>(...objects: T[]): T {
    return Object.assign({}, ...objects) as T;
  }

  isEmpty(value: unknown): boolean {
    if (Array.isArray(value) || typeof value === 'string') {
      return value.length === 0;
    }
    return typeof value === 'object' && value !== null && Object.keys(value).length === 0;
  }


  getQueryParam(param: string, url: string = window.location.href): string | null {
    const urlParams: URLSearchParams = new URLSearchParams(url.split('?')[1]);
    return urlParams.get(param);
  }

  isValidEmail(email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  isMobile(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  isTablet(): boolean {
    return /Tablet|iPad/i.test(navigator.userAgent);
  }

  isDesktop(): boolean {
    return !this.isMobile() && !this.isTablet();
  }

  getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }

  getOS(): string {
    const userAgent:string = navigator.userAgent;

    if (/Windows NT/i.test(userAgent)) return 'Windows';
    if (/Mac OS X/i.test(userAgent)) return 'macOS';
    if (/Android/i.test(userAgent)) return 'Android';
    if (/iPhone|iPad/i.test(userAgent)) return 'iOS';
    if (/Linux/i.test(userAgent)) return 'Linux';

    return 'Unknown';
  }

  getBrowser(): string {
    const userAgent:string = navigator.userAgent;

    if (/Chrome/i.test(userAgent) && !/Edge|Edg|OPR/i.test(userAgent)) return 'Chrome';
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'Safari';
    if (/Firefox/i.test(userAgent)) return 'Firefox';
    if (/Edg/i.test(userAgent)) return 'Edge';
    if (/OPR/i.test(userAgent)) return 'Opera';

    return 'Unknown';
  }

  getCurrentCoordinates(): Promise<{ lat: number, lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        error => reject(error)
      );
    });
  }

  getLanguage(): string {
    return navigator.language || 'en-US';
  }

  getTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getCountryFromLocale(): string {
    const locale: string = this.getLanguage();
    return locale.split('-')[1] || '';
  }

  getReferrer(): string | null {
    if (typeof document !== 'undefined' && document.referrer) {
      return document.referrer;
    }

    return null;
  }

  base64Encode(value: string): string {
    return btoa(value);
  }

  base64Decode(value: string): string {
    return atob(value);
  }

  measureTask(func: () => void): { time: number, result: unknown } {
    const start: number = performance.now();
    const result: unknown = func();
    const end: number = performance.now();
    return { time: end - start, result };
  }

  isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  getRandomString(length: number = 10): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

const utils: Utilities = new Utilities();

export default utils;
