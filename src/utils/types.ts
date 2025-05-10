type HandlerEntry = {
  event: string;
  namespace?: string;
  callback: EventListener;
};

export default HandlerEntry;
