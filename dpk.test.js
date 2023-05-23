const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

const HASH_CODE = "hash-test";

describe("deterministicPartitionKey", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the partition key if it exists in the event", () => {
    const event = { partitionKey: "PartitionKey" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("PartitionKey");
  });

  it("should return the default candidate if there is no event", () => {
    const result = deterministicPartitionKey();
    expect(result).toBe("0");
  });

  it("should generate the candidate from the event if there is no partition key", () => {
    const event = { name: "My Event" };

    const hashUpdateMock = jest.fn().mockReturnThis();
    const hashDigestMock = jest.fn().mockReturnValueOnce(HASH_CODE);
    jest.spyOn(crypto, "createHash").mockReturnValueOnce({
      update: hashUpdateMock,
      digest: hashDigestMock,
    });

    const result = deterministicPartitionKey(event);

    expect(result).toBe(HASH_CODE);
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
    expect(hashUpdateMock).toHaveBeenCalledWith(JSON.stringify(event));
    expect(hashDigestMock).toHaveBeenCalled();
  });

  it("should generate a hash if the candidate length is longer than maximum length", () => {
    const overMaxLengthStr = new Array(257).fill('a').join('');
    const event = { partitionKey: overMaxLengthStr };
    const hashUpdateMock = jest.fn().mockReturnThis();
    const hashDigestMock = jest.fn().mockReturnValueOnce(HASH_CODE);

    jest.spyOn(crypto, "createHash").mockReturnValueOnce({
      update: hashUpdateMock,
      digest: hashDigestMock,
    });

    const result = deterministicPartitionKey(event);

    expect(result).toBe(HASH_CODE);
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
    expect(hashUpdateMock).toHaveBeenCalledWith(overMaxLengthStr);
    expect(hashDigestMock).toHaveBeenCalled();
  });

  it("should return the candidate if it is already a string", () => {
    const candidate = "My Key";
    const result = deterministicPartitionKey({ partitionKey: candidate });

    expect(result).toBe(candidate);
    expect(crypto.createHash).not.toHaveBeenCalled();
  });
});
