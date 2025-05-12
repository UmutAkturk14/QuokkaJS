export type HandlerEntry = {
  event: string;
  namespace?: string;
  callback: EventListener;
};
