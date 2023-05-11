import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { tokenName } from "../constants/constants";
import { AuthTokenInfo } from "../models/common.interface";
import { useAuthStore } from "../stores/auth.store";

export const getAuthTokenFromStore = async (): Promise<string | null> => {
  try {
    const tokenInfoJson = await AsyncStorage.getItem(tokenName);
    const tokenInfo: AuthTokenInfo | null = tokenInfoJson
      ? await JSON.parse(tokenInfoJson)
      : null;

    if (tokenInfo && moment(tokenInfo.expired).isAfter(moment())) {
      return tokenInfo.token;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);

    return null;
  }
};

export const setAuthTokenToStore = (tokenInfo: AuthTokenInfo): Promise<void> =>
  AsyncStorage.setItem(tokenName, JSON.stringify(tokenInfo));

export const removeAuthTokenFromStore = (): Promise<void> =>
  AsyncStorage.removeItem(tokenName);

export const handleErrors = async (response: Response) => {
  if (response.ok) return response.json();

  switch (response.status) {
    case 400:
      return Promise.reject({
        isSuccess: false,
        result: {
          status: response.status,
          // value: capitalizeFirstLetter(i18n.t(incorrectDataWasSentToTheServer)),
          value: "server error",
        },
      });
    case 401:
      useAuthStore.getState().resetUser();

      return Promise.reject({
        isSuccess: false,
        result: {
          status: response.status,
          // value: capitalizeFirstLetter(i18n.t(authorizationTokenIsInvalid)),
          value: "server error",
        },
      });
    case 404:
      return Promise.reject({
        isSuccess: false,
        result: {
          status: response.status,
          // value: capitalizeFirstLetter(i18n.t(requestNotFound)),
          value: "server error",
        },
      });
    case 500:
      return Promise.reject({
        isSuccess: false,
        result: {
          status: response.status,
          // value: capitalizeFirstLetter(i18n.t(anErrorOccurredOnTheServer)),
          value: "server error",
        },
      });
    default:
      return Promise.reject({
        isSuccess: false,
        result: {
          status: response.status,
          // value: capitalizeFirstLetter(
          //   i18n.t(anErrorOccurredWhileExecutingTheRequest)
          // ),
          value: "server error",
        },
      });
  }
};
