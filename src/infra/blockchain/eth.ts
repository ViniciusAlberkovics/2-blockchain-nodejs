import { Web3Context } from "web3-core";

import BaseWeb3 from "./base-web3";

export default class ETH extends BaseWeb3 {
  /**
   * TODO: REMOVER DAQUI
   * Quantidade de ETH para formar 1 ETH
   */
  static ETH_1 = 1000000000000000000;
  constructor(web3Context: Web3Context) {
    super(web3Context);
  }
}
