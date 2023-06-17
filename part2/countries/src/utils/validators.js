export const isValidNonEmptyString = (string) => {
  if (typeof string === "string") {
    return !!string;
  }
  return false;
};
export const isValidThreeCharacterString = (string) => {
  return typeof string === "string" && string.length === 3;
};

export const isNonEmptyArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

export const isObject = (object) => {
  return typeof object === "object" && !!object;
};
