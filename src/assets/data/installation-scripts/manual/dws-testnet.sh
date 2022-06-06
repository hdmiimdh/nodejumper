#!/bin/bash

sudo apt update
sudo apt install -y make gcc jq curl git snapd
sudo snap install lz4

if [ ! -f "/usr/local/go/bin/go" ]; then
  . <(curl -s "https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/installation-scripts/go_install.sh")
  . .bash_profile
fi

go version # go version goX.XX.X linux/amd64

sudo apt install -y make gcc jq git

cd && git clone https://github.com/deweb-services/deweb.git
cd deweb && git checkout v0.2 && make install

$binaryName version # 0.2

# replace nodejumper with your own moniker, if you'd like
$binaryName config chain-id $chainId
$binaryName init nodejumper --chain-id $chainId

cd && wget https://raw.githubusercontent.com/deweb-services/deweb/main/genesis.json
mv -f genesis.json $HOME/$homeDirectoryName/config/genesis.json
sha256sum $HOME/$homeDirectoryName/config/genesis.json # 13bf101d673990cb39e6af96e3c7e183da79bd89f6d249e9dc797ae81b3573c2

cd && wget https://raw.githubusercontent.com/encipher88/deweb/main/addrbook.json
mv -f addrbook.json $HOME/$homeDirectoryName/config/addrbook.json
sha256sum $HOME/$homeDirectoryName/config/addrbook.json # cf1692f9cf6cd3065a2b4f54bd05fa233fd17d011e183efcfd2624703d9bfa7f

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

SNAP_NAME=$(curl -s https://snapshots1-testnet.nodejumper.io/dws-testnet/ | egrep -o ">deweb-testnet-1.*\.tar.lz4" | tr -d ">")
wget -O - https://snapshots1-testnet.nodejumper.io/dws-testnet/${SNAP_NAME} | lz4 -dc - | tar -xf -

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
#  address: deweb1txne45klcm3w98merz25u94d7v9mlev3wngzrz
#  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Auq9WzVEs5pCoZgr2WctjI7fU+lJCH0I3r6GC1oa0tc0"}'
#  mnemonic: ""

#!!! SAVE SEED PHRASE
kite upset hip dirt pet winter thunder slice parent flag sand express suffer chest custom pencil mother bargain remember patient other curve cancel sweet

# Wait util the node is synced, should return FALSE
$binaryName status | jq .SyncInfo.catching_up

# Go to discord channel #faucet and paste
$request <YOUR_WALLET_ADDRESS> menkar

# Verify the balance
$binaryName q bank balances <YOUR_WALLET_ADDRESS>

## Console output
#  balances:
#  - amount: "5000000"
#    denom: udws

#Create validator
$binaryName tx staking create-validator \
--amount=4500000$denomName \
--pubkey=$($binaryName tendermint show-validator) \
--moniker=<YOUR_MONIKER_NAME> \
--chain-id=$chainId \
--commission-rate=0.1 \
--commission-max-rate=0.2 \
--commission-max-change-rate=0.05 \
--min-self-delegation=1 \
--fees=20000$denomName \
--from=wallet \
-y
