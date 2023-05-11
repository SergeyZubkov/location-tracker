import { url } from "../constants/constants";
import { getAuthTokenFromStore } from "../utils/request.utils";

export const authTokenRef: { current: null | string } = { current: null };

const getAuthToken = async () => {
  if (authTokenRef.current) return Promise.resolve(authTokenRef.current);

  const tokenFromLocalStorage = await getAuthTokenFromStore();
  if (tokenFromLocalStorage) {
    authTokenRef.current = tokenFromLocalStorage;
  }

  return Promise.resolve(tokenFromLocalStorage);
};

export class HttpService {
  private readonly requestUrl: string;

  constructor(controller: string) {
    this.requestUrl = `${url}${controller}`;
  }

  async get(endpoint: string | null, signal?: AbortSignal) {
    const token = await getAuthToken();
    return fetch(`${this.requestUrl}${endpoint ?? ""}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Culture: "ru",
      },
      method: "GET",
      signal,
    });
  }

  async post<T>(endpoint: string | null, body?: T, signal?: AbortSignal) {
    const token = await getAuthToken();
    return fetch(`${this.requestUrl}${endpoint ?? ""}`, {
      body: JSON.stringify(body ?? {}),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Culture: "ru",
      },
      method: "POST",
      signal,
    });
  }

  async delete<T>(endpoint: string | null, body?: T) {
    const token = await getAuthToken();
    return fetch(`${this.requestUrl}${endpoint ?? ""}`, {
      body: JSON.stringify(body ?? {}),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Culture: localStorage.getItem("i18nextLng") as string,
      },
      method: "DELETE",
    });
  }
}
