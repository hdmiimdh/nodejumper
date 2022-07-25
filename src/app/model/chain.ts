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
  telegram?: string;
  coingekoCoinId?: string;
  validatorUrl?: string;
  projectOverview?: string;
  snapshotDisabled?: boolean;
  stateSyncDisabled?: boolean;
  summaryDisabled?: boolean;
  denomName: string;
  denomPow: number;
  apiChainId?: string;
  stateSyncExtraStep?: string;
  isProjectSupportUs?: boolean;
  newWayUnsafeResetAll?: boolean;
  isTestnet?: boolean;
  hardwareRequirements?: string;
  githubRepoName?: string;
  isArchive?: boolean;
  archiveReason?: string;
  endedAt?: string;
  testnetTasksLink?: string;

  constructor(id: string, chainName: string, chainId: string, snapshotServer: string, rpcServer: string,
              rpcPeer: string, serviceName: string, homeDirectoryName: string, twitter: string, github: string,
              globe: string, denomName: string, denomPow: number) {
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
