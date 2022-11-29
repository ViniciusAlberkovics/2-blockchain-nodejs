export default interface ContainerInstances<I>
  extends GetInstance<I>,
    AddInstance<I>,
    RemoveInstance {}

export interface GetInstance<I> {
  getInstance(name: string): I;
}

export interface AddInstance<I> {
  addInstance(instance: Instance<I>): void;
}

export interface RemoveInstance {
  removeInstance(name: string): void;
}

export type Instance<T> = {
  name: string;
  instance: T;
};
