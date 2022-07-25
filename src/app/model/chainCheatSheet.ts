export class ChainCheatSheet {
  id: string;
  chainId: string;
  denomName: string;
  binaryName: string;
  homeDirectoryName: string;
  keyName: string;
  gas: number;
  moniker: string;
  identity: string;
  details: string;
  proposalId: number;
  toValoperAddress: string;
  toWalletAddress: string;
  portIncrement: number;
  serviceName: string;
  commissionRate: string;
  commissionMaxRate: string;
  commissionMaxChangeRate: string;
  githubRepoName: string;
  amount: number;
  indexer: string;
  pruning: string;
  pruningKeepRecent: number;
  pruningKeepEvery: number;
  pruningInterval: number;
  txId: string;

  constructor(id: string, chainId: string, denomName: string, binaryName: string, homeDirectoryName: string,
              keyName: string, gas: number, moniker: string, identity: string,
              details: string, proposalId: number, toValoperAddress: string, toWalletAddress: string,
              portIncrement: number, serviceName: string, commissionRate: string, commissionMaxRate: string,
              commissionMaxChangeRate: string, githubRepoName: string, amount:number, indexer: string, pruning: string,
              pruningKeepRecent: number, pruningKeepEvery: number, pruningInterval: number, txId: string) {
    this.id = id;
    this.chainId = chainId;
    this.denomName = denomName;
    this.binaryName = binaryName;
    this.homeDirectoryName = homeDirectoryName;
    this.keyName = keyName;
    this.gas = gas;
    this.moniker = moniker;
    this.identity = identity;
    this.details = details;
    this.proposalId = proposalId;
    this.toValoperAddress = toValoperAddress;
    this.toWalletAddress = toWalletAddress;
    this.portIncrement = portIncrement;
    this.serviceName = serviceName;
    this.commissionRate = commissionRate;
    this.commissionMaxRate = commissionMaxRate;
    this.commissionMaxChangeRate = commissionMaxChangeRate;
    this.githubRepoName = githubRepoName;
    this.amount = amount;
    this.indexer = indexer;
    this.pruning = pruning;
    this.pruningKeepRecent = pruningKeepRecent;
    this.pruningKeepEvery = pruningKeepEvery;
    this.pruningInterval = pruningInterval;
    this.txId = txId;
  }
}
