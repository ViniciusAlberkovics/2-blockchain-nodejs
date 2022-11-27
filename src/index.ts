import { Web3Context } from "web3-core";
import { BlockTags } from "web3-types";
import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";

import { DEFAULT_RETURN_FORMAT } from "web3-utils";
import { getBalance, sendTransaction, estimateGas } from "web3-eth";

dotenv.config();
const app = express();
app.use(express.json());

const { PORT, PROVIDER_WEB3 } = process.env;

app.get("/balance/:account", async (req, res) => {
  const context = new Web3Context(PROVIDER_WEB3);

  const balance = await getBalance(
    context,
    req.params.account,
    BlockTags.LATEST,
    DEFAULT_RETURN_FORMAT
  );
  return res.json({ balance: `${balance}` });
});

app.post("/transactions/estimate-gas", async (req, res) => {
  const context = new Web3Context(PROVIDER_WEB3);

  const estimatedGas = await estimateGas(
    context,
    {
      from: req.body.from,
      value: req.body.value,
      to: req.body.to,
    },
    BlockTags.LATEST,
    DEFAULT_RETURN_FORMAT
  );
  return res.json({ estimatedGas: `${estimatedGas}` });
});

app.post("/transactions", async (req, res) => {
  const context = new Web3Context(PROVIDER_WEB3);

  sendTransaction(
    context,
    {
      from: req.body.from,
      value: req.body.value,
      to: req.body.to,
    },
    DEFAULT_RETURN_FORMAT
  )
    .then((transactionResult) => {
      return res.json({
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
      });
    })
    .catch((err) => {
      console.error("post transactions:", err);
      return res.status(400).json({ message: "Failed to create transaction" });
    });
});

app.listen(PORT, () => {
  console.log(`running in http://localhost:${PORT}`);
});
