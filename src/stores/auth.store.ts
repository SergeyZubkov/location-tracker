import { create } from "zustand";
import { removeAuthTokenFromStore } from "../utils/request.utils";
import { IMenuKeyAndUrlItem, User } from "../models/auth.interface";
import { authTokenRef } from "../services/HttpService";

export interface AuthStore {
  token: string | null;
  user: User | null;
  menuItems: IMenuKeyAndUrlItem[];
  setUserData: (
    user: User,
    menuItems: IMenuKeyAndUrlItem[],
    token: string
  ) => void;
  setToken: (token: string) => void;
  resetUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  menuItems: [],
  resetUser: async () => {
    await removeAuthTokenFromStore();
    authTokenRef.current = null;
    set({ menuItems: [], token: null, user: null });
  },
  setToken: (token) => set({ token }),
  setUserData: (user, menuItems, token?) =>
    set((data) => ({ menuItems, token: token || data.token, user })),
  token: null,
  user: null,
}));
