import BlockchainContainer from "../blockchain/blockchain-container";
import HttpServer, { CallbackParams } from "./HttpServer";

export default class Router {
  constructor(
    readonly httpServer: HttpServer,
    readonly blockchainContainer: BlockchainContainer
  ) {}

  async init() {
    this.httpServer.on(
      "get",
      "/:crypto/balance/:account",
      async ({
        params,
      }: CallbackParams<{ crypto: string; account: string }>) => {
        const cryptoCurrency = this.blockchainContainer.getInstance(
          params.crypto
        );
        const balance = await cryptoCurrency.getBalance(params.account);
        return {
          balance: `${balance}`,
        };
      }
    );

    this.httpServer.on(
      "post",
      "/:crypto/transactions/estimate-gas",
      async ({ params, body }: CallbackParams<{ crypto: string }>) => {
        const cryptoCurrency = this.blockchainContainer.getInstance(
          params.crypto
        );
        const estimatedGas = await cryptoCurrency.estimateGas(body);

        return {
          estimatedGas: `${estimatedGas}`,
        };
      }
    );

    this.httpServer.on(
      "post",
      "/:crypto/transactions",
      async ({ params, body }: CallbackParams<{ crypto: string }>) => {
        const cryptoCurrency = this.blockchainContainer.getInstance(
          params.crypto
        );
        const transactionResult = await cryptoCurrency.sendTransaction(body);
        return {
          blockHash: transactionResult.blockHash,
          blockNumber: `${transactionResult.blockNumber}`,
          contractAddress: transactionResult.contractAddress,
          cumulativeGasUsed: `${transactionResult.cumulativeGasUsed}`,
          effectiveGasPrice: transactionResult.effectiveGasPrice
            ? `${transactionResult.effectiveGasPrice}`
            : undefined,
          from: transactionResult.from,
          to: transactionResult.to,
          gasUsed: `${transactionResult.gasUsed}`,
          root: transactionResult.root,
          status: `${transactionResult.status}`,
          transactionHash: transactionResult.transactionHash,
          transactionIndex: `${transactionResult.transactionIndex}`,
        };
      }
    );
  }
}
