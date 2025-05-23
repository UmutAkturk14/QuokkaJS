import { describe, expect, test } from "vitest";
import { Chrono } from "../src/modules/chrono";

describe("Chrono", () => {
  test("addMinutes returns correct Date in the future", () => {
    const now = Date.now();
    const result = Chrono.addMinutes(10, now);
    expect(result.getTime()).toBeCloseTo(now + 10 * 60 * 1000, -2);
  });

  test("addHours returns correct Date in the future", () => {
    const now = Date.now();
    const result = Chrono.addHours(2, now);
    expect(result.getTime()).toBeCloseTo(now + 2 * 60 * 60 * 1000, -2);
  });

  test("addDays returns correct Date in the future", () => {
    const now = Date.now();
    const result = Chrono.addDays(1, now);
    expect(result.getTime()).toBeCloseTo(now + 24 * 60 * 60 * 1000, -2);
  });

  test("addWeeks returns correct Date in the future", () => {
    const now = Date.now();
    const result = Chrono.addWeeks(1, now);
    expect(result.getTime()).toBeCloseTo(now + 7 * 24 * 60 * 60 * 1000, -2);
  });

  test("addSeconds returns correct Date in the future", () => {
    const now = Date.now();
    const result = Chrono.addSeconds(30, now);
    expect(result.getTime()).toBeCloseTo(now + 30 * 1000, -2);
  });

  test("addMilliseconds returns correct Date in the future", () => {
    const now = Date.now();
    const result = Chrono.addMilliseconds(500, now);
    expect(result.getTime()).toBeCloseTo(now + 500, -2);
  });

  test("isExpired returns true for past date and false for future date", () => {
    const past = new Date(Date.now() - 1000);
    const future = new Date(Date.now() + 1000);

    expect(Chrono.isExpired(past)).toBe(true);
    expect(Chrono.isExpired(future)).toBe(false);
  });

  test("timeLeft returns correct milliseconds left by default", () => {
    const future = Date.now() + 2000;
    const diff = Chrono.timeLeft(future);
    expect(diff).toBeGreaterThanOrEqual(1900);
    expect(diff).toBeLessThanOrEqual(2000);
  });

  test("timeLeft returns correct time in seconds, minutes, hours, days", () => {
    const now = Date.now();
    const future = now + 2 * 60 * 60 * 1000; // 2 hours ahead

    expect(Chrono.timeLeft(future, 'seconds', now)).toBeCloseTo(2 * 60 * 60, 0);
    expect(Chrono.timeLeft(future, 'minutes', now)).toBeCloseTo(120, 1);
    expect(Chrono.timeLeft(future, 'hours', now)).toBeCloseTo(2, 2);
    expect(Chrono.timeLeft(future, 'days', now)).toBeCloseTo(2 / 24, 3);
  });

  test("timeLeft returns 0 if expiry is in the past", () => {
    const past = Date.now() - 10000;
    expect(Chrono.timeLeft(past)).toBe(0);
  });

  test("expiresInMinutes returns correct value", () => {
    const now = Date.now();
    const future = now + 15 * 60 * 1000;
    expect(Chrono.expiresInMinutes(future, now)).toBeCloseTo(15, 1);
  });

  test("expiresInHours returns correct value", () => {
    const now = Date.now();
    const future = now + 3 * 60 * 60 * 1000;
    expect(Chrono.expiresInHours(future, now)).toBeCloseTo(3, 2);
  });

  test("expiresInDays returns correct value", () => {
    const now = Date.now();
    const future = now + 2 * 24 * 60 * 60 * 1000;
    expect(Chrono.expiresInDays(future, now)).toBeCloseTo(2, 3);
  });

  test("setExpiryFromNow sets expiry correctly", () => {
    const result = Chrono.setExpiryFromNow({ minutes: 10 });
    const expected = Date.now() + 10 * 60 * 1000;
    expect(result.getTime()).toBeCloseTo(expected, -2);
  });

  test("formatExpiry formats expiry string correctly", () => {
    const now = Date.now();

    // Future date: 2 days from now
    const futureDate = new Date(now + 2 * 24 * 60 * 60 * 1000);
    const futureFormatted = Chrono.formatExpiry(futureDate, now);
    expect(futureFormatted).toMatch(/^Expires in \d+ day(s)?$/);

    // Past date: 3 hours ago
    const pastDate = new Date(now - 3 * 60 * 60 * 1000);
    const pastFormatted = Chrono.formatExpiry(pastDate, now);
    expect(pastFormatted).toMatch(/^Expired \d+ hour(s)? ago$/);

    // Very recent future: 10 seconds from now
    const soonDate = new Date(now + 10 * 1000);
    const soonFormatted = Chrono.formatExpiry(soonDate, now);
    expect(soonFormatted).toMatch(/^Expires in \d+ second(s)?$/);

    // Just expired (within a second)
    const justExpiredDate = new Date(now - 500);
    const justExpiredFormatted = Chrono.formatExpiry(justExpiredDate, now);
    expect(justExpiredFormatted).toBe("Expired just now");
  });

});
