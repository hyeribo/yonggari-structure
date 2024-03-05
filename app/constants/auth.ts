import sha256 from "crypto-js/sha256";

export const hash = (value: string): CryptoJS.lib.WordArray => {
  return sha256(value);
};

export const isValid = (hash: CryptoJS.lib.WordArray): boolean => {
  return hash.toString() === "";
};
