export interface DefaultResponse<T> {
  result: T;
  isSuccess: boolean;
  status: number;
}

export interface AuthTokenInfo {
  token: string;
  expired: string;
}

export interface ValueResponse<T> {
  result: {
    value: T;
  };
  isSuccess: boolean;
  status: number;
}

export enum AvailableLanguage {
  ru = "ru",
  en = "en",
  az = "az",
}
