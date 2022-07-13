/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC721Upgradeable,
  ERC721UpgradeableInterface,
} from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
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
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611137806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101b3578063b88d4fde146101c6578063c87b56dd146101d9578063e985e9c5146101ec57600080fd5b80636352211e1461017757806370a082311461018a57806395d89b41146101ab57600080fd5b806301ffc9a7146100d457806306fdde03146100fc578063081812fc14610111578063095ea7b31461013c57806323b872dd1461015157806342842e0e14610164575b600080fd5b6100e76100e2366004610c4d565b610228565b60405190151581526020015b60405180910390f35b61010461027a565b6040516100f39190610cc2565b61012461011f366004610cd5565b61030c565b6040516001600160a01b0390911681526020016100f3565b61014f61014a366004610d0a565b610333565b005b61014f61015f366004610d34565b61044d565b61014f610172366004610d34565b61047e565b610124610185366004610cd5565b610499565b61019d610198366004610d70565b6104f9565b6040519081526020016100f3565b61010461057f565b61014f6101c1366004610d8b565b61058e565b61014f6101d4366004610ddd565b61059d565b6101046101e7366004610cd5565b6105d5565b6100e76101fa366004610eb9565b6001600160a01b039182166000908152606a6020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061025957506001600160e01b03198216635b5e139f60e01b145b8061027457506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606065805461028990610eec565b80601f01602080910402602001604051908101604052809291908181526020018280546102b590610eec565b80156103025780601f106102d757610100808354040283529160200191610302565b820191906000526020600020905b8154815290600101906020018083116102e557829003601f168201915b5050505050905090565b600061031782610649565b506000908152606960205260409020546001600160a01b031690565b600061033e82610499565b9050806001600160a01b0316836001600160a01b0316036103b05760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103cc57506103cc81336101fa565b61043e5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016103a7565b61044883836106ab565b505050565b6104573382610719565b6104735760405162461bcd60e51b81526004016103a790610f26565b610448838383610798565b6104488383836040518060200160405280600081525061059d565b6000818152606760205260408120546001600160a01b0316806102745760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103a7565b60006001600160a01b0382166105635760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103a7565b506001600160a01b031660009081526068602052604090205490565b60606066805461028990610eec565b610599338383610934565b5050565b6105a73383610719565b6105c35760405162461bcd60e51b81526004016103a790610f26565b6105cf84848484610a02565b50505050565b60606105e082610649565b60006105f760408051602081019091526000815290565b905060008151116106175760405180602001604052806000815250610642565b8061062184610a35565b604051602001610632929190610f74565b6040516020818303038152906040525b9392505050565b6000818152606760205260409020546001600160a01b03166106a85760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103a7565b50565b600081815260696020526040902080546001600160a01b0319166001600160a01b03841690811790915581906106e082610499565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60008061072583610499565b9050806001600160a01b0316846001600160a01b0316148061076c57506001600160a01b038082166000908152606a602090815260408083209388168352929052205460ff165b806107905750836001600160a01b03166107858461030c565b6001600160a01b0316145b949350505050565b826001600160a01b03166107ab82610499565b6001600160a01b03161461080f5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103a7565b6001600160a01b0382166108715760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103a7565b61087c6000826106ab565b6001600160a01b03831660009081526068602052604081208054600192906108a5908490610fb9565b90915550506001600160a01b03821660009081526068602052604081208054600192906108d3908490610fd0565b909155505060008181526067602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b0316036109955760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103a7565b6001600160a01b038381166000818152606a6020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610a0d848484610798565b610a1984848484610b36565b6105cf5760405162461bcd60e51b81526004016103a790610fe8565b606081600003610a5c5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610a865780610a708161103a565b9150610a7f9050600a83611069565b9150610a60565b60008167ffffffffffffffff811115610aa157610aa1610dc7565b6040519080825280601f01601f191660200182016040528015610acb576020820181803683370190505b5090505b841561079057610ae0600183610fb9565b9150610aed600a8661107d565b610af8906030610fd0565b60f81b818381518110610b0d57610b0d611091565b60200101906001600160f81b031916908160001a905350610b2f600a86611069565b9450610acf565b60006001600160a01b0384163b15610c2c57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610b7a9033908990889088906004016110a7565b6020604051808303816000875af1925050508015610bb5575060408051601f3d908101601f19168201909252610bb2918101906110e4565b60015b610c12573d808015610be3576040519150601f19603f3d011682016040523d82523d6000602084013e610be8565b606091505b508051600003610c0a5760405162461bcd60e51b81526004016103a790610fe8565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610790565b506001949350505050565b6001600160e01b0319811681146106a857600080fd5b600060208284031215610c5f57600080fd5b813561064281610c37565b60005b83811015610c85578181015183820152602001610c6d565b838111156105cf5750506000910152565b60008151808452610cae816020860160208601610c6a565b601f01601f19169290920160200192915050565b6020815260006106426020830184610c96565b600060208284031215610ce757600080fd5b5035919050565b80356001600160a01b0381168114610d0557600080fd5b919050565b60008060408385031215610d1d57600080fd5b610d2683610cee565b946020939093013593505050565b600080600060608486031215610d4957600080fd5b610d5284610cee565b9250610d6060208501610cee565b9150604084013590509250925092565b600060208284031215610d8257600080fd5b61064282610cee565b60008060408385031215610d9e57600080fd5b610da783610cee565b915060208301358015158114610dbc57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610df357600080fd5b610dfc85610cee565b9350610e0a60208601610cee565b925060408501359150606085013567ffffffffffffffff80821115610e2e57600080fd5b818701915087601f830112610e4257600080fd5b813581811115610e5457610e54610dc7565b604051601f8201601f19908116603f01168101908382118183101715610e7c57610e7c610dc7565b816040528281528a6020848701011115610e9557600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610ecc57600080fd5b610ed583610cee565b9150610ee360208401610cee565b90509250929050565b600181811c90821680610f0057607f821691505b602082108103610f2057634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b60008351610f86818460208801610c6a565b835190830190610f9a818360208801610c6a565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b600082821015610fcb57610fcb610fa3565b500390565b60008219821115610fe357610fe3610fa3565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60006001820161104c5761104c610fa3565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261107857611078611053565b500490565b60008261108c5761108c611053565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906110da90830184610c96565b9695505050505050565b6000602082840312156110f657600080fd5b815161064281610c3756fea26469706673582212206776dfd3085fa7ba2622d457b9fa11cb938e15707359fa52901026e57d6cbf0464736f6c634300080f0033";

type ERC721UpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721UpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Upgradeable__factory extends ContractFactory {
  constructor(...args: ERC721UpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721Upgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC721Upgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC721Upgradeable {
    return super.attach(address) as ERC721Upgradeable;
  }
  override connect(signer: Signer): ERC721Upgradeable__factory {
    return super.connect(signer) as ERC721Upgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721UpgradeableInterface {
    return new utils.Interface(_abi) as ERC721UpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC721Upgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC721Upgradeable;
  }
}
