// Import modules
import Core from "./modules/core";
import QuokkaStorage from "./modules/storage";

// Make $ return Dom instance
function $(selector: string): Core {
  return new Core(selector);
}

// QuokkaJS library export
const QuokkaJS = {
  Core,
  $,
  QuokkaStorage
};

// Expose globally
if (typeof window !== "undefined") {
  (window as any).QuokkaJS = QuokkaJS;
  (window as any).$ = $; // <-- this is key for global usage
}

// Export for modules
export default QuokkaJS;
