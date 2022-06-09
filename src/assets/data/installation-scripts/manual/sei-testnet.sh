#!/bin/bash

sudo apt update
sudo apt install -y make gcc jq curl git snapd
sudo snap install lz4

if [ ! -f "/usr/local/go/bin/go" ]; then
  . <(curl -s "https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/utils/go_install.sh")
  . .bash_profile
fi

go version # go version goX.XX.X linux/amd64

cd || return
rm -rf sei-chain
git clone https://github.com/sei-protocol/sei-chain.git
cd sei-chain || return
git checkout 1.0.2beta
make install
$binaryName version # 1.0.2beta

# replace nodejumper with your own moniker, if you'd like
$binaryName config chain-id $chainId
$binaryName init nodejumper --chain-id $chainId -o

curl https://raw.githubusercontent.com/sei-protocol/testnet/master/sei-testnet-2/genesis.json > ~/.sei/config/genesis.json
sha256sum $HOME/$homeDirectoryName/config/genesis.json # aec481191276a4c5ada2c3b86ac6c8aad0cea5c4aa6440314470a2217520e2cc

curl https://raw.githubusercontent.com/sei-protocol/testnet/master/sei-testnet-2/addrbook.json > ~/.sei/config/addrbook.json
sha256sum $HOME/$homeDirectoryName/config/addrbook.json # 9058b83fca36c2c09fb2b7c04293382084df0960b4565090c21b65188816ffa6

sed -i 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.0001$denomName"|g' $HOME/$homeDirectoryName/config/app.toml
seeds=""
peers="$rpcPeer,38b4d78c7d6582fb170f6c19330a7e37e6964212@194.163.189.114:46656,5b5ec09067a5fcaccf75f19b45ab29ce07e0167c@18.118.159.154:26656,b20fa6b0a283e153c446fd58dd1e1ae56b09a65d@159.69.110.238:26656,613f6f5a67c4f0625599ca74b98b7d722f908262@159.65.195.25:36376,1c384cbe9421957813f49865bb8db8c190a90415@139.59.38.171:36376,8b5d1f7d5422e373b00c129ccda14556b69e2a61@167.235.21.137:26656,8c4ec366b5ebd182ffe463e3e1a3a6a345d7d1eb@80.82.215.233:26656,214d45c890cccc09ee725bd101a60dcd690cd554@49.12.215.72:26676,d87dcc1d6b5517b4da9a1ca48717a68ee3bd1d6a@89.163.215.204:26656,fed3ec8e12ddde3fc8e90efc1746e55d10a623f0@65.109.11.114:26656"
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

SNAP_NAME=$(curl -s https://snapshots1-testnet.nodejumper.io/sei-testnet/ | egrep -o ">sei-testnet-2.*\.tar.lz4" | tr -d ">")
curl https://snapshots1-testnet.nodejumper.io/sei-testnet/${SNAP_NAME} | lz4 -dc - | tar -xf -

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
#  address: sei1lfpde6scf7ulzvuq2suavav6cpmpy0rzxne0pw
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
