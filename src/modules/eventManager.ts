import type Core from "./core";
import type HandlerEntry from "../utils/types";


const handlerMap: WeakMap<HTMLElement, HandlerEntry[]> = new WeakMap();

function parseEvent(eventWithNamespace: string): { event: string; namespace?: string } {
  const [event, namespace] = eventWithNamespace.split(".");
  return { event, namespace };
}

export const eventManager: {
  on(this: Core, event: string, callback: EventListener): Core;
  off(this: Core, event: string, callback?: EventListener): Core;
  once(this: Core, event: string, callback: EventListener): Core;
  trigger(this: Core, event: string, detail?: unknown): Core;
} = {
  on(this: Core, eventWithNS: string, callback: EventListener): Core {
    const { event, namespace } = parseEvent(eventWithNS);
    this.elements.forEach((el: HTMLElement) => {
      const entry: HandlerEntry = { event, namespace, callback };
      el.addEventListener(event, callback);

      const handlers: HandlerEntry[] = handlerMap.get(el) || [];
      handlers.push(entry);
      handlerMap.set(el, handlers);
    });
    return this;
  },

  off(this: Core, eventWithNS: string, callback?: EventListener): Core {
    const { event, namespace } = parseEvent(eventWithNS);
    this.elements.forEach((el: HTMLElement) => {
      const handlers: HandlerEntry[] | undefined = handlerMap.get(el);
      if (!handlers) return;

      handlerMap.set(
        el,
        handlers.filter((entry) => {
          const match: boolean =
            entry.event === event &&
            (namespace ? entry.namespace === namespace : true) &&
            (!callback || entry.callback === callback);

          if (match) {
            el.removeEventListener(entry.event, entry.callback);
            return false;
          }
          return true;
        })
      );
    });
    return this;
  },

  once(this: Core, eventWithNS: string, callback: EventListener): Core {
    const { event, namespace } = parseEvent(eventWithNS);

    const onceCallback: EventListener = (e: Event): void => {
      callback(e);
      eventManager.off.call(this, `${event}${namespace ? `.${namespace}` : ""}`, onceCallback);
    };

    eventManager.on.call(this, `${event}${namespace ? `.${namespace}` : ""}`, onceCallback);
    return this;
  },

  trigger(this: Core, eventWithNS: string, detail?: unknown): Core {
    const { event } = parseEvent(eventWithNS); // namespace is not used here
    this.elements.forEach((el: HTMLElement) => {
      const customEvent: CustomEvent = new CustomEvent(event, { detail });
      el.dispatchEvent(customEvent);
    });
    return this;
  },
};
