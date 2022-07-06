export class ChainCheatSheet {
  id: string;
  chainId: string;
  denomName: string;
  binaryName: string;
  homeDirectoryName: string;
  walletName: string;
  valoperAddress: string;
  fees: number;
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

  constructor(id: string, chainId: string, denomName: string, binaryName: string, homeDirectoryName: string,
              walletName: string, valoperAddress: string, fees: number, moniker: string, identity: string,
              details: string, proposalId: number, toValoperAddress: string, toWalletAddress: string,
              portIncrement: number, serviceName: string, commissionRate: string, commissionMaxRate: string,
              commissionMaxChangeRate: string, githubRepoName: string) {
    this.id = id;
    this.chainId = chainId;
    this.denomName = denomName;
    this.binaryName = binaryName;
    this.homeDirectoryName = homeDirectoryName;
    this.walletName = walletName;
    this.valoperAddress = valoperAddress;
    this.fees = fees;
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
  }
}
