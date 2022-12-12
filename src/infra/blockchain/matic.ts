import { POSClient } from "@maticnetwork/maticjs";
import { Transaction, TransactionReceipt } from "web3-types";

import CryptoCurrency from "./crypto-currency";

export default class Matic implements CryptoCurrency {
  constructor(private readonly web3Context: POSClient) {}

  async getBalance(account: string): Promise<bigint> {
    const balance = await this.web3Context
      .erc20(account, true)
      .getBalance(account);
    return BigInt(balance);
  }
  async estimateGas(transaction: Transaction): Promise<bigint> {
    // const balance = await this.web3Context
    //   .erc20(transaction.from, true)
    //   .transfer(`${transaction.value}`, transaction.to as string, {
    //     from: transaction.from,
    //     to: transaction.to as string,
    //     chain: transaction.chain,
    //     chainId: Number(transaction.chainId),
    //     data: transaction.data as string,
    //     gasLimit: `${transaction.gasLimit}`,
    //     gasPrice: `${transaction.gasPrice}`,
    //     maxFeePerGas: `${transaction.maxFeePerGas}`,
    //     maxPriorityFeePerGas: `${transaction.maxPriorityFeePerGas}`,
    //     nonce: Number(transaction.nonce),
    //     type: Number(transaction.type),
    //     value: `${transaction.value}`,
    //     hardfork: transaction.hardfork,
    //   });
    // return BigInt(balance);
    return BigInt(1);
  }

  async sendTransaction(transaction: Transaction): Promise<TransactionReceipt> {
    const transactionResult = await this.web3Context
      .erc20(transaction.from, true)
      .transfer(`${transaction.value}`, transaction.to as string, {
        from: transaction.from,
        to: transaction.to as string,
        chain: transaction.chain,
        chainId: Number(transaction.chainId),
        data: transaction.data as string,
        gasLimit: `${transaction.gasLimit}`,
        gasPrice: `${transaction.gasPrice}`,
        maxFeePerGas: `${transaction.maxFeePerGas}`,
        maxPriorityFeePerGas: `${transaction.maxPriorityFeePerGas}`,
        nonce: Number(transaction.nonce),
        type: Number(transaction.type),
        value: `${transaction.value}`,
        hardfork: transaction.hardfork,
      });
    const receipt = await transactionResult.getReceipt();
    return {
      transactionHash: receipt.transactionHash,
      transactionIndex: receipt.transactionIndex,
      blockHash: receipt.blockHash,
      blockNumber: receipt.blockNumber,
      from: receipt.from,
      to: receipt.to,
      cumulativeGasUsed: receipt.cumulativeGasUsed,
      gasUsed: receipt.gasUsed,
      effectiveGasPrice: undefined,
      contractAddress: receipt.contractAddress,
      logs: receipt.logs as never,
      logsBloom: receipt.logsBloom,
      root: receipt.root,
      status: receipt.status ? 1 : 0,
      type: receipt.type,
    };
  }
}
