import fs from "fs";
import path from "path";

function readJSON(filename) {
  const data = fs.readFileSync(path.join(process.cwd(), filename));
  return JSON.parse(data);
}

(async () => {
  const TOTAL_FLOWERS = 4096;
  const attributes = readJSON("scripts/source-data/attributes.json");
  const images = readJSON("scripts/source-data/images.json");
  const rarityOccurrence = readJSON(
    "scripts/source-data/rarity-occurrence.json"
  );
  const rarityProbability = readJSON(
    "scripts/source-data/rarity-probability.json"
  );
  const rarityRtFormula = readJSON(
    "scripts/source-data/rarity-rt-formula.json"
  );

  const flowers = [];
  for (let i = 0; i < TOTAL_FLOWERS; i++) {
    const tokenId = i + 1;
    const tokenIdStr = tokenId.toString();
    const flowerAttributes = attributes[tokenIdStr];
    const { svg, gif, png } = images[tokenId];
    const flowerRarityOccurrence = rarityOccurrence.find(
      (i) => i.tokenId === tokenId
    );
    const flowerRarityProbability = rarityProbability.find(
      (i) => i.tokenId === tokenId
    );
    const flowerRarityRtFormula = rarityRtFormula.find(
      (i) => i.tokenId === tokenId
    );

    flowers.push({
      tokenId,
      attributes: flowerAttributes,
      image: {
        svg,
        gif,
        png,
      },
      rarity: {
        occurrence: {
          rank: flowerRarityOccurrence.rarest,
          score: flowerRarityOccurrence.score,
        },
        probability: {
          rank: flowerRarityProbability.rarest,
          score: flowerRarityProbability.score,
        },
        rarityTools: {
          rank: flowerRarityRtFormula.rarest,
          score: flowerRarityRtFormula.score,
        },
      },
    });
  }

  fs.writeFileSync(
    path.join(process.cwd(), "src/data/flowers.json"),
    JSON.stringify(flowers)
  );

  const base64Images = {};
  for (let i = 0; i < TOTAL_FLOWERS; i++) {
    const tokenId = i + 1;
    const { base64 } = images[tokenId.toString()];
    base64Images[tokenId] = base64;
  }

  fs.writeFileSync(
    path.join(process.cwd(), "src/data/base64-images.json"),
    JSON.stringify(base64Images)
  );
})();
