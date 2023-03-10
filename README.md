# Usage Instructions

## 1. Installing the repo

```bash
git clone https://github.com/XP-NETWORK/batch-ethereum-vechain.git
cd batch-ethereum-vechain/
yarn
```

## 2. Preparing for batch transfer

Rename the `.env.example` to `.env` file:
```bash
cp .env.example .env
```
Populate the values where they are missing. For instructions read the comments:

```bash
# The private (secret) key of the sender
SK=
# The address of the recipient
RECEIVER=
# The contract of origin address
FROM_CONTRACT=0xCbA56d441da86dEfe31d3AdDeEc2bA04f7e27d9e
# The contract of destination address (optional if returning)
TO_CONTRACT=
# The chain RPC node
RPC=https://eth.llamarpc.com
```

## 3. To start bridging

Run in the terminal:
```bash
yarn start
```

Wait till the script finishes its work.