import { Web3Context } from "web3-core";
import { getBalance, sendTransaction, estimateGas } from "web3-eth";
import { DEFAULT_RETURN_FORMAT } from "web3-utils";
import { BlockTags, Transaction, TransactionReceipt } from "web3-types";

import CryptoCurrency from "./crypto-currency";

export default class ETH implements CryptoCurrency {
  /**
   * TODO: REMOVER DAQUI
   * Quantidade de ETH para formar 1 ETH
   */
  static ETH_1 = 1000000000000000000;

  constructor(private readonly web3Context: Web3Context) {}

  async getBalance(account: string): Promise<bigint> {
    const balance = await getBalance(
      this.web3Context,
      account,
      BlockTags.LATEST,
      DEFAULT_RETURN_FORMAT
    );
    return balance;
  }

  async estimateGas(transaction: Transaction): Promise<bigint> {
    const estimatedGas = await estimateGas(
      this.web3Context,
      transaction,
      BlockTags.LATEST,
      DEFAULT_RETURN_FORMAT
    );

    return estimatedGas;
  }

  async sendTransaction(transaction: Transaction): Promise<TransactionReceipt> {
    return new Promise((resolve, reject) => {
      sendTransaction(this.web3Context, transaction, DEFAULT_RETURN_FORMAT)
        .then((transactionResult) => {
          resolve(transactionResult);
        })
        .catch(reject);
    });
  }
}
