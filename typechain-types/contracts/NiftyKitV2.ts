/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface NiftyKitV2Interface extends utils.Interface {
  functions: {
    "addCollection(uint96,address)": FunctionFragment;
    "addFees(uint256)": FunctionFragment;
    "addFeesClaimed(uint256)": FunctionFragment;
    "commission(address,uint256)": FunctionFragment;
    "createCollection(uint96,string,string,address,address,uint96)": FunctionFragment;
    "getDropKitPass()": FunctionFragment;
    "getFees(address)": FunctionFragment;
    "getImplementation(uint96)": FunctionFragment;
    "initialize()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setDropKitPass(address)": FunctionFragment;
    "setImplementation(uint96,address)": FunctionFragment;
    "setRateOverride(address,uint256)": FunctionFragment;
    "setTreasury(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addCollection"
      | "addFees"
      | "addFeesClaimed"
      | "commission"
      | "createCollection"
      | "getDropKitPass"
      | "getFees"
      | "getImplementation"
      | "initialize"
      | "owner"
      | "renounceOwnership"
      | "setDropKitPass"
      | "setImplementation"
      | "setRateOverride"
      | "setTreasury"
      | "transferOwnership"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addCollection",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "addFees",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addFeesClaimed",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "commission",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createCollection",
    values: [BigNumberish, string, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getDropKitPass",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getFees", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getImplementation",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setDropKitPass",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setImplementation",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRateOverride",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setTreasury", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addFeesClaimed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "commission", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createCollection",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDropKitPass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDropKitPass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRateOverride",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTreasury",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "CollectionCreated(uint96,address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CollectionCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface CollectionCreatedEventObject {
  typeId: BigNumber;
  collectionAddress: string;
}
export type CollectionCreatedEvent = TypedEvent<
  [BigNumber, string],
  CollectionCreatedEventObject
>;

export type CollectionCreatedEventFilter =
  TypedEventFilter<CollectionCreatedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface NiftyKitV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NiftyKitV2Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addCollection(
      typeId: BigNumberish,
      collection: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addFees(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addFeesClaimed(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    commission(
      collection: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    createCollection(
      typeId: BigNumberish,
      name: string,
      symbol: string,
      treasury: string,
      royalty: string,
      royaltyFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getDropKitPass(overrides?: CallOverrides): Promise<[string]>;

    getFees(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    getImplementation(
      typeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDropKitPass(
      passAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setImplementation(
      typeId: BigNumberish,
      implementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRateOverride(
      collection: string,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTreasury(
      treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addCollection(
    typeId: BigNumberish,
    collection: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addFees(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addFeesClaimed(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  commission(
    collection: string,
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  createCollection(
    typeId: BigNumberish,
    name: string,
    symbol: string,
    treasury: string,
    royalty: string,
    royaltyFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getDropKitPass(overrides?: CallOverrides): Promise<string>;

  getFees(account: string, overrides?: CallOverrides): Promise<BigNumber>;

  getImplementation(
    typeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  initialize(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDropKitPass(
    passAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setImplementation(
    typeId: BigNumberish,
    implementation: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRateOverride(
    collection: string,
    rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTreasury(
    treasury: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addCollection(
      typeId: BigNumberish,
      collection: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addFees(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    addFeesClaimed(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    commission(
      collection: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createCollection(
      typeId: BigNumberish,
      name: string,
      symbol: string,
      treasury: string,
      royalty: string,
      royaltyFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getDropKitPass(overrides?: CallOverrides): Promise<string>;

    getFees(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getImplementation(
      typeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    initialize(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setDropKitPass(
      passAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setImplementation(
      typeId: BigNumberish,
      implementation: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setRateOverride(
      collection: string,
      rate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setTreasury(treasury: string, overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "CollectionCreated(uint96,address)"(
      typeId?: BigNumberish | null,
      collectionAddress?: string | null
    ): CollectionCreatedEventFilter;
    CollectionCreated(
      typeId?: BigNumberish | null,
      collectionAddress?: string | null
    ): CollectionCreatedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    addCollection(
      typeId: BigNumberish,
      collection: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addFees(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addFeesClaimed(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    commission(
      collection: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createCollection(
      typeId: BigNumberish,
      name: string,
      symbol: string,
      treasury: string,
      royalty: string,
      royaltyFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getDropKitPass(overrides?: CallOverrides): Promise<BigNumber>;

    getFees(account: string, overrides?: CallOverrides): Promise<BigNumber>;

    getImplementation(
      typeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDropKitPass(
      passAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setImplementation(
      typeId: BigNumberish,
      implementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRateOverride(
      collection: string,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTreasury(
      treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addCollection(
      typeId: BigNumberish,
      collection: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addFees(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addFeesClaimed(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    commission(
      collection: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createCollection(
      typeId: BigNumberish,
      name: string,
      symbol: string,
      treasury: string,
      royalty: string,
      royaltyFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getDropKitPass(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFees(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getImplementation(
      typeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDropKitPass(
      passAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setImplementation(
      typeId: BigNumberish,
      implementation: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRateOverride(
      collection: string,
      rate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTreasury(
      treasury: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
