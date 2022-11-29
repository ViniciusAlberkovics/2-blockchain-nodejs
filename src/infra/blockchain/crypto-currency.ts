import { Transaction, TransactionReceipt } from "web3-types";

export default interface CryptoCurrency {
  getBalance(account: string): Promise<bigint>;
  estimateGas(transaction: Transaction): Promise<bigint>;
  sendTransaction(transaction: Transaction): Promise<TransactionReceipt>;
}
