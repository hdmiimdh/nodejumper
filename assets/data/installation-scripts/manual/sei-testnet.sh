#!/bin/bash

sudo apt update
sudo apt install -y make gcc jq curl git build-essential

if [ ! -f "/usr/local/go/bin/go" ]; then
  . <(curl -s "https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/utils/go_install.sh")
  . .bash_profile
fi

go version # go version goX.XX.X linux/amd64

cd || return
rm -rf sei-chain
git clone https://github.com/sei-protocol/sei-chain.git
cd sei-chain || return
git checkout 1.0.6beta
make install
$binaryName version # 1.0.6beta

# replace nodejumper with your own moniker, if you'd like
$binaryName config chain-id $chainId
$binaryName init nodejumper --chain-id $chainId -o

curl -s https://raw.githubusercontent.com/sei-protocol/testnet/main/sei-incentivized-testnet/genesis.json > ~/.sei/config/genesis.json
sha256sum $HOME/$homeDirectoryName/config/genesis.json # aec481191276a4c5ada2c3b86ac6c8aad0cea5c4aa6440314470a2217520e2cc

curl -s https://raw.githubusercontent.com/sei-protocol/testnet/main/sei-incentivized-testnet/addrbook.json > ~/.sei/config/addrbook.json
sha256sum $HOME/$homeDirectoryName/config/addrbook.json # 9058b83fca36c2c09fb2b7c04293382084df0960b4565090c21b65188816ffa6

sed -i 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.0001$denomName"|g' $HOME/$homeDirectoryName/config/app.toml
seeds="df1f6617ff5acdc85d9daa890300a57a9d956e5e@sei-atlantic-1.seed.rhinostake.com:16660"
peers="$rpcPeer,22991efaa49dbaae857669d44cb564406a244811@18.222.18.162:26656,a37d65086e78865929ccb7388146fb93664223f7@18.144.13.149:26656,873a358b46b07c0c7c0280397a5ad27954a10633@141.95.175.196:26656,e66f9a9cab4428bfa3a7f32abbedbc684e734a48@185.193.17.129:12656,16225e262a0d38fe73073ab199f583e4a607e471@135.181.59.162:19656,2efd524f097b3fef2d26d0031fda21a72a51a765@38.242.213.174:12656,3b5ae3a1691d4ed24e67d7fe1499bc081c3ad8b0@65.108.131.189:20956,ad6d30dc6805df4f48b49d9013bbb921a5713fa6@20.211.82.153:26656,4e53c634e89f7b7ecff98e0d64a684269403dd78@38.242.235.141:26656,da5f6fcd1cd2ba8c7de8a06fb3ab56ab6a8157cf@38.242.235.142:26656,89e7d8c9eefc1c9a9b3e1faff31c67e0674f9c08@165.227.11.230:26656,94b6fa7ae5554c22e81a81e4a0928c48e41801d8@88.99.3.158:10956,b95aa07e60928fbc5ba7da9b6fe8c51798bd40be@51.250.6.195:26656,94b72206c0b0007494e20e2f9b958cd57e970d48@209.145.50.102:26656,94cf3893ded18bc6e3991d5add88449cd3f6c297@65.108.230.75:26656,82de728de0d663c03a820e570b94adac19c09adf@5.9.80.215:26656,5e1f8ccfa64dfd1c17e3fdac0dbf50f5fcc1acc3@209.126.7.113:26656,6a5113e8412f68bbeab733bb1297a0a38f884f7c@162.55.80.116:26656,7c95b2eec599369bebb8281b960589dc2857548a@164.215.102.44:26656,4bf8aa7b80f4db8a6f2abf5d757c9cab5d3f4d85@188.40.98.169:26656,9e38cf7ccb898632482a09b26ecba3f7e1a9e300@51.75.135.46:26656,641eea8d26c4b3b479b95a2cb4bd04712f3eda29@135.181.249.71:12656,8625abf6079da0e3326b0ad74c9c0e263af39654@137.184.44.146:12656,11c84300b4417af7e6c081f413003176b33b3877@51.75.135.47:26656,8a349512cf1ce179a126cb8762aea955ca1a261f@195.201.243.40:26651,6c27c768936ff8eebde94fe898b54df71f936e48@47.156.153.124:56656,7f037abdf485d02b95e50e9ba481166ddd6d6cae@185.144.99.65:26656,90916e0b118f2c00e90a40a0180b275261b547f2@65.108.72.121:26656,02be57dc6d6491bf272b823afb81f24d61243e1e@141.94.139.233:26656,ed3ec09ab24b8fcf0a36bc80de4b97f1e379d346@38.242.206.198:26656,7caa7add8d8a279e2da67a72700ab2d4540fbc08@34.97.43.89:12656,cce4c3526409ec516107db695233f9b047d52bf6@128.199.59.125:36376,3f6e68bd476a7cd3f491105da50306f8ebb74643@65.21.143.79:21156"
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

SNAP_RPC="$rpcServer"
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
#  address: sei1lfpde6scf7ulzvuq2suavav6cpmpy0rzxne0pw
#  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Auq9WzVEs5pCoZgr2WctjI7fU+lJCH0I3r6GC1oa0tc0"}'
#  mnemonic: ""

#!!! SAVE SEED PHRASE
kite upset hip dirt pet winter thunder slice parent flag sand express suffer chest custom pencil mother bargain remember patient other curve cancel sweet

# Wait util the node is synced, should return FALSE
$binaryName status 2>&1 | jq .SyncInfo.catching_up

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
