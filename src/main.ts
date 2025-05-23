// Import modules
import { Core } from "@modules/core";
import { Utilities } from "@modules/utilities";
import { storage } from "@modules/storage";

// Make $ return Dom instance
export function $(selector: string): Core {
  return new Core(selector);
}

// Named exports
export { Core, Utilities, storage };

// Default export (optional)
export const QuokkaJS = {
  Core,
  $,
  storage,
  Utilities,
};

export default QuokkaJS;
