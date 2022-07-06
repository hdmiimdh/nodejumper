#!/bin/bash

sudo apt update
sudo apt install -y make gcc jq curl git snapd build-essential
sudo snap install lz4

if [ ! -f "/usr/local/go/bin/go" ]; then
  . <(curl -s "https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/utils/go_install.sh")
  . .bash_profile
fi

go version # go version goX.XX.X linux/amd64

cd || return
curl https://github.com/CosmWasm/wasmvm/raw/v0.13.0/api/libwasmvm.so > libwasmvm.so
sudo mv -f libwasmvm.so /lib/libwasmvm.so
rm -rf starnamed
git clone https://github.com/iov-one/starnamed.git
cd starnamed || return
git checkout v0.10.13
make install
$binaryName version # v0.10.13

# replace nodejumper with your own moniker, if you'd like
$binaryName init nodejumper --chain-id $chainId

curl https://gist.githubusercontent.com/davepuchyr/6bea7bf369064d118195e9b15ea08a0f/raw/cf66fd02ea9336bd79cbc47dd47dcd30aad7831c/genesis.json > $HOME/$homeDirectoryName/config/genesis.json
sha256sum $HOME/$homeDirectoryName/config/genesis.json # e20eb984b3a85eb3d2c76b94d1a30c4b3cfa47397d5da2ec60dca8bef6d40b17

sed -i 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.0001$denomName"|g' $HOME/$homeDirectoryName/config/app.toml
seeds=""
peers="$rpcPeer"
sed -i -e 's|^seeds *=.*|seeds = "'$seeds'"|; s|^persistent_peers *=.*|persistent_peers = "'$peers'"|' $HOME/$homeDirectoryName/config/config.toml

# in case of pruning
sed -i 's|pruning = "default"|pruning = "custom"|g' $HOME/$homeDirectoryName/config/app.toml
sed -i 's|pruning-keep-recent = "0"|pruning-keep-recent = "100"|g' $HOME/$homeDirectoryName/config/app.toml
sed -i 's|pruning-interval = "0"|pruning-interval = "10"|g' $HOME/$homeDirectoryName/config/app.toml

sudo tee /etc/systemd/system/$serviceName.service > /dev/null << EOF
[Unit]
Description=$chainName Node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which $binaryName) start
Restart=on-failure
RestartSec=10
LimitNOFILE=10000
[Install]
WantedBy=multi-user.target
EOF

$binaryName unsafe-reset-all
rm -rf $HOME/$homeDirectoryName/data && cd $HOME/$homeDirectoryName

SNAP_NAME=$(curl -s https://snapshots2.nodejumper.io/starname/ | egrep -o ">iov-mainnet-ibc.*\.tar.lz4" | tr -d ">")
curl https://snapshots2.nodejumper.io/starname/${SNAP_NAME} | lz4 -dc - | tar -xf -

sudo systemctl daemon-reload
sudo systemctl enable $serviceName
sudo systemctl restart $serviceName

sudo journalctl -u $serviceName -f --no-hostname -o cat
