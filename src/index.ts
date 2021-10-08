import { ethers } from "ethers";
import { contract } from "./contract";
import { Flower, ListFlowersOptions, RankingMethod } from "./types";
import flowersData from "./data/flowers.json";

const flowers = flowersData as Flower[];

export async function getFlower(tokenId: number): Promise<Flower> {
  const flower = flowers.find((i) => i.tokenId === tokenId);
  if (!flower) throw new Error("Not found");
  return flower;
}

function getRankingKey(rankingMethod: RankingMethod) {
  switch (rankingMethod) {
    case "rank-occurrence":
      return "occurrence";
    case "rank-rarity-tools":
      return "rarityTools";
    default:
      return "probability";
  }
}

export async function getFlowerByRank(
  rank: number,
  rankingMethod?: RankingMethod
) {
  const method = rankingMethod || "rank-probability";
  const rankingKey = getRankingKey(method);
  const flower = flowers.find((i) => i.rarity[rankingKey].rank === rank);
  if (!flower) throw new Error("Not found");
  return flower;
}

const defaultListFlowersOptions: ListFlowersOptions = {
  sortBy: "tokenId",
  sortOrder: "ASC",
};

export async function listFlowers(
  options = defaultListFlowersOptions
): Promise<Flower[]> {
  let flowersList = flowers;

  if (options.sortBy === "tokenId") {
    if (options.sortOrder === "DESC") {
      flowersList = flowersList.sort((a, b) => b.tokenId - a.tokenId);
    } else {
      flowersList = flowersList.sort((a, b) => a.tokenId - b.tokenId);
    }
  }

  if (options.sortBy === "rank-occurrence") {
    if (options.sortOrder === "DESC") {
      flowersList = flowersList.sort(
        (a, b) => b.rarity.occurrence.rank - a.rarity.occurrence.rank
      );
    } else {
      flowersList = flowersList.sort(
        (a, b) => a.rarity.occurrence.rank - b.rarity.occurrence.rank
      );
    }
  }

  if (options.sortBy === "rank-rarity-tools") {
    if (options.sortOrder === "DESC") {
      flowersList = flowersList.sort(
        (a, b) => b.rarity.rarityTools.rank - a.rarity.rarityTools.rank
      );
    } else {
      flowersList = flowersList.sort(
        (a, b) => a.rarity.rarityTools.rank - b.rarity.rarityTools.rank
      );
    }
  }

  if (options.sortBy === "rank-probability") {
    if (options.sortOrder === "DESC") {
      flowersList = flowersList.sort(
        (a, b) => b.rarity.probability.rank - a.rarity.probability.rank
      );
    } else {
      flowersList = flowersList.sort(
        (a, b) => a.rarity.probability.rank - b.rarity.probability.rank
      );
    }
  }

  return flowersList;
}

function isValidAddress(address: string) {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
}

export async function listFlowersInWallet(
  walletAddress: string,
  options = defaultListFlowersOptions
): Promise<Flower[]> {
  if (!process.env.ETH_RPC) {
    throw new Error(
      "Please provide an ETH_RPC environment variable to work with wallet addresses"
    );
  }

  if (!isValidAddress(walletAddress)) {
    throw new Error("Invalid wallet address");
  }

  // Get tokenIds from wallet
  let balance = await contract.balanceOf(walletAddress);
  balance = parseInt(balance.toString(), 10);

  const ownedTokenIds =
    balance > 0
      ? await Promise.all(
          Array.from({ length: balance }, (_, i) => i).map(async (i) => {
            const tokenId = await contract.tokenOfOwnerByIndex(
              walletAddress,
              i
            );
            return tokenId ? tokenId.toString() : undefined;
          })
        )
      : [];

  let flowersList = await listFlowers(options);

  flowersList = flowersList.filter((i) =>
    ownedTokenIds.includes(i.tokenId.toString())
  );

  return flowersList;
}
