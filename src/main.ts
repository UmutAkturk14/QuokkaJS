// Import modules
import Core from "./modules/core";
import Dom from "./modules/dom";

// Make $ return Dom instance
function $(selector: string): Dom {
  return new Dom(selector);
}

// QuokkaJS library export
const QuokkaJS = {
  Core,
  Dom,
  $
};

// Expose globally
if (typeof window !== "undefined") {
  (window as any).QuokkaJS = QuokkaJS;
  (window as any).$ = $; // <-- this is key for global usage
}

// Export for modules
export default QuokkaJS;
