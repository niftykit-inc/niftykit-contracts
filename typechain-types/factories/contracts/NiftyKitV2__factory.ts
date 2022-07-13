/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  NiftyKitV2,
  NiftyKitV2Interface,
} from "../../contracts/NiftyKitV2";

const _abi = [
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
  "0x608060405234801561001057600080fd5b506114a7806100206000396000f3fe6080604052600436106101025760003560e01c80639af608c911610095578063d8e52c6b11610064578063d8e52c6b146102c0578063e04c55ac146102e0578063ebea829f14610300578063f0f4426014610320578063f2fde38b1461034057600080fd5b80639af608c914610234578063a4fb982914610262578063b84198ba14610282578063b9bff4bb146102a057600080fd5b80634dffc6c6116100d15780634dffc6c6146101cc578063715018a6146101ec5780638129fc1c146102015780638da5cb5b1461021657600080fd5b8063107e9cf11461010e57806314fdf221146101305780632e1a7d4d1461018c57806342355e3d146101ac57600080fd5b3661010957005b600080fd5b34801561011a57600080fd5b5061012e610129366004611067565b610360565b005b34801561013c57600080fd5b5061016f61014b366004611095565b6001600160601b03166000908152606a60205260409020546001600160a01b031690565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561019857600080fd5b5061012e6101a7366004611067565b610409565b3480156101b857600080fd5b5061012e6101c73660046110c9565b61046b565b3480156101d857600080fd5b5061012e6101e73660046110e4565b610495565b3480156101f857600080fd5b5061012e610511565b34801561020d57600080fd5b5061012e610525565b34801561022257600080fd5b506033546001600160a01b031661016f565b34801561024057600080fd5b5061025461024f3660046110c9565b610647565b604051908152602001610183565b34801561026e57600080fd5b5061012e61027d36600461110e565b61067a565b34801561028e57600080fd5b50606c546001600160a01b031661016f565b3480156102ac57600080fd5b5061012e6102bb366004611067565b6106bb565b3480156102cc57600080fd5b5061012e6102db36600461110e565b61071d565b3480156102ec57600080fd5b506102546102fb3660046110e4565b6107bd565b34801561030c57600080fd5b5061012e61031b3660046111e6565b610824565b34801561032c57600080fd5b5061012e61033b3660046110c9565b610949565b34801561034c57600080fd5b5061012e61035b3660046110c9565b610973565b61036d335b6066906109e9565b6103b35760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21031b7b63632b1ba34b7b760711b60448201526064015b60405180910390fd5b6103e66103c033836107bd565b60686000335b6001600160a01b0316815260208101919091526040016000205490610a0e565b60686000335b6001600160a01b0316815260208101919091526040016000205550565b804710156104525760405162461bcd60e51b81526020600482015260166024820152754e6f7420656e6f75676820746f20776974686472617760501b60448201526064016103aa565b606554610468906001600160a01b031682610a1a565b50565b610473610b38565b606c80546001600160a01b0319166001600160a01b0392909216919091179055565b61049d610b38565b6104a86066836109e9565b6104e55760405162461bcd60e51b815260206004820152600e60248201526d111bd95cc81b9bdd08195e1a5cdd60921b60448201526064016103aa565b6001600160a01b039091166000908152606b602052604090206001818101805460ff1916909117905555565b610519610b38565b6105236000610b92565b565b600054610100900460ff16158080156105455750600054600160ff909116105b8061055f5750303b15801561055f575060005460ff166001145b6105c25760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016103aa565b6000805460ff1916600117905580156105e5576000805461ff0019166101001790555b6105ed610be4565b606580546001600160a01b031916331790558015610468576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b6001600160a01b038116600090815260696020908152604080832054606890925282205461067491610c13565b92915050565b610682610b38565b6001600160601b03919091166000908152606a6020526040902080546001600160a01b0319166001600160a01b03909216919091179055565b6106c433610365565b6107055760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21031b7b63632b1ba34b7b760711b60448201526064016103aa565b6107138160696000336103c6565b60696000336103ec565b610725610b38565b6107306066826109e9565b1561076e5760405162461bcd60e51b815260206004820152600e60248201526d416c72656164792065786973747360901b60448201526064016103aa565b610779606682610c1f565b506040516001600160a01b038216906001600160601b038416907f86eaea8095e71d5c046eee596a94b9a354c9f0579936ff1e9f24156a98c7602790600090a35050565b6001600160a01b0382166000908152606b6020526040812060010154819060ff166107ea576101f4610804565b6001600160a01b0384166000908152606b60205260409020545b905061081c6127106108168386610c34565b90610c40565b949350505050565b6001600160601b0386166000908152606a60205260409020546001600160a01b03168061088c5760405162461bcd60e51b815260206004820152601660248201527524b73b30b634b21034b6b83632b6b2b73a30ba34b7b760511b60448201526064016103aa565b6108a66001600160a01b038216635d129f8f60e01b610c4c565b6108e25760405162461bcd60e51b815260206004820152600d60248201526c139bdd081cdd5c1c1bdc9d1959609a1b60448201526064016103aa565b60006108f2828888888888610c68565b90506108ff606682610c1f565b506040516001600160a01b038216906001600160601b038a16907f86eaea8095e71d5c046eee596a94b9a354c9f0579936ff1e9f24156a98c7602790600090a35050505050505050565b610951610b38565b606580546001600160a01b0319166001600160a01b0392909216919091179055565b61097b610b38565b6001600160a01b0381166109e05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103aa565b61046881610b92565b6001600160a01b038116600090815260018301602052604081205415155b9392505050565b6000610a0782846112a7565b80471015610a6a5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e636500000060448201526064016103aa565b6000826001600160a01b03168260405160006040518083038185875af1925050503d8060008114610ab7576040519150601f19603f3d011682016040523d82523d6000602084013e610abc565b606091505b5050905080610b335760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d6179206861766520726576657274656400000000000060648201526084016103aa565b505050565b6033546001600160a01b031633146105235760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103aa565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16610c0b5760405162461bcd60e51b81526004016103aa906112bf565b610523610e2f565b6000610a07828461130a565b6000610a07836001600160a01b038416610e5f565b6000610a078284611321565b6000610a078284611340565b6000610c5783610eae565b8015610a075750610a078383610ee1565b600080610c7488610fca565b604051632bfbdf0160e21b815290915081906001600160a01b0382169063afef7c0490610cad908b908b908b908b908b906004016113be565b600060405180830381600087803b158015610cc757600080fd5b505af1158015610cdb573d6000803e3d6000fd5b50505050806001600160a01b031663f2fde38b610cf53390565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401600060405180830381600087803b158015610d3657600080fd5b505af1158015610d4a573d6000803e3d6000fd5b5050606c546001600160a01b0316159150610e239050576001600160a01b038281166000908152606b602052604090206001908101805460ff19169091179055606c541663f675e1b7336040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602401602060405180830381865afa158015610dd8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dfc9190611416565b6001600160a01b0383166000908152606b602052604090206001600160601b039190911690555b50979650505050505050565b600054610100900460ff16610e565760405162461bcd60e51b81526004016103aa906112bf565b61052333610b92565b6000818152600183016020526040812054610ea657508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610674565b506000610674565b6000610ec1826301ffc9a760e01b610ee1565b80156106745750610eda826001600160e01b0319610ee1565b1592915050565b604080516001600160e01b0319831660248083019190915282518083039091018152604490910182526020810180516001600160e01b03166301ffc9a760e01b179052905160009190829081906001600160a01b0387169061753090610f48908690611433565b6000604051808303818686fa925050503d8060008114610f84576040519150601f19603f3d011682016040523d82523d6000602084013e610f89565b606091505b5091509150602081511015610fa45760009350505050610674565b818015610fc0575080806020019051810190610fc0919061144f565b9695505050505050565b6000604051733d602d80600a3d3981f3363d3d373d3d3d363d7360601b81528260601b60148201526e5af43d82803e903d91602b57fd5bf360881b60288201526037816000f09150506001600160a01b0381166110625760405162461bcd60e51b8152602060048201526016602482015275115490cc4c4d8dce8818dc99585d194819985a5b195960521b60448201526064016103aa565b919050565b60006020828403121561107957600080fd5b5035919050565b6001600160601b038116811461046857600080fd5b6000602082840312156110a757600080fd5b8135610a0781611080565b80356001600160a01b038116811461106257600080fd5b6000602082840312156110db57600080fd5b610a07826110b2565b600080604083850312156110f757600080fd5b611100836110b2565b946020939093013593505050565b6000806040838503121561112157600080fd5b823561112c81611080565b915061113a602084016110b2565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261116a57600080fd5b813567ffffffffffffffff8082111561118557611185611143565b604051601f8301601f19908116603f011681019082821181831017156111ad576111ad611143565b816040528381528660208588010111156111c657600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060008060c087890312156111ff57600080fd5b863561120a81611080565b9550602087013567ffffffffffffffff8082111561122757600080fd5b6112338a838b01611159565b9650604089013591508082111561124957600080fd5b5061125689828a01611159565b945050611265606088016110b2565b9250611273608088016110b2565b915060a087013561128381611080565b809150509295509295509295565b634e487b7160e01b600052601160045260246000fd5b600082198211156112ba576112ba611291565b500190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008282101561131c5761131c611291565b500390565b600081600019048311821515161561133b5761133b611291565b500290565b60008261135d57634e487b7160e01b600052601260045260246000fd5b500490565b60005b8381101561137d578181015183820152602001611365565b8381111561138c576000848401525b50505050565b600081518084526113aa816020860160208601611362565b601f01601f19169290920160200192915050565b60a0815260006113d160a0830188611392565b82810360208401526113e38188611392565b6001600160a01b039687166040850152949095166060830152506001600160601b03919091166080909101529392505050565b60006020828403121561142857600080fd5b8151610a0781611080565b60008251611445818460208701611362565b9190910192915050565b60006020828403121561146157600080fd5b81518015158114610a0757600080fdfea26469706673582212201079d961be95de9083a76ee3b2f9e1c495859b54e6bc51a7cde7720701cdd68d64736f6c634300080f0033";

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
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NiftyKitV2> {
    return super.deploy(overrides || {}) as Promise<NiftyKitV2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
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
