// Import modules
import { Core } from "./modules/core";
import { Utilities } from "./modules/utilities";
import { Storage } from "./modules/storage";
import { Chrono } from "./modules/chrono/chrono";

// Make $ return Dom instance
export function $(selector: string): Core {
  return new Core(selector);
}

// Named exports
export { Core, Utilities, Storage, Chrono };

// Default export (optional)
// export const QuokkaJS = {
//   Core,
//   $,
//   Storage,
//   Utilities,
//   Chrono,
// };
