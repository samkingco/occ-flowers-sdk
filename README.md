# OCC Flowers SDK (unofficial)

This includes a few helper functions for working with the OCC Flowers data. The data is a mix of on-chain attributes (keys are camelCase), rarity rankings, and IPFS content hashes for image hosting.

The IPFS hashes are for 3 file formats:

- `svg`: Decoded from the on-chain data.
- `png`: A generated screenshot of the SVG rendered in a browser so it includes all the nice mutations. 2048x2048 resolution.
- `gif`: Only for spinning flowers. 500x500 resolution.

It doesn't include the base64 images directly from the on-chain data because it would make the library way too big. There's a file that includes that info should you need it in this repo at `scripts/source-data/images.json`.

## Installation

```bash
npm i occ-flowers-sdk
```

## Usage

```typescript
import {
  getFlower,
  getFlowerByRank,
  listFlowers,
  listFlowersInWallet,
} from "occ-flowers-sdk";

// Get a single flower using a tokenID
const specificFlower = await getFlower(108);

// Get a single flower by a specific rank
const rankOneFlower = await getFlowerByRank(1, "rarity-tools");

// Get a list of all flowers
const allFlowers = await listFlowers();

// Get a list of all flowers sorted by rank
const rankedFlowers = await listFlowers({
  sortBy: "rank-probability",
});

// Get a list of flowers in a wallet
// Requires `ETH_RPC` environment variable
// You can obtain an RPC endpoint from a service like Infura
const myWallet = "0xB191271baaC4f10Bec72FB89e62528B6dE68508d";
const myFlowers = await listFlowersInWallet(myWallet);

// Get a list of flowers in a wallet sorted by rank
const myRankedFlowers = await listFlowersInWallet(myWallet, {
  sortBy: "rank-rarity-tools",
});
```

Fully typed so you get docs as you code. Check out the [types.ts](src/types.ts) file for more information on the returned data structure.
