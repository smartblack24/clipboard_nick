const crypto = require("crypto");

function getEventPartitionKey(event) {
  return event && event.partitionKey;
}

function generateHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function generateCandidateFromEvent(event) {
  const data = JSON.stringify(event);
  return generateHash(data);
}

function deterministicPartitionKey(event) {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event ? (getEventPartitionKey(event) || generateCandidateFromEvent(event)) : TRIVIAL_PARTITION_KEY

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }  

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = generateHash(candidate);
  }

  return candidate;
}

module.exports = {
  deterministicPartitionKey
};
