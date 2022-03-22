import {Chain} from "../model/chain";

export const CHAINS: Chain[] = [
  {
    chainName:"Rizon",
    chainId:"titan-1",
    snapshotServer: "https://snapshots.nodejumper.io",
    rpcServer1: "http://rpc1.nodejumper.io:26657",
    rpcServer2: "http://rpc2.nodejumper.io:26657",
    peer1: "0d51e8b9eb24f412dffc855c7bd854a8ecb3dff5@rpc1.nodejumper.io:26656",
    peer2: "422f0d89944ab2661c0fafe05c84302260fff94e@rpc2.nodejumper.io:26656",
    binaryName: "rizond",
    homeDirectoryName: ".rizon"
  },
  {
    chainName:"Bitcanna",
    chainId:"bitcanna-1",
    snapshotServer: "https://snapshots.nodejumper.io",
    rpcServer1: "http://rpc1.nodejumper.io:27657",
    rpcServer2: "http://rpc2.nodejumper.io:27657",
    peer1: "45589e6147e36dda9e429668484d7614fb25b142@rpc1.nodejumper.io:27656",
    peer2: "add5f91ecb28b785e8c6b51b0a4b17974196a035@rpc2.nodejumper.io:27656",
    binaryName: "bcnad",
    homeDirectoryName: ".bcna"
  },
  {
    chainName:"Kichain",
    chainId:"kichain-2",
    snapshotServer: "https://snapshots.nodejumper.io",
    rpcServer1: "http://rpc1.nodejumper.io:28657",
    rpcServer2: "http://rpc2.nodejumper.io:28657",
    peer1: "766ed622c79fa9cfd668db9741a1f72a5751e0cd@rpc1.nodejumper.io:28656",
    peer2: "9f825f1be8d3d4944f64e37b955f08877a964003@rpc2.nodejumper.io:28656",
    binaryName: "kid",
    homeDirectoryName: ".kid"
  }
]
