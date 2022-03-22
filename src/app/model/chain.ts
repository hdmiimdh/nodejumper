export class Chain {
  chainName: string;
  chainId: string;
  snapshotServer: string;
  rpcServer1: string;
  rpcServer2: string;
  peer1: string;
  peer2: string;
  binaryName: string;
  homeDirectoryName: string;

  constructor(chainName: string, chainId: string, snapshotServer: string, rpcServer1: string, rpcServer2: string, peer1: string, peer2: string, binaryName: string, homeDirectoryName: string) {
    this.chainName = chainName;
    this.chainId = chainId;
    this.snapshotServer = snapshotServer;
    this.rpcServer1 = rpcServer1;
    this.rpcServer2 = rpcServer2;
    this.peer1 = peer1;
    this.peer2 = peer2;
    this.binaryName = binaryName;
    this.homeDirectoryName = homeDirectoryName;
  }
}
