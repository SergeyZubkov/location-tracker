import { AvailableLanguage, ValueResponse } from "../models/common.interface";
import { HttpService } from "./HttpService";
import { LocalizationResponseItem } from "../models/settings.interface";
import { handleErrors } from "../utils/request.utils";

const LocalizationService = new HttpService("/localization");

export const getLocalization = (
  lang: AvailableLanguage
): Promise<ValueResponse<LocalizationResponseItem[]>> => {
  return LocalizationService.get(`/${lang}`)
    .then(handleErrors)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
