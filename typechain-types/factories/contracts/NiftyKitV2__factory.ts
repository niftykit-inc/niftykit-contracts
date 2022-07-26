/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  NiftyKitV2,
  NiftyKitV2Interface,
} from "../../contracts/NiftyKitV2";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint96",
        name: "typeId",
        type: "uint96",
      },
      {
        indexed: true,
        internalType: "address",
        name: "collectionAddress",
        type: "address",
      },
    ],
    name: "CollectionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint96",
        name: "typeId",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
    ],
    name: "addCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addFeesClaimed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "commission",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint96",
        name: "typeId",
        type: "uint96",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "royalty",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "royaltyFee",
        type: "uint96",
      },
    ],
    name: "createCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDropKitPass",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint96",
        name: "typeId",
        type: "uint96",
      },
    ],
    name: "getImplementation",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "passAddress",
        type: "address",
      },
    ],
    name: "setDropKitPass",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint96",
        name: "typeId",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "setImplementation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "setRateOverride",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506200001c62000022565b62000152565b6200002e60ff62000031565b50565b60008054610100900460ff1615620000ca578160ff1660011480156200006a575062000068306200014360201b62000a3b1760201c565b155b620000c25760405162461bcd60e51b815260206004820152602e60248201526000805160206200171b83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff808416911610620001295760405162461bcd60e51b815260206004820152602e60248201526000805160206200171b83398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401620000b9565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b6115b980620001626000396000f3fe6080604052600436106101025760003560e01c80639af608c911610095578063d8e52c6b11610064578063d8e52c6b146102c0578063e04c55ac146102e0578063ebea829f14610300578063f0f4426014610320578063f2fde38b1461034057600080fd5b80639af608c914610234578063a4fb982914610262578063b84198ba14610282578063b9bff4bb146102a057600080fd5b80634dffc6c6116100d15780634dffc6c6146101cc578063715018a6146101ec5780638129fc1c146102015780638da5cb5b1461021657600080fd5b8063107e9cf11461010e57806314fdf221146101305780632e1a7d4d1461018c57806342355e3d146101ac57600080fd5b3661010957005b600080fd5b34801561011a57600080fd5b5061012e6101293660046110f6565b610360565b005b34801561013c57600080fd5b5061016f61014b366004611124565b6001600160601b03166000908152606a60205260409020546001600160a01b031690565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561019857600080fd5b5061012e6101a73660046110f6565b610409565b3480156101b857600080fd5b5061012e6101c7366004611158565b61046b565b3480156101d857600080fd5b5061012e6101e7366004611173565b6104b7565b3480156101f857600080fd5b5061012e610555565b34801561020d57600080fd5b5061012e61058b565b34801561022257600080fd5b506033546001600160a01b031661016f565b34801561024057600080fd5b5061025461024f366004611158565b610611565b604051908152602001610183565b34801561026e57600080fd5b5061012e61027d36600461119d565b610644565b34801561028e57600080fd5b50606c546001600160a01b031661016f565b3480156102ac57600080fd5b5061012e6102bb3660046110f6565b6106a7565b3480156102cc57600080fd5b5061012e6102db36600461119d565b610709565b3480156102ec57600080fd5b506102546102fb366004611173565b6107cb565b34801561030c57600080fd5b5061012e61031b366004611275565b610832565b34801561032c57600080fd5b5061012e61033b366004611158565b610957565b34801561034c57600080fd5b5061012e61035b366004611158565b6109a3565b61036d335b606690610a4a565b6103b35760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21031b7b63632b1ba34b7b760711b60448201526064015b60405180910390fd5b6103e66103c033836107cb565b60686000335b6001600160a01b0316815260208101919091526040016000205490610a6f565b60686000335b6001600160a01b0316815260208101919091526040016000205550565b804710156104525760405162461bcd60e51b81526020600482015260166024820152754e6f7420656e6f75676820746f20776974686472617760501b60448201526064016103aa565b606554610468906001600160a01b031682610a7b565b50565b6033546001600160a01b031633146104955760405162461bcd60e51b81526004016103aa90611320565b606c80546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031633146104e15760405162461bcd60e51b81526004016103aa90611320565b6104ec606683610a4a565b6105295760405162461bcd60e51b815260206004820152600e60248201526d111bd95cc81b9bdd08195e1a5cdd60921b60448201526064016103aa565b6001600160a01b039091166000908152606b602052604090206001818101805460ff1916909117905555565b6033546001600160a01b0316331461057f5760405162461bcd60e51b81526004016103aa90611320565b6105896000610b99565b565b60006105976001610beb565b905080156105af576000805461ff0019166101001790555b6105b7610c78565b606580546001600160a01b031916331790558015610468576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b6001600160a01b038116600090815260696020908152604080832054606890925282205461063e91610ca7565b92915050565b6033546001600160a01b0316331461066e5760405162461bcd60e51b81526004016103aa90611320565b6001600160601b03919091166000908152606a6020526040902080546001600160a01b0319166001600160a01b03909216919091179055565b6106b033610365565b6106f15760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21031b7b63632b1ba34b7b760711b60448201526064016103aa565b6106ff8160696000336103c6565b60696000336103ec565b6033546001600160a01b031633146107335760405162461bcd60e51b81526004016103aa90611320565b61073e606682610a4a565b1561077c5760405162461bcd60e51b815260206004820152600e60248201526d416c72656164792065786973747360901b60448201526064016103aa565b610787606682610cb3565b506040516001600160a01b038216906001600160601b038416907f86eaea8095e71d5c046eee596a94b9a354c9f0579936ff1e9f24156a98c7602790600090a35050565b6001600160a01b0382166000908152606b6020526040812060010154819060ff166107f8576101f4610812565b6001600160a01b0384166000908152606b60205260409020545b905061082a6127106108248386610cc8565b90610cd4565b949350505050565b6001600160601b0386166000908152606a60205260409020546001600160a01b03168061089a5760405162461bcd60e51b815260206004820152601660248201527524b73b30b634b21034b6b83632b6b2b73a30ba34b7b760511b60448201526064016103aa565b6108b46001600160a01b038216635d129f8f60e01b610ce0565b6108f05760405162461bcd60e51b815260206004820152600d60248201526c139bdd081cdd5c1c1bdc9d1959609a1b60448201526064016103aa565b6000610900828888888888610cfc565b905061090d606682610cb3565b506040516001600160a01b038216906001600160601b038a16907f86eaea8095e71d5c046eee596a94b9a354c9f0579936ff1e9f24156a98c7602790600090a35050505050505050565b6033546001600160a01b031633146109815760405162461bcd60e51b81526004016103aa90611320565b606580546001600160a01b0319166001600160a01b0392909216919091179055565b6033546001600160a01b031633146109cd5760405162461bcd60e51b81526004016103aa90611320565b6001600160a01b038116610a325760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103aa565b61046881610b99565b6001600160a01b03163b151590565b6001600160a01b038116600090815260018301602052604081205415155b9392505050565b6000610a68828461136b565b80471015610acb5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e636500000060448201526064016103aa565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114610b18576040519150601f19603f3d011682016040523d82523d6000602084013e610b1d565b606091505b5050905080610b945760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d6179206861766520726576657274656400000000000060648201526084016103aa565b505050565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60008054610100900460ff1615610c32578160ff166001148015610c0e5750303b155b610c2a5760405162461bcd60e51b81526004016103aa90611383565b506000919050565b60005460ff808416911610610c595760405162461bcd60e51b81526004016103aa90611383565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff16610c9f5760405162461bcd60e51b81526004016103aa906113d1565b610589610ec3565b6000610a68828461141c565b6000610a68836001600160a01b038416610ef3565b6000610a688284611433565b6000610a688284611452565b6000610ceb83610f42565b8015610a685750610a688383610f75565b600080610d088861105e565b604051632bfbdf0160e21b815290915081906001600160a01b0382169063afef7c0490610d41908b908b908b908b908b906004016114d0565b600060405180830381600087803b158015610d5b57600080fd5b505af1158015610d6f573d6000803e3d6000fd5b50505050806001600160a01b031663f2fde38b610d893390565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015610dca57600080fd5b505af1158015610dde573d6000803e3d6000fd5b5050606c546001600160a01b0316159150610eb79050576001600160a01b038281166000908152606b602052604090206001908101805460ff19169091179055606c541663f675e1b7336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610e6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e909190611528565b6001600160a01b0383166000908152606b602052604090206001600160601b039190911690555b50979650505050505050565b600054610100900460ff16610eea5760405162461bcd60e51b81526004016103aa906113d1565b61058933610b99565b6000818152600183016020526040812054610f3a5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561063e565b50600061063e565b6000610f55826301ffc9a760e01b610f75565b801561063e5750610f6e826001600160e01b0319610f75565b1592915050565b604080516001600160e01b0319831660248083019190915282518083039091018152604490910182526020810180516001600160e01b03166301ffc9a760e01b179052905160009190829081906001600160a01b0387169061753090610fdc908690611545565b6000604051808303818686fa925050503d8060008114611018576040519150601f19603f3d011682016040523d82523d6000602084013e61101d565b606091505b5091509150602081511015611038576000935050505061063e565b8180156110545750808060200190518101906110549190611561565b9695505050505050565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b038116610c735760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b60448201526064016103aa565b60006020828403121561110857600080fd5b5035919050565b6001600160601b038116811461046857600080fd5b60006020828403121561113657600080fd5b8135610a688161110f565b80356001600160a01b0381168114610c7357600080fd5b60006020828403121561116a57600080fd5b610a6882611141565b6000806040838503121561118657600080fd5b61118f83611141565b946020939093013593505050565b600080604083850312156111b057600080fd5b82356111bb8161110f565b91506111c960208401611141565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126111f957600080fd5b813567ffffffffffffffff80821115611214576112146111d2565b604051601f8301601f19908116603f0116810190828211818310171561123c5761123c6111d2565b8160405283815286602085880101111561125557600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060008060c0878903121561128e57600080fd5b86356112998161110f565b9550602087013567ffffffffffffffff808211156112b657600080fd5b6112c28a838b016111e8565b965060408901359150808211156112d857600080fd5b506112e589828a016111e8565b9450506112f460608801611141565b925061130260808801611141565b915060a08701356113128161110f565b809150509295509295509295565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000821982111561137e5761137e611355565b500190565b6020808252602e908201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160408201526d191e481a5b9a5d1a585b1a5e995960921b606082015260800190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008282101561142e5761142e611355565b500390565b600081600019048311821515161561144d5761144d611355565b500290565b60008261146f57634e487b7160e01b600052601260045260246000fd5b500490565b60005b8381101561148f578181015183820152602001611477565b8381111561149e576000848401525b50505050565b600081518084526114bc816020860160208601611474565b601f01601f19169290920160200192915050565b60a0815260006114e360a08301886114a4565b82810360208401526114f581886114a4565b6001600160a01b039687166040850152949095166060830152506001600160601b03919091166080909101529392505050565b60006020828403121561153a57600080fd5b8151610a688161110f565b60008251611557818460208701611474565b9190910192915050565b60006020828403121561157357600080fd5b81518015158114610a6857600080fdfea2646970667358221220410e2ec7bbdacebb2dae3fd2cd60a90e879102e59f49f346a7d5f5df7ea7b15964736f6c634300080f0033496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type NiftyKitV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NiftyKitV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NiftyKitV2__factory extends ContractFactory {
  constructor(...args: NiftyKitV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NiftyKitV2> {
    return super.deploy(overrides || {}) as Promise<NiftyKitV2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NiftyKitV2 {
    return super.attach(address) as NiftyKitV2;
  }
  override connect(signer: Signer): NiftyKitV2__factory {
    return super.connect(signer) as NiftyKitV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NiftyKitV2Interface {
    return new utils.Interface(_abi) as NiftyKitV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NiftyKitV2 {
    return new Contract(address, _abi, signerOrProvider) as NiftyKitV2;
  }
}
