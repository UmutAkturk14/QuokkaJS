export class Chrono {
  static addMinutes(minutes: number, baseDate: number | Date = Date.now()): Date {
    const base = baseDate instanceof Date ? baseDate.getTime() : baseDate;
    return new Date(base + minutes * 60 * 1000);
  }

  static addHours(hours: number, baseDate: number | Date = Date.now()): Date {
    const base = baseDate instanceof Date ? baseDate.getTime() : baseDate;
    return new Date(base + hours * 60 * 60 * 1000);
  }

  static addDays(days: number, baseDate: number | Date = Date.now()): Date {
    const base = baseDate instanceof Date ? baseDate.getTime() : baseDate;
    return new Date(base + days * 24 * 60 * 60 * 1000);
  }

  static addWeeks(weeks: number, baseDate: number | Date = Date.now()): Date {
    const base = baseDate instanceof Date ? baseDate.getTime() : baseDate;
    return new Date(base + weeks * 7 * 24 * 60 * 60 * 1000);
  }

  static addSeconds(seconds: number, baseDate: number | Date = Date.now()): Date {
    const base = baseDate instanceof Date ? baseDate.getTime() : baseDate;
    return new Date(base + seconds * 1000);
  }

  static addMilliseconds(ms: number, baseDate: number | Date = Date.now()): Date {
    const base = baseDate instanceof Date ? baseDate.getTime() : baseDate;
    return new Date(base + ms);
  }

  // 1. isExpired()
  static isExpired(expiryTime: number | Date, baseTime: number | Date = Date.now()): boolean {
    const expiry = expiryTime instanceof Date ? expiryTime.getTime() : expiryTime;
    const base = baseTime instanceof Date ? baseTime.getTime() : baseTime;
    return base >= expiry;
  }

  // 2. timeLeft() with options for unit
  static timeLeft(
    expiryTime: number | Date,
    unit: 'ms' | 'seconds' | 'minutes' | 'hours' | 'days' = 'ms',
    baseTime: number | Date = Date.now(),
  ): number {
    const expiry = expiryTime instanceof Date ? expiryTime.getTime() : expiryTime;
    const base = baseTime instanceof Date ? baseTime.getTime() : baseTime;
    const diff = Math.max(0, expiry - base);

    switch (unit) {
      case 'seconds': return diff / 1000;
      case 'minutes': return diff / (1000 * 60);
      case 'hours': return diff / (1000 * 60 * 60);
      case 'days': return diff / (1000 * 60 * 60 * 24);
      default: return diff; // ms
    }
  }

  // 3. expiresInMinutes(), expiresInHours(), expiresInDays()
  static expiresInMinutes(expiryTime: number | Date, baseTime: number | Date = Date.now()): number {
    return Math.floor(this.timeLeft(expiryTime, 'minutes', baseTime));
  }

  static expiresInHours(expiryTime: number | Date, baseTime: number | Date = Date.now()): number {
    return Math.floor(this.timeLeft(expiryTime, 'hours', baseTime));
  }

  static expiresInDays(expiryTime: number | Date, baseTime: number | Date = Date.now()): number {
    return Math.floor(this.timeLeft(expiryTime, 'days', baseTime));
  }

  // 4. setExpiryFromNow() — you can also pass partial options for flexibility
  static setExpiryFromNow(options: { minutes?: number; hours?: number; days?: number; weeks?: number } = {}): Date {
    const now = Date.now();
    const minutes = options.minutes ?? 0;
    const hours = options.hours ?? 0;
    const days = options.days ?? 0;
    const weeks = options.weeks ?? 0;

    const totalMs =
      minutes * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      days * 24 * 60 * 60 * 1000 +
      weeks * 7 * 24 * 60 * 60 * 1000;

    return new Date(now + totalMs);
  }

  // New helper method to get detailed expiry diff info
  static getExpiryDiff(expiryTime: number | Date, baseTime: number | Date = Date.now()) {
    const expiry = expiryTime instanceof Date ? expiryTime.getTime() : expiryTime;
    const base = baseTime instanceof Date ? baseTime.getTime() : baseTime;
    const diff = expiry - base;
    const isExpired = diff <= 0;
    const absDiff = Math.abs(diff);

    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(absDiff / (1000 * 60));
    const hours = Math.floor(absDiff / (1000 * 60 * 60));
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));

    return { diff, isExpired, days, hours, minutes, seconds };
  }

  // 5. formatExpiry() uses getExpiryDiff internally
  static formatExpiry(expiryTime: number | Date, baseTime: number | Date = Date.now()): string {
    const { isExpired, days, hours, minutes, seconds } = this.getExpiryDiff(expiryTime, baseTime);

    if (isExpired) {
      if (days > 0) return `Expired ${days} day${days > 1 ? 's' : ''} ago`;
      if (hours > 0) return `Expired ${hours} hour${hours > 1 ? 's' : ''} ago`;
      if (minutes > 0) return `Expired ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      if (seconds > 0) return `Expired ${seconds} second${seconds > 1 ? 's' : ''} ago`;
      return `Expired just now`;
    } else {
      if (days > 0) return `Expires in ${days} day${days > 1 ? 's' : ''}`;
      if (hours > 0) return `Expires in ${hours} hour${hours > 1 ? 's' : ''}`;
      if (minutes > 0) return `Expires in ${minutes} minute${minutes > 1 ? 's' : ''}`;
      if (seconds > 0) return `Expires in ${seconds} second${seconds > 1 ? 's' : ''}`;
      return `Expires just now`;
    }
  }
}
