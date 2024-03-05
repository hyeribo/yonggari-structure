import sha256 from "crypto-js/sha256";

export function authenticate(passkey: any): boolean {
  try {
    if (!passkey) throw Error("Please input the pass key.");
    const hash = sha256(passkey);
    const validHashString =
      "1c8bfe8f801d79745c4631d09fff36c82aa37fc4cce4fc946683d7b336b63032";
    const isValid = hash.toString() === validHashString;
    if (!isValid) {
      throw Error("Invalid pass key.");
    }
    return true;
  } catch (error) {
    throw error;
  }
}
