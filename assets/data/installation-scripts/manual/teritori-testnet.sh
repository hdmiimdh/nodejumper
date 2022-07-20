#!/bin/bash

sudo apt update
sudo apt install -y make gcc jq curl git build-essential

if [ ! -f "/usr/local/go/bin/go" ]; then
  . <(curl -s "https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/utils/go_install.sh")
  . .bash_profile
fi

go version # go version goX.XX.X linux/amd64

cd || return
rm -rf anone
git clone https://github.com/TERITORI/teritori-chain
cd teritori-chain || return
git checkout teritori-testnet-v2
make install
$binaryName version # teritori-testnet-v2-0f4e5cb1d529fa18971664891a9e8e4c114456c6

# replace nodejumper with your own moniker, if you'd like
$binaryName config chain-id $chainId
$binaryName init nodejumper --chain-id $chainId

curl https://raw.githubusercontent.com/TERITORI/teritori-chain/main/testnet/teritori-testnet-v2/genesis.json > $HOME/$homeDirectoryName/config/genesis.json
sha256sum $HOME/$homeDirectoryName/config/genesis.json # 2f1dbf5cc8b302dbbea2e2d14598d77d59a49d70743375d3bab6abea1889fde0

seeds=""
peers="$rpcPeer,87fd0780bac408fe94ca7b2d9cb82fbef599af41@65.108.52.192:46656,4217ea4193bb066d28825562685c851b3e341369@65.109.10.154:26656,f0521297463bfab11cf29205511788de33efbf0c@162.55.165.168:26656,d737f16ad665889ca800d870bf10d2d478df1fe4@195.54.41.122:26656,5c52667ed7bda88604b8f2357ce37e9f26569e99@78.46.106.75:26656,8693c93371a7e1766225d377f09dcea7177007ee@185.194.218.196:36656,34df38933c32ee21078c1d79787d76668f398b9e@89.163.231.30:36656,545b1fe982b92aeb9f1eadd05ab0954b38eba402@194.163.177.240:26656,0248e2989a8a4f6ad87cbe0490c08908a2c2da7f@5.199.133.165:26656"
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

$binaryName tendermint unsafe-reset-all --home $HOME/$homeDirectoryName --keep-addr-book

SNAP_RPC="$rpcServer:443"
LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height); \
BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000)); \
TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)

echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH

sed -i -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC,$SNAP_RPC\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" $HOME/$homeDirectoryName/config/config.toml

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
#  address: tori1wpkxhzufzrmz6glt4sjp54k3umgvx5hv3rx6y7
#  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Auq9WzVEs5pCoZgr2WctjI7fU+lJCH0I3r6GC1oa0tc0"}'
#  mnemonic: ""

#!!! SAVE SEED PHRASE
kite upset hip dirt pet winter thunder slice parent flag sand express suffer chest custom pencil mother bargain remember patient other curve cancel sweet

# Wait util the node is synced, should return FALSE
$binaryName status 2>&1 | jq .SyncInfo.catching_up

# Go to discord channel #faucet and paste
$request <YOUR_WALLET_ADDRESS>

# Verify the balance
$binaryName q bank balances $($binaryName keys show wallet -a)

## Console output
#  balances:
#  - amount: "1000000"
#    denom: utori

# Create validator
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

# Make sure you see the validator details
$binaryName q staking validator $($binaryName keys show wallet --bech val -a)
