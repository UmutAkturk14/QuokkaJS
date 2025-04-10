import type Core from "./core";

export const eventManager: {
  on(this: Core, event: string, callback: EventListener): Core;
  off(this: Core, event: string, callback: EventListener): Core;
  trigger(this: Core, event: string): Core;
} = {
  // Add an event listener
  on(this: Core, event: string, callback: EventListener): Core {
    this.elements.forEach((el: HTMLElement) => {
      el.addEventListener(event, callback);
    });
    return this;
  },

  // Remove an event listener
  off(this: Core, event: string, callback: EventListener): Core {
    this.elements.forEach((el: HTMLElement) => {
      el.removeEventListener(event, callback);
    });
    return this;
  },

  // Trigger an event
  trigger(this: Core, event: string): Core {
    this.elements.forEach((el: HTMLElement) => {
      const customEvent: Event = new Event(event);
      el.dispatchEvent(customEvent);
    });
    return this;
  }
};
