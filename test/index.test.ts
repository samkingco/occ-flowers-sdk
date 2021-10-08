import {
  getFlower,
  getFlowerByRank,
  listFlowers,
  listFlowersInWallet,
} from "../src/index";

describe("getFlower", () => {
  it("should get the correct flower info", async () => {
    const flower = await getFlower(108);
    expect(flower.tokenId).toEqual(108);
    expect(flower.attributes.petalStyle).toEqual("Dahlia");
    expect(flower.attributes.petalColor).toEqual("Grey Goose");
    expect(flower.attributes.coreSize).toEqual(22);
    expect(flower.attributes.noOfPetals).toEqual(10);
    expect(flower.attributes.bgColor).toEqual("Eastern Blue");
    expect(flower.attributes.bgOverlay).toEqual("Rosa");
    expect(flower.attributes.mutation).toEqual("Sketched");
    expect(flower.attributes.spin).toEqual(true);
    expect(flower.attributes.bgType).toEqual("Radial");
    expect(flower.image.svg).toEqual(
      "QmV3yxARDPF75TYk45RsXrVQz7afrQvcc98J3scZvjQYi5"
    );
    expect(flower.image.gif).toEqual(
      "QmQvUDaMKZ9LQKkej2649DDSLT3D16mwoXj4p4Jc9x391R"
    );
    expect(flower.image.png).toEqual(
      "Qmc5UMQ1XotHGNGuxv4kmpQDtWVxL5XHLHTe2SyuJumHUX"
    );
    expect(flower.rarity.occurrence.rank).toEqual(15);
    expect(flower.rarity.occurrence.score).toEqual(2556);
    expect(flower.rarity.probability.rank).toEqual(23);
    expect(flower.rarity.probability.score).toEqual(25.974238258340566);
    expect(flower.rarity.rarityTools.rank).toEqual(574);
    expect(flower.rarity.rarityTools.score).toEqual(201.01154631220555);
  });

  it("should error when an invalid 'tokenId' is used", () => {
    expect(getFlower(6666)).rejects.toThrow("Not found");
  });
});

describe("getFlowerByRank", () => {
  it("should get the correct flower info", async () => {
    const rank = 128;
    const rankOccurrence = await getFlowerByRank(rank, "rank-occurrence");
    expect(rankOccurrence.rarity.occurrence.rank).toEqual(rank);
    expect(rankOccurrence.tokenId).toEqual(1224);
    const rankProbability = await getFlowerByRank(rank, "rank-probability");
    expect(rankProbability.rarity.probability.rank).toEqual(rank);
    expect(rankProbability.tokenId).toEqual(261);
    const rankRarityTools = await getFlowerByRank(rank, "rank-rarity-tools");
    expect(rankRarityTools.rarity.rarityTools.rank).toEqual(rank);
    expect(rankRarityTools.tokenId).toEqual(2875);
  });

  it("should error when an invalid 'rank' is used", async () => {
    expect(getFlowerByRank(6666)).rejects.toThrow("Not found");
  });
});

describe("listFlowers", () => {
  it("should list all flowers with metadata", async () => {
    const flowers = await listFlowers();
    expect(flowers.length).toEqual(4096);
    expect(flowers[0].tokenId).toEqual(1);
  });

  it("should sort by tokenId", async () => {
    const asc = await listFlowers({ sortBy: "tokenId", sortOrder: "ASC" });
    expect(asc[0].tokenId).toEqual(1);
    const desc = await listFlowers({ sortBy: "tokenId", sortOrder: "DESC" });
    expect(desc[0].tokenId).toEqual(4096);
  });

  it("should sort by rarity occurrence", async () => {
    const asc = await listFlowers({
      sortBy: "rank-occurrence",
      sortOrder: "ASC",
    });
    expect(asc[0].tokenId).toEqual(3375);
    const desc = await listFlowers({
      sortBy: "rank-occurrence",
      sortOrder: "DESC",
    });
    expect(desc[0].tokenId).toEqual(2223);
  });

  it("should sort by rarity probability", async () => {
    const asc = await listFlowers({
      sortBy: "rank-probability",
      sortOrder: "ASC",
    });
    expect(asc[0].tokenId).toEqual(1178);
    const desc = await listFlowers({
      sortBy: "rank-probability",
      sortOrder: "DESC",
    });
    expect(desc[0].tokenId).toEqual(2271);
  });

  it("should sort by rarity tools formula", async () => {
    const asc = await listFlowers({
      sortBy: "rank-rarity-tools",
      sortOrder: "ASC",
    });
    expect(asc[0].tokenId).toEqual(973);
    const desc = await listFlowers({
      sortBy: "rank-rarity-tools",
      sortOrder: "DESC",
    });
    expect(desc[0].tokenId).toEqual(2271);
  });
});

describe("listFlowersInWallet", () => {
  const PREV_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...PREV_ENV };
  });

  afterAll(() => {
    process.env = PREV_ENV;
  });

  it("should list flowers for a wallet address", async () => {
    const flowers = await listFlowersInWallet(
      "0xB191271baaC4f10Bec72FB89e62528B6dE68508d"
    );
    expect(flowers.length).toEqual(12);
    expect(flowers[0].tokenId).toEqual(104);
  });

  it("should error if the 'ETH_RPC' env var is not set", () => {
    delete process.env.ETH_RPC;
    expect(
      listFlowersInWallet("0xB191271baaC4f10Bec72FB89e62528B6dE68508d")
    ).rejects.toThrow(
      "Please provide an ETH_RPC environment variable to work with wallet addresses"
    );
  });

  it("should error if the wallet address is invalid", () => {
    expect(listFlowersInWallet("invalid")).rejects.toThrow(
      "Invalid wallet address"
    );
  });
});
