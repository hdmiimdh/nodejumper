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

  constructor(id: string, chainId: string, denomName: string, binaryName: string, homeDirectoryName: string, walletName: string, valoperAddress: string, fees: number, moniker: string, identity: string, details: string, proposalId: number) {
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
  }
}
