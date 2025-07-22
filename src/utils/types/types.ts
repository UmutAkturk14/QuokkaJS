export type HandlerEntry = {
  event: string;
  namespace?: string;
  callback: EventListener;
};

export type QueryParams = {
  [key: string]: string | string[];
};

export type PlainObject = { [key: string]: any };
