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
  throttle(func: Function, limit: number): Function {
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;

    return function (...args: unknown[]) {
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

  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  mergeObjects<T>(...objects: T[]): T {
    return Object.assign({}, ...objects);
  }

  isEmpty(value: unknown): boolean {
    if (Array.isArray(value) || typeof value === 'string') {
      return value.length === 0;
    }
    return Object.keys(value).length === 0;
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

}

const utils: Utilities = new Utilities();

export default utils;
