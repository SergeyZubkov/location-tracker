export const isObject = (maybeObject: unknown): maybeObject is object =>
  typeof maybeObject === "object" && maybeObject !== null;

export const getImageFromBytes = (bytes: string) => {
  return `data:image/jpeg;base64,${bytes}`;
};
