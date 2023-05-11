import { isObject } from "./common.utils";
import Toast from "react-native-toast-message";

type ErrorWithMessage = { message: string };

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return isObject(error) && "message" in error && error.message === "string";
};

type ServerError = { result: { value: string } };

const isServerError = (error: unknown): error is ServerError => {
  return (
    isObject(error) &&
    "result" in error &&
    isObject(error.result) &&
    "value" in error.result &&
    typeof error.result.value === "string"
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;
  if (isServerError(maybeError)) return { message: maybeError.result.value };

  try {
    return new Error(JSON.stringify(maybeError));
  } catch (e) {
    return new Error(String(maybeError));
  }
};

export const handleError = (error: unknown, message?: string) => {
  const errorWithMessage = toErrorWithMessage(error);

  console.error(errorWithMessage);

  return Toast.show({
    text1: "Ошибка",
    text2: message || errorWithMessage.message,
    type: "error",
  });
};
