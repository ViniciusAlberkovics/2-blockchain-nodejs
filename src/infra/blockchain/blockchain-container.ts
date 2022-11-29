import ContainerInstances, { Instance } from "../container-instances";
import CryptoCurrency from "./crypto-currency";

export default class BlockchainContainer
  implements ContainerInstances<CryptoCurrency>
{
  instances: Instance<CryptoCurrency>[];
  constructor() {
    this.instances = [];
  }

  getInstance(name: string): CryptoCurrency {
    const foundInstance = this.instances.find(
      (instance) => instance.name === name
    );

    if (!foundInstance) throw new Error(`Instance of ${name} not found.`);

    return foundInstance.instance;
  }

  addInstance(instance: Instance<CryptoCurrency>): void {
    if (this.instances.some((i) => i.name === instance.name))
      throw new Error(`Instance of ${instance.name} already exists.`);

    this.instances.push(instance);
  }

  removeInstance(name: string): void {
    const instanceIndex = this.instances.findIndex((i) => i.name === name);
    if (instanceIndex > -1) this.instances.splice(instanceIndex, 1);
  }
}
