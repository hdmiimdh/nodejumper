export class Chain {
  id: string;
  chainName: string;
  chainId: string;
  snapshotServer: string;
  rpcServer1: string;
  rpcServer2: string;
  peer1: string;
  peer2: string;
  serviceName: string;
  binaryName?: string;
  homeDirectoryName: string;
  twitter: string;
  github: string;
  globe: string;
  medium?: string;
  discord?: string;
  coingekoCoinId: string;
  validatorUrl: string;

  constructor(id: string, chainName: string, chainId: string, snapshotServer: string, rpcServer1: string, rpcServer2: string, peer1: string, peer2: string, serviceName: string, homeDirectoryName: string, twitter: string, github: string, globe: string, medium: string, coingekoCoinId: string, validatorUrl: string) {
    this.id = id;
    this.chainName = chainName;
    this.chainId = chainId;
    this.snapshotServer = snapshotServer;
    this.rpcServer1 = rpcServer1;
    this.rpcServer2 = rpcServer2;
    this.peer1 = peer1;
    this.peer2 = peer2;
    this.serviceName = serviceName;
    this.homeDirectoryName = homeDirectoryName;
    this.twitter = twitter;
    this.github = github;
    this.globe = globe;
    this.medium = medium;
    this.coingekoCoinId = coingekoCoinId;
    this.validatorUrl = validatorUrl;
  }
}
