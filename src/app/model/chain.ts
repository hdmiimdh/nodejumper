export class Chain {
  id: string;
  chainName: string;
  chainId: string;
  snapshotServer: string;
  rpcServer: string;
  rpcPeer: string;
  serviceName: string;
  binaryName?: string;
  homeDirectoryName: string;
  twitter: string;
  github: string;
  globe: string;
  medium?: string;
  discord?: string;
  coingekoCoinId?: string;
  validatorUrl?: string;
  projectOverview?: string;
  stateSyncDisabled?: boolean;
  denomName: string;
  denomPow: number;
  apiChainId?: string;
  stateSyncExtraStep?: string;

  constructor(id: string, chainName: string, chainId: string, snapshotServer: string, rpcServer: string, rpcPeer: string, serviceName: string, homeDirectoryName: string, twitter: string, github: string, globe: string, denomName: string, denomPow: number) {
    this.id = id;
    this.chainName = chainName;
    this.chainId = chainId;
    this.snapshotServer = snapshotServer;
    this.rpcServer = rpcServer;
    this.rpcPeer = rpcPeer;
    this.serviceName = serviceName;
    this.homeDirectoryName = homeDirectoryName;
    this.twitter = twitter;
    this.github = github;
    this.globe = globe;
    this.denomName = denomName;
    this.denomPow = denomPow;
  }
}
