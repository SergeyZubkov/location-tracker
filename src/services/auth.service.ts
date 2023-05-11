import { AuthCredentials, AuthData, AuthToken } from "../models/auth.interface";
import { HttpService } from "./HttpService";
import { DefaultResponse } from "../models/common.interface";
import { capitalizeFirstLetter } from "../utils/string.utils";
import { handleErrors } from "../utils/request.utils";

const AccountService = new HttpService("/account");

export const getAuthToken = (
  body: AuthCredentials
): Promise<DefaultResponse<AuthToken>> => {
  return AccountService.post("/token", body).then(async (res) => {
    if (res.ok) return res.json();

    if (res.status === 403) {
      return Promise.reject({
        isSuccess: false,
        result: {
          status: res.status,
          // value: capitalizeFirstLetter(i18n.t(invalidCredentials)),
          value: capitalizeFirstLetter("invalid credantials"),
        },
      });
    }

    return Promise.reject({
      isSuccess: false,
      result: {
        status: res.status,
        value: res,
      },
    });
  });
};

export const validateAuthToken = (): Promise<DefaultResponse<AuthData>> => {
  return AccountService.post("/token-valid").then(handleErrors);
};
