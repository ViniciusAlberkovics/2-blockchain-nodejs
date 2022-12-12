import { Web3Context } from "web3-core";
import dotenv from "dotenv";

import ExpressAdapter from "./infra/api/ExpressAdapter";
import Router from "./infra/api/Router";
import BlockchainContainer from "./infra/blockchain/blockchain-container";
import ETH from "./infra/blockchain/eth";
import Matic from "./infra/blockchain/matic";
import { POSClient, use } from "@maticnetwork/maticjs";
import Web3ClientPlugin from "@maticnetwork/maticjs-web3";

dotenv.config();

const { PORT, PROVIDER_WEB3 } = process.env;

const blockchainContainer = new BlockchainContainer();

const context = new Web3Context(PROVIDER_WEB3);
const eth = new ETH(context);
blockchainContainer.addInstance({
  name: "eth",
  instance: eth,
});

use(Web3ClientPlugin);
const maticPos = new POSClient();
maticPos.init({
  network: "testnet",
  version: "mumbai",
  parent: {
    defaultConfig: {},
  } as any,
  child: {
    defaultConfig: {},
  } as any,
});

const matic = new Matic(maticPos);
blockchainContainer.addInstance({
  name: "matic",
  instance: matic,
});

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, blockchainContainer);

router.init();
httpServer.listen(Number(PORT));
