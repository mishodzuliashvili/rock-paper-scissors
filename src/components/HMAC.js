import { createHmac, randomBytes } from "crypto";

export default class HMAC {
  static generateKey() {
    return randomBytes(32).toString("hex").toUpperCase();
  }
  static generateHMAC(move, key) {
    let hmac = createHmac("sha3-256", key);
    hmac.update(move);
    return hmac.digest("hex").toUpperCase();
  }
}
