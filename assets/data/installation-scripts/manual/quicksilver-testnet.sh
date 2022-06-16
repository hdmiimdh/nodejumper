#!/bin/bash

sudo apt update
sudo apt install -y make gcc jq curl git

if [ ! -f "/usr/local/go/bin/go" ]; then
  . <(curl -s "https://raw.githubusercontent.com/nodejumper-org/cosmos-utils/main/utils/go_install.sh")
  . .bash_profile
fi

go version # go version goX.XX.X linux/amd64

cd || return
git clone https://github.com/ingenuity-build/quicksilver.git
cd quicksilver || return
git checkout v0.3.0
make install
quicksilverd version # v0.3.0

# replace nodejumper with your own moniker, if you'd like
$binaryName config chain-id $chainId
$binaryName init nodejumper --chain-id $chainId

curl https://raw.githubusercontent.com/ingenuity-build/testnets/main/rhapsody/genesis.json > $HOME/$homeDirectoryName/config/genesis.json
sha256sum $HOME/$homeDirectoryName/config/genesis.json # 541a6546bbdfe96c6b0dbf38425430eb97e8bc026bd1e224ded757a21bfdde49

sed -i 's|^minimum-gas-prices *=.*|minimum-gas-prices = "0.0001$denomName"|g' $HOME/$homeDirectoryName/config/app.toml
seeds="dd3460ec11f78b4a7c4336f22a356fe00805ab64@seed.rhapsody-5.quicksilver.zone:26656,8603d0778bfe0a8d2f8eaa860dcdc5eb85b55982@seed.qscosmos-2.quicksilver.zone:27676"
peers="$rpcPeer,c5cbd164de9c20a13e54e949b63bcae4052a948c@138.201.139.175:20956,9428068507466b542cbf378d59b77746c1d19a34@157.90.35.151:26657,4e7a6d8a3c8eeaad4be4898d8ec3af1cef92e28d@93.186.200.248:26656,eaeb462547cf76c3588e458120097b51db732b14@194.163.155.84:26656,51af5b6b4b0f5b2b53df98ec1b029743973f08aa@75.119.145.20:26656,9a9ed14d71a88354b0383419432ecce70e8cd2b3@161.97.152.215:26656,43bca26cb1b2e7474a8ffa560f210494023d5de4@135.181.140.225:26657,1ba34e984db33e075f10b4139a514e9ff7c07d7d@65.21.131.215:26676,86b0be64be9637f6e23ecf475edd164fa07b5665@65.21.134.202:26676,quickvaloper1k5z844rctd8jtaw4t22ae2308h4pew0ups676v"
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
rm -rf $HOME/.quicksilverd/data
cd $HOME/.quicksilverd || return

SNAP_NAME=$(curl -s https://snapshots1-testnet.nodejumper.io/quicksilver/ | egrep -o ">rhapsody-5.*\.tar.lz4" | tr -d ">")
echo "Downloading a snapshot..."
curl -# https://snapshots1-testnet.nodejumper.io/quicksilver/"${SNAP_NAME}" | lz4 -dc - | tar -xf -

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
#  address: quick159njc3xk0xv76x323936frgwxf9zn3wvlzrlf6
#  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Auq9WzVEs5pCoZgr2WctjI7fU+lJCH0I3r6GC1oa0tc0"}'
#  mnemonic: ""

#!!! SAVE SEED PHRASE
reason crew zone unfold grain jungle shell before joke doll powder still aspect angle pepper nice canvas clinic one art rival lab wheat digital

# Wait util the node is synced, should return FALSE
$binaryName status | jq .SyncInfo.catching_up

# Go to discord channel #qck-tap and paste
$faucet <YOUR_WALLET_ADDRESS> rhapsody

# Verify the balance
$binaryName q bank balances <YOUR_WALLET_ADDRESS>

## Console output
#  balances:
#  - amount: "500000"
#    denom: uqck

#Create validator
$binaryName tx staking create-validator \
--amount=500000$denomName \
--pubkey=$($binaryName tendermint show-validator) \
--moniker=<YOUR_MONIKER_NAME> \
--chain-id=$chainId \
--commission-rate=0.1 \
--commission-max-rate=0.2 \
--commission-max-change-rate=0.05 \
--min-self-delegation=1 \
--fees=20000$denomName \
--gas=auto \
--from=wallet \
-y
