export type CallbackParams<P = any, Q = any, B = any> = {
  params: P;
  query: Q;
  body: B;
};

export type CallbackFunction = (args: CallbackParams) => Promise<any>;

export default interface HttpServer {
  on(method: string, url: string, callback: CallbackFunction): void;
  listen(port: number): void;
}
