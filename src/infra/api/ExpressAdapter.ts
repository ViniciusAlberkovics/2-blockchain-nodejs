import express, { Request, Response } from "express";
import HttpServer, { CallbackFunction } from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: CallbackFunction): void {
    // TODO: Adicionar middleware de tratativa de erro
    // TODO: Deixar o STATUS CODE de retorno por parametro
    this.app[method](url, async function (req: Request, res: Response) {
      const output = await callback({
        params: req.params || {},
        query: req.query || {},
        body: req.body || {},
      });
      res.json(output);
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`running on http://localhost:${port}`);
    });
  }
}
