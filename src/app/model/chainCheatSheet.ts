export class ChainCheatSheet {
  id: string;
  chainId: string;
  denomName: string;
  binaryName: string;
  homeDirectoryName: string;
  walletName: string;
  valoperAddress: string;
  fees: number;


  constructor(id: string, chainId: string, denomName: string, binaryName: string, homeDirectoryName: string, walletName: string, valoperAddress: string, fees: number) {
    this.id = id;
    this.chainId = chainId;
    this.denomName = denomName;
    this.binaryName = binaryName;
    this.homeDirectoryName = homeDirectoryName;
    this.walletName = walletName;
    this.valoperAddress = valoperAddress;
    this.fees = fees;
  }
}
