import {
  LocalizationResource,
  LocalizationResponseItem,
} from "../models/settings.interface";

export const isObject = (maybeObject: unknown): maybeObject is object =>
  typeof maybeObject === "object" && maybeObject !== null;

export const getImageFromBytes = (bytes: string) => {
  return `data:image/jpeg;base64,${bytes}`;
};

export const mapLanguage = (
  values: LocalizationResponseItem[]
): LocalizationResource => {
  return values
    .filter(({ value }) => value !== "")
    .reduce((prev, curr) => ({ ...prev, [curr.key]: curr.value }), {});
};
