#!/bin/bash

sudo apt update
sudo apt install -y make gcc jq curl git snapd
sudo snap install lz4

if [ ! -f "/usr/local/go/bin/go" ]; then
  . <(curl -s "https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/installation-scripts/go_install.sh")
  . .bash_profile
fi

go version # go version goX.XX.X linux/amd64

cd && git clone https://github.com/sei-protocol/sei-chain.git
cd sei-chain && git checkout 1.0.0beta && go build -o build/seid ./cmd/sei-chaind
mkdir -p $HOME/go/bin && mv build/seid $HOME/go/bin

$binaryName version

# replace nodejumper with your own moniker, if you'd like
$binaryName config chain-id $chainId
$binaryName init nodejumper --chain-id $chainId

curl https://raw.githubusercontent.com/sei-protocol/testnet/master/sei-testnet-1/genesis.json > $HOME/$homeDirectoryName/config/genesis.json
sha256sum $HOME/$homeDirectoryName/config/genesis.json # d212a915dcde84f1dc2208ca5ee890adfd6ffc5d4ff9a32332f50659b3b5ab1a

curl https://raw.githubusercontent.com/sei-protocol/testnet/master/sei-testnet-1/addrbook.json > $HOME/$homeDirectoryName/config/addrbook.json
sha256sum $HOME/$homeDirectoryName/config/addrbook.json # 2ff327d2ab89c9ec56f86c14fdc67cbfc12e4716ae8cecc3bb497d92c4d8411e

sed -i 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.0001$denomName"|g' $HOME/$homeDirectoryName/config/app.toml
seeds=""
peers="$rpcPeer"
sed -i -e 's|^seeds *=.*|seeds = "'$seeds'"|; s|^\bpersistent_peers *=.*"\b|persistent_peers = \"'$peers',|' $HOME/$homeDirectoryName/config/config.toml

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

SNAP_NAME=$(curl -s https://snapshots1-testnet.nodejumper.io/sei-testnet/ | egrep -o ">sei-testnet-1.*\.tar.lz4" | tr -d ">")
wget -O - https://snapshots1-testnet.nodejumper.io/sei-testnet/${SNAP_NAME} | lz4 -dc - | tar -xf -

sudo systemctl daemon-reload
sudo systemctl enable $serviceName
sudo systemctl restart $serviceName

sudo journalctl -u $serviceName -f --no-hostname -o cat

Create Validator Delimiter

# Create wallet
$binaryName keys add wallet

## Console output
#- name: wallet
#  type: local
#  address: cosmos1lfpde6scf7ulzvuq2suavav6cpmpy0rzxne0pw
#  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Auq9WzVEs5pCoZgr2WctjI7fU+lJCH0I3r6GC1oa0tc0"}'
#  mnemonic: ""

#!!! SAVE SEED PHRASE
kite upset hip dirt pet winter thunder slice parent flag sand express suffer chest custom pencil mother bargain remember patient other curve cancel sweet

# Wait util the node is synced, should return FALSE
$binaryName status | jq .SyncInfo.catching_up

# Go to discord channel #testnet-faucet and fill in google form to request tokens

# Verify the balance
$binaryName q bank balances <YOUR_WALLET_ADDRESS>

## Console output
#  balances:
#  - amount: "1000000"
#    denom: usei

#Create validator
$binaryName tx staking create-validator \
--amount=1000000$denomName \
--pubkey=$($binaryName tendermint show-validator) \
--moniker=<YOUR_MONIKER_NAME> \
--chain-id=$chainId \
--commission-rate=0.1 \
--commission-max-rate=0.2 \
--commission-max-change-rate=0.05 \
--min-self-delegation=1 \
--from=wallet \
-y
